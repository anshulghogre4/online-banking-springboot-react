import React, { useEffect, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NavbarDashboardAdmin from './NavbarDashboardAdmin'
import Male from '../../assets/images/Male.png'
import Female from '../../assets/images/Female.png'


const Accounts = () => {
    const token = sessionStorage.getItem("jwtToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [accountDetails, setAccountDetails] = useState();

    const [usersDetails, setUsersDetails] = useState();


    const allaccholders = 0;
    const allaccnotholders = 1;
    const all = 2;

    const [query, setQuery] = useState(0);

    console.log("ye hai query", query);

    const setAccount = (details => {
        console.log("Main bhi Pagal  Hu: ", details);
        setAccountDetails(details);
    });


    const setUsers = (details => {
        console.log("Main Pagal Hu: ", details);
        setUsersDetails(details);
    });

    const en_dis_user = async (userId, userActive) => {
        try {

            const resp = await axios.put(`${BASE_URL}/api/v1/user/en_dis_user/${userId}`);
            toast.success("changed");
            getAllUsers(query);

        }
        catch (err) { }
    };

    const en_dis_acc = async (accountno, accActive) => {
        try {

            if (accActive) {
                const resp = await axios.put(`${BASE_URL}/account/accounts/suspend/${accountno}`);
                toast.success("Suspended");
            }
            else {
                const resp = await axios.put(`${BASE_URL}/account/accounts/activate/${accountno}`);
                toast.success("Activated");
            }
            getAllUsers(query);

        }
        catch (err) { }
    };

    useEffect(() => {
        if (!sessionStorage.getItem("jwtToken")) {
            navigateTo("/")
        }
        console.log("Welcome to useeffect!");

    }, []);


    const getAllUsers = async (query_) => {

        try {
            setQuery(query_);
            console.log(" im query " + query + "im Query_" + query_);
            const resp = await axios.get(`${BASE_URL}/account/accounts/${query_}`);

            console.log(resp);

            console.log("Data fetched Successfully");
            setUsers(...resp.data);

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
            <NavbarDashboardAdmin />
            <section className='min-h-[84vh] h-auto bg-blue-300 border pt-[2rem]'>
                <h1 className="ml-10 mt-0 mb-2 text-5xl font-medium leading-tight text-primary">Account Holders</h1>
                <div>
                    <button className="ml-10 w-[15rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={() => getAllUsers(all)}>View All Accounts</button>

                    <button className="ml-10 w-[15rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={() => getAllUsers(allaccholders)}>View Account Holders</button>

                    <button className="ml-10 w-[15rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={() => getAllUsers(allaccnotholders)}>View Non-Account Holders</button>

                    <button
                        className="ml-10 w-[5rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={() => navigateTo("/admin/dashboard")}>Back </button>

                    {usersDetails ?
                        <div className='my-5 mx-10 bg-white rounded'>
                            <table className="ml-2 mt-5 mr-10 w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                                <thead className="text-xs p-8 m-8 text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="mt-0 mb-2 p-8 mr-20 text-[1rem] font-medium leading-tight text-primary">
                                        <th>Account No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Create Date</th>
                                        <th>View Accounts</th>
                                        <th>Enable/
                                            Disable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersDetails && usersDetails.map((user) =>
                                        <tr key={user.userId}>


                                            <td>{user.accounts[0]?.accountno}</td>

                                            <td>{user.firstname} {user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.createdDate}</td>
                                            <td>
                                                <Popup
                                                    trigger={<div><button className="button"  >View </button></div>}
                                                    modal
                                                    nested>
                                                    {close => (
                                                        <div className="modal">
                                                            <button className="close" onClick={close}>
                                                                &times;
                                                            </button>
                                                            <div className="header text-left ml-10 " > Profile </div>
                                                            <div className="content">
                                                                {user.userdetails ?
                                                                    <div>
                                                                        <section class="pt-1 bg-blueGray-50">
                                                                            <div class="w-auto px-1 mx-auto">
                                                                                <div class="relative flex flex-col min-w-0 break-words bg-white w-auto shadow-xl rounded-lg">
                                                                                    <div class="px-1">
                                                                                        <div class="flex flex-wrap justify-center">
                                                                                            <div class="w-[20vw] px-4 flex justify-center">
                                                                                                <img className='rounded-full w-32' src={user.userdetails.gender == "F" ? Female : Male} />

                                                                                            </div>
                                                                                        </div>
                                                                                        <div>
                                                                                            <div class="text-center mt-1">
                                                                                                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                                                                    {user.firstname + " " + user.lastname}
                                                                                                </h3>
                                                                                            </div>
                                                                                            <div class="w-full px-4 text-center mt-1">
                                                                                                <div class="flex justify-center py-1 lg:pt-1 pt-2">
                                                                                                    <div class="mr-4 px-3 text-center">
                                                                                                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                                                                            [{user.userdetails.dateOfBirth}]
                                                                                                        </span>
                                                                                                        <span class="text-sm text-blueGray-400">Birthdate</span>
                                                                                                    </div>
                                                                                                    <div class="mr-4 px-3 text-center">
                                                                                                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                                                                            {user.userdetails.gender}
                                                                                                        </span>
                                                                                                        <span class="text-sm text-blueGray-400">Gender</span>
                                                                                                    </div>
                                                                                                    <div class="lg:mr-4 px-3 text-center">
                                                                                                        <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                                                                            {user.userdetails.age}
                                                                                                        </span>
                                                                                                        <span class="text-sm text-blueGray-400">Age</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>

                                                                                        <div class="text-center mt-0">
                                                                                            <h3 class="text-l font-semibold leading-normal mb-1 text-blueGray-700 mb-2">
                                                                                                <span>Aadhar No. :  </span> {user.userdetails.adhaar}
                                                                                            </h3>
                                                                                            <h3 class="text-l font-semibold leading-normal mb-1 text-blueGray-700 mb-2">
                                                                                                <span>PAN No. :  </span> {user.userdetails.pan}
                                                                                            </h3>
                                                                                            <h3 class="text-l font-semibold leading-normal mb-1 text-blueGray-700 mb-2">
                                                                                                <span>Mobile No. :  </span> {user.userdetails.mobile}
                                                                                            </h3>

                                                                                            <h3 class="text-l font-semibold leading-normal mb-1 text-blueGray-700 mb-2">
                                                                                                <span>Email :  </span> {user.email}
                                                                                            </h3>

                                                                                            <div class="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                                                                                                <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                                                                City : <span>{user.userdetails.city}</span>
                                                                                            </div>
                                                                                            <hr />
                                                                                            <div className='my-2 text-center'>
                                                                                                <div className="header text-center underline mb-5" > Accounts </div>
                                                                                                {user.accounts.length ?

                                                                                                    <table className="mx-2 w-full text-sm text-gray-500 dark:text-gray-400">
                                                                                                        <thead className="text-xs text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                                                                                            <tr className="mt-0 mb-2 text-[1rem] font-medium leading-tight text-primary">
                                                                                                                <th>Account No</th>
                                                                                                                <th>Balance</th>
                                                                                                                <th>Time
                                                                                                                    Created</th>
                                                                                                                <th>Type</th>
                                                                                                                <th>Activate/
                                                                                                                    Suspend</th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {user.accounts && user.accounts.map((account) =>
                                                                                                                <tr key={account.accountno}>
                                                                                                                    <td>{account.accountno}</td>
                                                                                                                    <td>{account.balance}</td>
                                                                                                                    <td>{account.dateCreated + " | " + account.timeCreated}</td>
                                                                                                                    <td>{account.accountType}</td>
                                                                                                                    <td><button className={account.isactive ?
                                                                                                                        "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                                                                        :
                                                                                                                        "text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                                                                                                                        onClick={() => en_dis_acc(account.accountno, account.isactive)}>{account.isactive ? "Suspend" : "Activate"}</button></td>
                                                                                                                </tr>
                                                                                                            )}
                                                                                                        </tbody>
                                                                                                    </table> : "Account not generated!"
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </section>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <h1 className='text-red'>Data Not Found!</h1>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className="actions">
                                                                <button
                                                                    className="button"
                                                                    onClick={() => {
                                                                        console.log('modal closed ');
                                                                        close();
                                                                    }}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>








































                                                {/*<div className='rounded'>
                                                    <Popup
                                                        trigger={<div><button onClick={() => console.log("Try poping up")}
                                                            className="button" >View </button></div>}
                                                        modal
                                                        nested>

                                                        {close => (
                                                            <div className="modal">
                                                                <button className="close" onClick={close}>
                                                                    &times;
                                                                </button>
                                                                <div className="header"> {user.firstname} </div>
                                                                <div className="content">

                                                                    {user.accounts.length ?
                                                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                                            <thead className="text-xs text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                                                                <tr className="mt-0 mb-2 text-[1rem] font-medium leading-tight text-primary">
                                                                                    <th>Account No</th>
                                                                                    <th>Balance</th>
                                                                                    <th>Active</th>
                                                                                    <th>Time Created</th>
                                                                                    <th>Account Type</th>
                                                                                    <th>Activate/Suspend</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {user.accounts && user.accounts.map((account) =>
                                                                                    <tr key={account.accountno}>
                                                                                        <td>{account.accountno}</td>
                                                                                        <td>{account.balance}</td>
                                                                                        <td>{account.isactive ? "Y" : "N"}</td>
                                                                                        <td>{account.dateCreated + " | " + account.timeCreated}</td>
                                                                                        <td>{account.accountType}</td>
                                                                                        <td><button className={account.isactive ?
                                                                                            "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                                            :
                                                                                            "text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                                                                                            onClick={() => en_dis_acc(account.accountno, account.isactive)}>{account.isactive ? "Suspend" : "Activate"}</button></td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table> : "no data"}
                                                                </div>
                                                                <div className="actions">

                                                                    <button
                                                                        className="button"
                                                                        onClick={() => {
                                                                            console.log('modal closed ');
                                                                            close();
                                                                        }}                                                                    >
                                                                        Close
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                                    </div>*/}

                                            </td>
                                            <td><button className={user.enabled ?
                                                "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                :
                                                "text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}
                                                onClick={() => { en_dis_user(user.userId, user.enabled); }
                                                }>{user.enabled ? "Disable" : "Enable"}</button></td>

                                        </tr>
                                    )}
                                </tbody>
                            </table> </div>

                        :
                        <div className='ml-10'><span>...</span></div>}
                </div>
            </section>
        </>
    )
}

export default Accounts