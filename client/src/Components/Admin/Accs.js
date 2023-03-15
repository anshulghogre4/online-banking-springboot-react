import React, {  useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
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



function Accs() {

    const token = sessionStorage.getItem("jwtToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const navigateTo = useNavigate();

    const { BASE_URL, userDetails, setUser } = useBankingSystem();

    const [usersDetails, setUsersDetails] = useState();


    const [sizeOptions] = useState([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);
    const [size, setSize] = useState(sizeOptions[1].value);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },    
    })


    


    const setUsers = (details => {
        console.log("Main Pagal Hu: ", details);
        setUsersDetails(details);
    });


    

    const getAllUsers = async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/account/accounts/${0}`);
            console.log(resp);
            console.log("Data fetched Successfully");
            setUsers(...resp.data);

            console.log(...resp.data);
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

        console.log("Iam useeffetc",usersDetails);

    }, []);

  


    return (
        <>


            <div className="shadow-md sm:rounded-lg bg-white h-[60vh]">

                <div className="flex justify-center items-center py-4">
                    <SelectButton value={size} onChange={(e) => setSize(e.value)} options={sizeOptions} />
                </div>

                <div className='px-4 pb-4'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText onInput={(e) => {
                            setFilters({ global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                          })
                        }}
                     placeholder="Keyword Search"
                        />
                    </span>
                </div>
                    <DataTable value={usersDetails} 
                        paginator 
                        rows={5}
                        rowsPerPageOptions={[5, 10]}      
                        stripedRows 
                        showGridlines 
                        size={size} 
                        sortMode="multiple" 
                        tableStyle={{ minWidth: '20rem' }}
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        filters={filters}>
                        <Column 
                        field="accounts"  
                        body={( rowData)=>{ return rowData.accounts[0].accountno} }  
                        header="Account Number" 
                        sortable/>
                        <Column field="userId" sortable header="UseId" />
                        <Column field="firstname" sortable header="First Name" />
                        <Column field="lastname" sortable header="Last Name" />
                        <Column field="email" sortable header="E-Mail" />
                    </DataTable>
                  

            </div>


        

           








            {/* <div className='my-2 mx-10 bg-white rounded px-2 py-1 bg-red-500'>
                <h1 className='text-center text-[1.2rem] font-semibold text-gray-900 dark:text-white'>Accounts</h1>
                {usersDetails ?
                    <BootStrapTable bootstrap4 keyField='userId'

                        columns={columns} data={usersDetails}
                        pagination={pagination}
                        filter={filterFactory()}
                    /> : "Loading"}
            </div> */}

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