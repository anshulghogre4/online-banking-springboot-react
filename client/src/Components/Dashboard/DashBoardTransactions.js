import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard'
import axios from '../Utills/AxiosWithJWT.js'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"

const DashBoardTransactions = () => {

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser, gettingAuser } = useBankingSystem();

    const [accno, setAccno] = useState(0);

    const [transactionDetails, setTransactionDetails] = useState();

    const setTransaction = (details => {
        console.log("Main phir bhi pagal hu!", details)
        setTransactionDetails(details);
    })

    try {
        if (accno == 0)
            setAccno(userDetails?.accounts[0]?.accountno);
    }
    catch (err) {
        console.log(err);

    }

    const getAllAccTransactions = async (e) => {
        // e.preventDefault();
        while (accno == 0) {
            console.log("im whilel loop");
            setAccno(userDetails?.accounts[0]?.accountno);
        }
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

            if (userDetails?.accounts === undefined) { navigateTo("/dashboard") }

            // toast.error("Invalid Credentials!")
        }

    }

    useEffect(() => {
        getAllAccTransactions();

    }, []);

    return (
        <div>
            <NavbarDashboard />


            <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>


                <div className='relative flex flex-row justify-around items-center'>

                    <div className=' flex flex-col justify-center items-center gap-4'>
                        <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
                        <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
                        <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
                        <NavLink to={"/dashboard/Stmt"}><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded ' onClick={getAllAccTransactions}>Statements</button></NavLink>
                    </div>


                    <div className='w-max h-[80vh]'>
                        <h2 className='text-[2rem] text-[#f1f2f6] w-[35rem] text-center'>Transactions</h2>

                        <div className="shadow-md sm:rounded-lg bg-white h-[60vh]">

                            <table className='border-collapse bg-grey-light h-[98%]'>
                                <thead class="p-1 mt-2 ml-2 flex items-center w-max" >
                                    <tr>
                                        <th class="border border-slate-300 w-16 ">Tr_Id</th>
                                        <th class="border border-slate-300 w-24">Date</th>
                                        <th class="border border-slate-300 w-20">Time</th>
                                        <th class="border border-slate-300 w-24">From</th>
                                        <th class="border border-slate-300 w-24">To</th>
                                        <th class="border border-slate-300 w-28">Amount</th>
                                        <th class="border border-slate-300 w-20">Remark</th>
                                        <th class="border border-slate-300 w-32">Description</th>
                                        <th class="border border-slate-300 w-24">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="p-1 ml-2 overflow-y-auto flex flex-col h-[90%] w-auto" >
                                    {transactionDetails && transactionDetails.map((transaction) =>
                                        <tr key={transaction.transactionId} className="text-center">
                                            <td class="  border border-slate-300 w-16">{transaction.transactionId}</td>
                                            <td class="border border-slate-300 w-24">{transaction.transactionDate}</td>
                                            <td class="border border-slate-300 w-20">{transaction.transactionTime}</td>
                                            <td className={transaction.fromAccount != accno ? "border border-slate-300 text-xl w-24" : "border border-slate-300 w-24"}>{transaction.fromAccount}</td>
                                            <td className={transaction.toAccount != accno ? "border border-slate-300 text-xl w-24" : "border border-slate-300 w-24"}>{transaction.toAccount}</td>
                                            <td class="border border-slate-300 w-28">

                                                {transaction.fromAccount == accno ?
                                                    <span className="text-right text-red-400 content-end">{-transaction.amount} &#8377;</span>
                                                    :
                                                    <span className="text-right text-green-400 content-end">{transaction.amount} &#8377;</span>}
                                            </td>

                                            <td class="border border-slate-300 w-20">
                                                {transaction.transactionStatus != "Completed" ?
                                                    <span className="text-red-400">Failed</span> :
                                                    transaction.fromAccount == accno ? "Debited" : "Credited"}


                                            </td>
                                            <td class="border border-slate-300 w-32">{transaction.description}</td>
                                            <td class="border border-slate-300 w-24">{transaction.transactionStatus == 'Completed' ?
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