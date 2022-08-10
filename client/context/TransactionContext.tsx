import React, { useState, useEffect } from 'react';
import { contractABI, contractAddress } from '../lib/constants';
import { ethers } from 'ethers';
import { client } from '../lib/sanityClient';
import { stringify } from 'querystring';
import { useRouter } from 'next/router';

export const TransactionContext: any = React.createContext<any>('');

let eth: any;

if (typeof window !== 'undefined') {
  eth = window.ethereum;
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

  const [loader, setLoader] = useState(1);

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
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`);
    } else {
      router.push('/');
    }
  }, [isLoading]);

  // Choose Random Loading Modal
  useEffect(() => {
    setLoader(1);
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

      await client.createIfNotExists(userDoc);
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

    await client.createIfNotExists(txDoc);

    await client
      .patch(fromAddress)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        {
          _key: txHash,
          _ref: txHash,
          _type: 'reference',
        },
      ])
      .commit();

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
