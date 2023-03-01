// import React, { useState } from "react";
// import "../../App.css"
// import TransactionService from '../../Service/TransactionService';

// const Transact = ()=>
// {
//     var tr=TransactionService.getTransactions();
//     const [myarray, setmyarray]= useState([]);

//     const init = () => {
//         TransactionService.getTransactions()
//           .then(response => {
//             console.log('Printing Tr data', response.data);
//             setmyarray(response.data);
//           })
//           .catch(error => {
//             console.log('Something went wrong', error);
//           })}

//     console.log("hello")
//     return(
//         <div>
//             <h1>Hello world</h1>
//         </div>
//     )
// }
// export default Transact








import React, { useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrs } from '../../redux/slices/transaction';

function Tran() {
  const [accno, setAccno] = useState('');
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("State", state);

  const handleChange = (event) => {
    setAccno(event.target.value);
  }

  if (state.transaction.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
    <div>
      <h3>Transaction History </h3>
      
      <table>
        <thead>
          <tr>
            <th>Tr_Id</th>
            <th>Date</th>
            <th>Time</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {state.transaction.data && state.transaction.data.map((transaction) =>
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.transactionTime}</td>
              <td>{transaction.fromAccount}</td>
              <td>{transaction.toAccount}</td>
              <td>{transaction.amount}<span>&#8377;</span></td>
              <td>{transaction.description}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br/>
      <form>
          <input type="text" name="accno" id="accno" onChange={handleChange} />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="submit" onClick={(e) => dispatch(fetchTrs(accno))}>Transactions</button>
        </form>
    </div>
    </>
  )
}
export default Tran;