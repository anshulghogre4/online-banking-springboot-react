/*import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Admin = () => {

    const navigateTo = useNavigate();

    const { BASE_URL } = useBankingSystem();

    const [usersDetails, setUsersDetails] = useState();

    const setUsers = (details => {
        console.log("Main Pagal Hu: ", details);
        setUsersDetails(details);
    })

    const [accountDetails, setAccountDetails] = useState();

    const setAccount = (details => {
        console.log("Main bhi Pagal  Hu: ", details);
        setAccountDetails(details);
    })

    const approveReq = async (userId) => {
        try {

            const accType = { accountType: "saving" };
            const resp = await axios.post(`${BASE_URL}/account/create/${userId}`, accType);
            toast.success("Account created successfully");
            setAccount(resp.data.slice(-1));
            getAllRequests();

            console.log("before accountdetails tost")
            console.log(...accountDetails);
            toast.success("New Account No : " + accountDetails[0].accountno);

            // const resp1 = await axios.get(`${BASE_URL}/account/getallreq`);
            // setUsers(resp1.data);
           
            console.log("me aprove kar raha");

        }
        catch (err) { }
    };

    useEffect(() => {
        console.log("Welcome to useeffect!");
    }, [usersDetails, accountDetails, approveReq ]);

    useEffect(() => {
        getAllRequests();
    }, []);

    const declineReq = async (userId) => {
        try {

            const resp = await axios.get(`${BASE_URL}/api/v1/user/acopreqchng/${userId}`)

            toast.error("Request deleted successfully!");
            getAllRequests();
        }
        catch (err) { }
    }

    const getAllRequests = async (e) => {

        try {
            //e.preventDefault();

            const resp = await axios.get(`${BASE_URL}/account/getallreq`);

            console.log(resp);

            console.log("Data fetched Successfully");
            setUsers(resp.data);


            if (resp.status === 200) {

                toast.success("Here are the Account Requests!");
            }

            if (resp.data == null) {
                toast.success("No Account Requests!");
            }

            if (resp.status !== 200 || resp.status === 401) {
                toast.error("Invalid Crenditals!")
            }

        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials!")
        }
    }


    console.log("im render");
    useEffect(() => {
        console.log("Welcome to useEffect!");
    }, [usersDetails, accountDetails, approveReq]);

    return (
        <>
            <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-primary">Admin</h1>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={getAllRequests}>Requests</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={()=>navigateTo("/admin/transactions")}>Transactions</button>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => navigateTo("/admin/accounts")}>Accounts</button>

                {usersDetails ?
                    <div>
                        <h1>Pending Requests</h1>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="mt-0 mb-2 text-[1rem] font-medium leading-tight text-primary">
                                    <th>User Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Create Date</th>
                                    <th>View Profile</th>
                                    <th>Approve</th>
                                    <th>Decline</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersDetails && usersDetails.map((user) =>
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.createdDate}</td>
                                        <td>
                                            <div>
                                                <Popup
                                                    trigger={<div><button className="button"  >View </button></div>}
                                                    modal
                                                    nested>
                                                    {close => (
                                                        <div className="modal">
                                                            <button className="close" onClick={close}>
                                                                &times;
                                                            </button>
                                                            <div className="header"> {user.firstname} </div>
                                                            <div className="content">
                                                                {user.userdetails ?
                                                                    <div>
                                                                        <table className="border-collapse border border-slate-400 ...">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th className="border border-slate-900 ...">Birth Date</th>
                                                                                    <th className="border border-slate-900 ...">Age</th>
                                                                                    <th className="border border-slate-900 ...">User Name</th>
                                                                                    <th className="border border-slate-900 ...">Gender</th>
                                                                                    <th className="border border-slate-900 ...">Adhaar</th>
                                                                                    <th className="border border-slate-900 ...">Mobile</th>
                                                                                    <th className="border border-slate-900 ...">Pan</th>
                                                                                    <th className="border border-slate-900 ...">Address</th>
                                                                                    <th className="border border-slate-900 ...">City</th>
                                                                                    <th className="border border-slate-900 ...">Area Pin</th>
                                                                                    <th className="border border-slate-900 ...">State</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            
                                                                            <td className="border border-slate-900 ...">{user.firstname + " " + user.lastname}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.dateOfBirth}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.age}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.gender}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.adhaar}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.mobile}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.pan}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.address}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.city}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.pin}</td>
                                                                            <td className="border border-slate-900 ...">{user.userdetails.state}</td>

                                                                            </tbody>
                                                                        </table>
                                                                       
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <h1>No data</h1>
                                                                    </div>}
                                                            </div>
                                                            <div className="actions">
                                                                <Popup
                                                                    trigger={<button className="button"> </button>}
                                                                    position="top center"
                                                                    nested>
                                                                    <span>Second pop up</span>
                                                                </Popup>
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
                                            </div>
                                        </td>
                                        <td><button className="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                            onClick={() => approveReq(user.userId)}>Approve</button></td>
                                        <td><button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                            onClick={() => declineReq(user.userId)}>Delete</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div> : "No Data"}
            </div>
        </>
    )
}

export default Admin*/


//to be deleted later