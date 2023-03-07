import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard'
import axios from '../Utills/AxiosWithJWT.js'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"

const DashBoardTransactions = () => {


    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [accno, setAccno] = useState(0);

    const [transactionDetails, setTransactionDetails] = useState();

    const setTransaction = (details => {
        console.log("Main phir bhi pagal hu!", details)
        setTransactionDetails(details);
    })

    if (accno == 0)
        setAccno(userDetails?.accounts[0]?.accountno);

    const getAllAccTransactions = async (e) => {
        // e.preventDefault();

        console.log("entry 1");
        try {
            console.log("entry 2");
            const resp = await axios.get(`${BASE_URL}/transactions/bankaccount/${accno}`);
            console.log("entry 3");
            console.log(resp);

            console.log("Data fetched Successfully");
            setTransaction(resp.data);

            console.log(transactionDetails);

            if (resp.status === 200) {

                toast.success("Here Is Your Transactions");
            }

            if (resp.data == null) {
                toast.success("No Transactions found !");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials!")
        }

    }

    useEffect(() => {
        setAccno(userDetails?.accounts[0]?.accountno);
        getAllAccTransactions();
    }, []);

    return (
        <div>
            <NavbarDashboard />


            <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>


                <div className=' flex flex-row justify-around items-center'>

                    <div className=' flex flex-col justify-center items-center gap-4'>
                        <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
                        <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
                        <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
                        <NavLink to={"/dashboard/Stmt"}><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded ' onClick={getAllAccTransactions}>Statements</button></NavLink>
                    </div>


                    <div className='w-[50rem]'>
                        <h2 className='text-[2rem] text-[#f1f2f6] w-[35rem] text-center'>Transactions</h2>

                        <div className="relative overflow-y-auto shadow-md sm:rounded-lg bg-white">
  
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="mt-0 mb-2 text-[1rem] font-medium leading-tight text-primary">
                                        <th>Tr_Id</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Amount</th>
                                        <th>Remark</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='overflow-auto' >
                                    {transactionDetails && transactionDetails.map((transaction) =>
                                        <tr key={transaction.transactionId}>
                                            <td>{transaction.transactionId}</td>
                                            <td>{transaction.transactionDate}</td>
                                            <td>{transaction.transactionTime}</td>
                                            <td className={transaction.fromAccount != accno ? "text-xl" : ""}>{transaction.fromAccount}</td>
                                            <td className={transaction.toAccount != accno ? "text-xl " : ""}>{transaction.toAccount}</td>
                                            <td>

                                                {transaction.fromAccount == accno ?
                                                    <span className="text-red-400">{-transaction.amount} &#8377;</span>
                                                    :
                                                    <span className="text-green-400">{transaction.amount} &#8377;</span>}
                                            </td>

                                            <td>
                                                {transaction.transactionStatus != "Completed" ?
                                                    <span className="text-red-400">Failed</span> :
                                                    transaction.fromAccount == accno ? "Debited" : "Credited"}


                                            </td>
                                            <td>{transaction.description}</td>
                                            <td>{transaction.transactionStatus == 'Completed' ?
                                                <span className="text-green-400">Completed</span> :
                                                <span className="text-red-600">{transaction.transactionStatus}</span>}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>










                        </div>


                    </div>
                </div>
            </section>

        </div>
    )
}

export default DashBoardTransactions