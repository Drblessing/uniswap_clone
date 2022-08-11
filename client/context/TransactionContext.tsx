import React, { useState, useEffect } from 'react';
import { contractABI, contractAddress } from '../lib/constants';
import { ethers } from 'ethers';
import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import axios from 'axios';

export const TransactionContext: any = React.createContext<any>('');

let eth: any;
let window_any: any = window;

if (typeof window !== 'undefined') {
  eth = window_any.ethereum;
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
};

type Props = {
  children?: React.ReactNode;
};

export const TransactionProvider: React.FC<Props> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  });

  const [loader, setLoader] = useState(Math.floor(Math.random() * 10));

  const router = useRouter();

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask.');
      const accounts = await metamask.request({ method: `eth_requestAccounts` });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object.');
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ');

      const accounts = await metamask.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      throw new Error('No ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Trigger Loading Modal
  useEffect(() => {
    if (window.location.href !== 'http://localhost:3000') {
      return;
    }
    if (window.location.href.search('http://localhost:3000/?loading=') === -1) {
      return;
    }
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`);
    } else {
      router.push('/');
    }
  }, [isLoading]);

  // Choose Random Loading Modal
  useEffect(() => {
    setLoader(Math.floor(Math.random() * 10));
  }, [isLoading]);

  // Create user profile in Sanity
  useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        userName: 'Unnamed',
        address: currentAccount,
      };

      await axios.post('http://localhost:3000/api/createIfNotExists', { userDoc });
    })();
  }, [currentAccount]);

  const sendTransaction = async (meatamask = eth, connectedAccount = currentAccount) => {
    try {
      if (!meatamask) return alert('Please install metamask.');
      const { addressTo, amount } = formData;
      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await meatamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', //520k gwei
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        `Transfer`
      );

      setIsLoading(true);
      await transactionHash.wait();

      // DB
      await saveTransaction(transactionHash.hash, amount, connectedAccount, addressTo);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const saveTransaction = async (
    txHash: string,
    amount: string,
    fromAddress: string = currentAccount ?? 'typescript_fix',
    toAddress: any
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    };

    const addTransaction = await axios.post('http://localhost:3000/api/addTransaction', txDoc);

    return;
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        handleChange,
        formData,
        isLoading,
        loader,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
