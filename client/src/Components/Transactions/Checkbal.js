import React, { useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchBal } from '../../redux/slices/accbal';

function Bal() {
  const [accno, setAccno] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("State", state);

  const handleChange = (event) => {
    setAccno(event.target.value);
  }

  if (state.balance.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>
        <h3>Check Balance </h3>
        {state.balance.data && state.balance.data.map((acc) =>
          <span key={acc.accountno}>
            <h1>Account No. : {acc.accountno}</h1>
            <h1>Balance : {acc.balance}<span>&#8377;</span></h1>
          </span>

        )

        }

        <form>
          <input type="text" name="accno" id="accno" onChange={handleChange} />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="submit" onClick={(e) => dispatch(fetchBal(accno))}>Check Bal</button>
        </form>
      </div>
    </>
  )
}
export default Bal;