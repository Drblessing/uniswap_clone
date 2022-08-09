import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';
export default function Number() {
  let { number, setNumber } = useContext(AccountContext);
  return (
    <button
      type="button"
      onClick={() => {
        console.log('hey');
        setNumber(number + 1);
      }}
    >
      {number}
    </button>
  );
}
