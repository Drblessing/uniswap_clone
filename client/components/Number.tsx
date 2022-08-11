import { useContext } from 'react';
import { AccountContext } from '../context/AccountContext';
export default function Number() {
  let { number, setNumber } = useContext(AccountContext);
  return (
    <button
      type="button"
      onClick={() => {
        setNumber(number + 1);
      }}
    >
      {number}
    </button>
  );
}
