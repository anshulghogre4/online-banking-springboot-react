import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from '../Utills/AxiosWithJWT.js'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"
import NavbarDashboardAdmin from '../Admin/NavbarDashboardAdmin.js'


const AdminTransaction = () => {

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [accno, setAccno] = useState();

    const [transactionDetails, setTransactionDetails] = useState();

    if (userDetails?.role != "ADMIN") {
        navigateTo("/dashboard");
        return;
    }

    const setTransaction = (details => {
        console.log("Main phir bhi pagal hu!", details)
        setTransactionDetails(details);
    })


    const getAllTransactions = async (e) => {

        try {
            e.preventDefault();

            const resp = await axios.get(`${BASE_URL}/transactions/transaction`);

            console.log(resp);

            console.log("Data fetched Successfully");
            setTransaction(resp.data);

            console.log(transactionDetails);

            if (resp.status === 200) {

                toast.success("Here are the Transactions!");
            }

            if (resp.data == null) {
                toast.success("No Transaction found !");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials fired!")
        }



    }

    const handleChange = (event) => {
        setAccno(event.target.value);
        console.log(accno);
    }

    const getAllAccTransactions = async (e) => {
        e.preventDefault();
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

                resp?.data?.length ? toast.success("Data Found") : toast.error("Data Not Found");
            }

            if (resp.data == null) {
                toast.success("No Accounts found !");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }


        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials!")
        }

    }

    return (
        <>
            <NavbarDashboardAdmin />
            <section className='min-h-[84vh] h-auto bg-blue-300 border pt-[2rem]'>
                <div>
                    <h1 className="ml-10 mt-0 mb-2 text-5xl font-medium leading-tight text-primary">All Transactions</h1>

                    <div className='w-full justify-around'>
                        <button className="ml-10 w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                            onClick={getAllTransactions}>Transactions</button>

                        <form className='inline ml-10' onSubmit={getAllAccTransactions}>
                            <label htmlFor="accno">Account No : </label>
                            <input className='rounded-full mx-1' type="text" name="accno" id="accno" placeholder="Account No" onChange={handleChange} minLength="8" maxLength="8" />
                            <button className="ml-2 w-[12rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                                type="submit" id="submit">Find By Account No</button>
                        </form>


                        <button
                            className="ml-5 w-[5rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                            onClick={() => navigateTo("/admin/dashboard")}>Back </button>

                    </div>
                    {transactionDetails?.length ?
                        <div className='my-5 mx-10 bg-white rounded'>
                            <table className="'my-5 w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="mt-0 mb-2 text-[1rem] font-medium leading-tight text-primary">
                                        <th>Tr_Id</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionDetails.map((transaction) =>
                                        <tr key={transaction.transactionId}>
                                            <td>{transaction.transactionId}</td>
                                            <td>{transaction.transactionDate}</td>
                                            <td>{transaction.transactionTime}</td>
                                            <td className={transaction.fromAccount == accno ? "text-l bg-yellow-200" : ""}>{transaction.fromAccount}</td>
                                            <td className={transaction.toAccount == accno ? "text-l bg-yellow-200" : "l"}>{transaction.toAccount}</td>
                                            <td>{transaction.amount}<span>&#8377;</span></td>
                                            <td>{transaction.description}</td>
                                            <td>{transaction.transactionStatus == 'Completed' ?
                                                <span className="text-green-400">Completed</span> :
                                                <span className="text-red-600">{transaction.transactionStatus}</span>}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        :
                        <span className='items-center ml-10'>Click Button to View Transactions</span>}
                </div>
                <br />
            </section>
        </>
    )
}
export default AdminTransaction