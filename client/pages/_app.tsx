import '../styles/globals.css';
import { TransactionProvider } from '../context/TransactionContext';
import { AccountProvider } from '../context/AccountContext';

function MyApp({ Component, pageProps }: any) {
  return (
    <AccountProvider>
      <TransactionProvider>
        <Component {...pageProps} />
      </TransactionProvider>
    </AccountProvider>
  );
}

export default MyApp;
