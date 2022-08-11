import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import axios from 'axios';

const style = {
  wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
  txHistoryItem: `bg-[#191a1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
  txDetails: `flex items-center`,
  toAddress: `text-[#f48706] mx-2`,
  txTimestamp: `mx-2`,
  etherscanLink: `flex items-center text-[#2172e5]`,
};

const TransactionHistory = () => {
  const { isLoading, currentAccount } = useContext(TransactionContext);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!isLoading && currentAccount) {
        // Hide data on sanity
        const transactions = await axios.post('http://localhost:3000/api/getUserTransactions', { currentAccount });
        const data: Array<Object> = transactions.data;
        const sorted = data
          .sort((a: any, b: any) => {
            return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
          })
          .slice(0, 5);
        if (transactions.data) {
          setTransactionHistory(sorted);
        }
      }
    })();
  }, [isLoading, currentAccount]);

  return (
    <div className={style.wrapper}>
      <div>
        {transactionHistory &&
          transactionHistory?.map((transaction, index) => (
            <div className={style.txHistoryItem} key={index}>
              <div className={style.txDetails}>
                <Image src="/ethCurrency.png" height={20} width={15} alt="eth" />
                {transaction.amount} Ξ sent to{' '}
                <span className={style.toAddress}>{transaction.toAddress.substring(0, 6)}...</span>
              </div>{' '}
              on{' '}
              <div className={style.txTimestamp}>
                {new Date(transaction.timestamp).toLocaleString('en-US', {
                  timeZone: 'PST',
                  hour12: true,
                  timeStyle: 'short',
                  dateStyle: 'long',
                })}
              </div>
              <div className={style.etherscanLink}>
                <a
                  href={`https://mumbai.polygonscan.com/tx/${transaction.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className={style.etherscanLink}
                >
                  View on Polygonscan
                  <FiArrowUpRight />
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
