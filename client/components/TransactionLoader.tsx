import { css } from '@emotion/react';
import { useState, useContext, useEffect } from 'react';
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClipLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  PacmanLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
  MoonLoader,
} from 'react-spinners';

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
  const loaders = [
    BarLoader,
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClipLoader,
    ClockLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    PacmanLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SkewLoader,
    SquareLoader,
    SyncLoader,
    MoonLoader,
  ];

  const [randomLoader, setRandomLoader] = useState(Math.floor(Math.random() * loaders.length));
  useEffect(() => {
    setRandomLoader(Math.floor(Math.random() * loaders.length));
  }, []);
  const Loader = loaders[randomLoader];
  return (
    <div className={style.wrapper}>
      <div className={style.title}>Loading...</div>
      <Loader color={'#fff'} loading={true} css={cssOverride} size={100} />
    </div>
  );
};

export default TransactionLoader;
