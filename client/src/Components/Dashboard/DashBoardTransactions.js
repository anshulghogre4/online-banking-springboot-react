import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard'
import axios from '../Utills/AxiosWithJWT.js'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";                                         
        




const DashBoardTransactions = () => {

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser, gettingAuser } = useBankingSystem();

    const [accno, setAccno] = useState(0);

    const [transactionDetails, setTransactionDetails] = useState();
    const [sizeOptions] = useState([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS } })
 

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

        if (!sessionStorage.getItem("jwtToken")) {
            navigateTo("/")
        }

        getAllAccTransactions();

    }, []);



    const columns = [
        { dataField: "transactionId", text: "Tr_Id" },
        { dataField: "transactionDate", text: "Date", sort: true },
        { dataField: "transactionTime", text: "Time", sort: true },
   
    ]





    return (
        <div>
            <NavbarDashboard />


            <section className='min-h-[150vh] bg-gray-600 border pt-[2rem]'>


                <div className='relative flex flex-row justify-around items-top'>

                    <div className=' flex flex-col gap-4'>
                        <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
                        <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
                        <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
                        <NavLink to={"/dashboard/Stmt"}><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded ' onClick={getAllAccTransactions}>Statements</button></NavLink>
                    </div>


                    <div className='w-max h-[80vh]'>
                        <h2 className='text-[2rem] text-[#f1f2f6] w-[35rem] text-center'>Transactions</h2>

                        <div className="shadow-md sm:rounded-lg bg-white h-[60vh]">

                                            <div className="flex justify-center items-center py-4">
                                    <SelectButton value={size} onChange={(e) => setSize(e.value)} options={sizeOptions} />
                                </div>

                                <div className='px-4 pb-4'>
                                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                                    <InputText onInput={(e)=>{
                                        setFilters({global:{value: e.target.value, matchMode:FilterMatchMode.CONTAINS},})
                                    }}
                                    placeholder="Keyword Search"
                                    />
                                    </span>
                                </div>
        <DataTable value={transactionDetails}  paginator rows={5} rowsPerPageOptions={[5, 10]} stripedRows showGridlines size={size} sortMode="multiple" tableStyle={{ minWidth: '20rem' }}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" 
            filters={filters}
        >
                                    <Column field="transactionId" sortable header="Tr_ID" />
                                    <Column field="transactionDate" sortable header="Date" />
                                    <Column field="transactionTime" sortable header="Time" />
                                    <Column field="fromAccount" header="From Account" body={(rowData) => {
                                return <span className="text-center">{ rowData.fromAccount != accno ? rowData.fromAccount : rowData.toAccount}</span>;
                            }}></Column>
                                    <Column field="amount" header="Credit" body={(rowData) => {
                                return rowData.fromAccount === accno ? (
                                    <span className="text-right text-red-400 content-end">-</span>
                                ) : (
                                    <span className="text-right text-green-400 content-end">{rowData.amount} &#8377;</span>
                                );
                            }}></Column>

                        <Column field="amount" header="Dedit" body={(rowData) => {
                                return rowData.fromAccount === accno ? (
                                    <span className="text-right text-red-400 content-end">-{rowData.amount} &#8377;</span>
                                ) : (
                                    <span className="text-right text-green-400 content-end">-</span>
                                );
                            }}></Column>

                        <Column field="balance" header="Balance" body={transaction => (
                            <span className={`text-right content-end ${transaction.fromAccount == accno ? 'text-red-400' : 'text-green-400'}`}>
                            {transaction.fromAccount == accno ? transaction.senderBal : transaction.receiverBal} &#8377;
                            </span>
                        )} /> 
                                <Column field="transactionStatus" header="Cr/Dt" body={(rowData) =>
                            rowData.transactionStatus !== "Completed" ?
                            <span className="text-red-400">Failed</span> :
                            rowData.fromAccount === accno ? "Dt" : "Cr"} />
                                <Column field="description" header="Description" /> 

                                <Column field="transactionStatus" header="Transaction Status" body={(rowData) =>
                            rowData.transactionStatus === 'Completed' ?
                            <span className="text-green-400">Completed</span> :
                            <span className="text-red-600">{rowData.transactionStatus}</span>
                                } />                                      
                                    </DataTable> 
                            {/* <table className='border-collapse bg-grey-light h-[98%]'>
                                <thead class="p-1 mt-2 ml-2 flex items-center w-max" >
                                    <tr>
                                        <th class="border border-slate-300 w-16 ">Tr_Id</th>
                                        <th class="border border-slate-300 w-24">Date</th>
                                        <th class="border border-slate-300 w-20">Time</th>
                                        <th class="border border-slate-300 w-24">Acc No</th>
                                        <th class="border border-slate-300 w-28">Credit</th>
                                        <th class="border border-slate-300 w-28">Debit</th>
                                        <th class="border border-slate-300 w-28">Bal</th>
                                        <th class="border border-slate-300 w-12">Cr/Dt</th>
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
                                            <td className="border border-slate-300 w-24">{ transaction.fromAccount != accno ? transaction.fromAccount : transaction.toAccount}</td>
                                            <td class="border border-slate-300 w-28">

                                                {transaction.fromAccount == accno ?
                                                    <span className="text-right text-red-400 content-end">-</span>
                                                    :
                                                    <span className="text-right text-green-400 content-end">{transaction.amount} &#8377;</span>}
                                            </td>

                                            <td class="border border-slate-300 w-28">

                                                {transaction.fromAccount == accno ?
                                                    <span className="text-right text-red-400 content-end">{-transaction.amount} &#8377;</span>
                                                    :
                                                    <span className="text-right text-green-400 content-end">-</span>}
                                            </td>


                                            <td class="border border-slate-300 w-28">
                                                {transaction.fromAccount == accno ?
                                                    <span className="text-right text-red-400 content-end">{transaction.senderBal} &#8377;</span>
                                                    :
                                                    <span className="text-right text-green-400 content-end">{transaction.receiverBal} &#8377;</span>}
                                            </td>

                                            <td class="border border-slate-300 w-12">
                                                {transaction.transactionStatus != "Completed" ?
                                                    <span className="text-red-400">Failed</span> :
                                                    transaction.fromAccount == accno ? "Dt" : "Cr"}


                                            </td>
                                            <td class="border border-slate-300 w-32">{transaction.description}</td>
                                            <td class="border border-slate-300 w-24">{transaction.transactionStatus == 'Completed' ?
                                                <span className="text-green-400">Completed</span> :
                                                <span className="text-red-600">{transaction.transactionStatus}</span>}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table> */}

                        </div>

                               




                    </div>
                </div>
            </section>

                                            



        </div>
    )
}

export default DashBoardTransactions