import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"


const Transaction = () => {

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [transactionDetails, setTransactionDetails] = useState();

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

                toast.success("Here are the Accounts!");
            }

            if (resp.data == null) {
                toast.success("No Accounts found !");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials fired!")
        }



    }

    return (
        <>
            <div>
                <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-primary">All Transactions I'm admin</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={getAllTransactions}>Transactions</button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => navigateTo("/admin/acctransactions")}>Find By Account No</button>
                
                <button
                    className="inline-block rounded-full bg-success px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
                    onClick={() => navigateTo("/admin")}>Back </button>

                {transactionDetails ?
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                    <td>{transaction.fromAccount}</td>
                                    <td>{transaction.toAccount}</td>
                                    <td>{transaction.amount}<span>&#8377;</span></td>
                                    <td>{transaction.description}</td>
                                    <td>{transaction.transactionStatus == 'Completed' ?
                                        <span className="text-green-400">Completed</span> :
                                        <span className="text-red-600">{transaction.transactionStatus}</span>}</td>

                                </tr>
                            )}
                        </tbody>
                    </table> : <span>Click</span>}

            </div>
        </>
    )
}

export default Transaction