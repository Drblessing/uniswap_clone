import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Main from '../components/Main';
import Number from '../components/Number';
import TransactionHistory from '../components/TransactionHistory';
import axios from 'axios';

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-gradient-to-b from-black to-white text-white select-none flex flex-col justify-between`,
};

const Home: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <Main />
      <TransactionHistory />
    </div>
  );
};

// TODO: Implement chain checker to make sure polygon testnet
// TODO: Update icons to polygon
// TODO: Update logo to hackjack
// TODO: Add blackjack buttons

export default Home;
