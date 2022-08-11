import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { RiSettings3Fill } from 'react-icons/ri';
import { FiArrowUpRight } from 'react-icons/fi';
import { AiOutlineDown } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import ethLogo from '../assets/eth.png';
import uniswapLogo from '../assets/uniswap.png';
import { TransactionContext } from '../context/TransactionContext';
import ReactModal from 'react-modal';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import TransactionLoader from '../components/TransactionLoader';

Modal.setAppElement('#__next');

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `gap-x-4 flex flex-row items-center justify-center cursor-pointer`,
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#403d3d',
    borderRadius: '5px',
    padding: '100px',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
};

const Main = () => {
  const { formData, handleChange, sendTransaction } = useContext(TransactionContext);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    const { addressTo, amount } = formData;
    e.preventDefault();

    if (!addressTo || !amount) return;

    sendTransaction();
  };

  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Blackjack</div>
        </div>
        <div className={style.transferPropContainer}>
          Dealer Cards...
          <div className={style.currencySelector}></div>
        </div>
        <div className={style.transferPropContainer}>
          Your cards...
          <div className={style.currencySelector}></div>
        </div>

        <div onClick={(e) => handleSubmit(e)} className={style.confirmButton}>
          <div className="grow bg-[#b91c1c] my-2 rounded-2xl py-6 px-8 text-xl font-semibold border-[#ef4444] hover:border-[#fef2f2]">
            Hit
          </div>
          <div className="grow bg-[#ef4444] my-2 rounded-2xl py-6 px-8 text-xl font-semibold border-[#ef4444] hover:border-[#fef2f2]">
            Stand
          </div>
        </div>
      </div>
      <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoader />
      </Modal>
    </div>
  );
};

export default Main;
