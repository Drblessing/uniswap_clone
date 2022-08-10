import { css } from '@emotion/react';
import { MoonLoader } from 'react-spinners';
import { useState, useContext } from 'react';
import { RingLoader } from 'react-spinners';
import { TransactionContext } from '../context/TransactionContext';

const style = {
  wrapper: `text-white h-72 w-72 flex flex-col justify-top items-center`,
  title: `font-semibold text-4xl mb-12`,
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const TransactionLoader = () => {
  const { loader } = useContext(TransactionContext);
  const loaders = [MoonLoader, RingLoader];
  const Loader = loaders[loader];
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Loading...</div>
      <Loader color={'#fff'} loading={true} css={cssOverride} size={100} />
    </div>
  );
};

export default TransactionLoader;
