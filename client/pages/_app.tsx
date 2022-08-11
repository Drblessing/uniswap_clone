import '../styles/globals.css';
import { TransactionProvider } from '../context/TransactionContext';
import { AccountProvider } from '../context/AccountContext';
import Script from 'next/script';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <AccountProvider>
        <TransactionProvider>
          <Component {...pageProps} />
        </TransactionProvider>
      </AccountProvider>

      <ToastContainer />
    </>
  );
}

export default MyApp;
