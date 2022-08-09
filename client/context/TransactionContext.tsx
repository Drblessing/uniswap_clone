import React, { useState, useEffect } from 'react';

export const TransactionContext: any = React.createContext<any>();

let eth;

if (typeof window !== 'undefined') {
  eth = window.ethereum;
}

type Props = {
  children?: React.ReactNode;
};

export const TransactionProvider: React.FC<Props> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
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

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
