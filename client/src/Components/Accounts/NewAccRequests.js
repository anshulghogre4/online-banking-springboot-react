
import React, { useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAcc } from '../../redux/slices/accrequests';

function Requests() {
    const [accno, setAccno] = useState('');
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log("State", state);

    const handleChange = (event) => {
        setAccno(event.target.value);
    }

    if (state.account.isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div>
                <h3>Requests </h3>

                <table>
                    <thead>
                        <tr>
                            <th>Tr_Id</th>
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
                        {state.account.data && state.account.data.map((user) =>
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.createdDate}</td>
                                <td><a className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900" href="/profile" target="_blank">View</a></td>
                                <td><button className="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button></td>
                                <td><button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button></td>

                            </tr>
                        )}
                    </tbody>
                </table>
                <br />

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="submit" onClick={(e) => dispatch(fetchAcc())}>New Account Requests</button>
            </div>
        </>
    )
}
export default Requests;