import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NavbarDashboardAdmin from './NavbarDashboardAdmin.js'
import Male from '../../assets/images/Male.png'
import Female from '../../assets/images/Female.png'

const Requests = () => {
    const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, gettingAUser } = useBankingSystem();

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
        if(!sessionStorage.getItem("jwtToken")){
            navigateTo("/")
          }
        console.log("Welcome to useeffect!");
    }, [usersDetails, accountDetails, approveReq]);

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

                toast.success("Requests!");
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
            <NavbarDashboardAdmin />
            <section className='h-[84vh] bg-blue-300 border pt-[2rem]'>
                <h1 className="ml-10 mt-0 mb-2 text-5xl font-medium leading-tight text-primary">Pending Requests</h1>
                <div>
                    <button className="ml-10 w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={getAllRequests}>View Requests</button>

                    <button className="ml-2 w-[5rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all"
                        onClick={() => navigateTo("/admin/dashboard")}>Back</button>

                    {usersDetails?.length ?
                        <div className='my-5 mx-10 bg-white rounded'>

                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mr-2 text-center">
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
                                                                                                                ({user.userdetails.dateOfBirth})
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

                                                                                            <div class="text-center mt-1">
                                                                                                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                                                                    <span>Aadhar No. :  </span> {user.userdetails.adhaar}
                                                                                                </h3>
                                                                                                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                                                                    <span>PAN No. :  </span> {user.userdetails.pan}
                                                                                                </h3>
                                                                                                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                                                                    <span>Mobile No. :  </span> {user.userdetails.mobile}
                                                                                                </h3>

                                                                                                <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                                                                                    <span>Email :  </span> {user.email}
                                                                                                </h3>

                                                                                                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                                                                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                                                                    Address : <span>{user.userdetails.address}</span>
                                                                                                </div>
                                                                                                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                                                                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                                                                    City : <span>{user.userdetails.city}</span>
                                                                                                </div>
                                                                                                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                                                                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                                                                    State : <span>{user.userdetails.state}</span>
                                                                                                </div>
                                                                                                <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                                                                    <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                                                                                    Area Pin : <span>{user.userdetails.pin}</span>
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </section>
                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <h1>No data</h1>
                                                                        </div>}
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
                        </div>
                        :
                        <div>
                            <h1 className='ml-10 text-red-500 text-base text-center'>No Pending Requests</h1>

                        </div>
                    }
                </div >
            </section >
        </>
    )
}

export default Requests