import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from '../Utills/AxiosWithJWT.js'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from "../Context/UserContext"

import BootStrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';



function Accs() {

    const token = sessionStorage.getItem("jwtToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [usersDetails, setUsersDetails] = useState();


    console.log("Im here");

    const columns = [
        { dataField: "accounts[0].accountno", text: "Account No.", sort: true, filter: textFilter() },
        { dataField: "firstname", text: "First Name", sort: true, filter: textFilter() },
        { dataField: "lastname", text: "Last Name", sort: true, filter: textFilter() },
        { dataField: "email", text: "E-Mail", sort: true, filter: textFilter() },
        { dataField: "accounts[0].balance", text: "Balance", sort: true, filter: textFilter() },
        { dataField: "accounts[0].dateCreated", text: "Date Created", sort: true, filter: textFilter() },
    ]

    // const allaccholders = 0;
    // const allaccnotholders = 1;
    // const all = 2;


    const setUsers = (details => {
        console.log("Main Pagal Hu: ", details);
        setUsersDetails(details);
    });


    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }
    });


    const getAllUsers = async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/account/accounts/${0}`);
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

    useEffect(() => {
        if (!sessionStorage.getItem("jwtToken")) {
            navigateTo("/")
        }
        console.log("Welcome to useeffect!");
        getAllUsers();

    }, []);

    return (
        <>
            <div className='my-2 mx-10 bg-white rounded px-2 py-1 bg-red-500'>
                <h1 className='text-center text-[1.2rem] font-semibold text-gray-900 dark:text-white'>Accounts</h1>
                {usersDetails ?
                    <BootStrapTable bootstrap4 keyField='userId'

                        columns={columns} data={usersDetails}
                        pagination={pagination}
                        filter={filterFactory()}
                    /> : "Loading"}
            </div>

            {/*usersDetails ?
                    <div className='my-5 mx-10 bg-white rounded px-5 py-1'>
                        <table className="ml-2 mt-5 mr-10 w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                            <thead className="text-xs p-4 m-4  text-gray-700 uppercase bg-gray-80 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="mt-0 mb-2 p-4 mr-20 text-[1rem] font-medium leading-tight text-primary">
                                    <th>Account No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Create Date</th>
                                    <th>Balance</th>
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
                                        <td>{user.accounts[0]?.balance}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> </div>
                    :
                                <div className='ml-10'><span>...</span></div>*/}
        </>
    )
}
export default Accs;