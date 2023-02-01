import React from 'react'
import { NavLink } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard'


const DashBoardTransactions = () => {
  return (
    <div>
        <NavbarDashboard/>


        <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>


<div className=' flex flex-row justify-around items-center'>

<div className=' flex flex-col justify-center items-center gap-4'>
      <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
      <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
      <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
       <NavLink to={"/dashboard/Stmt"}><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Statements</button></NavLink>
</div>




<div className='w-[50rem]'>
   <h2 className='text-[2rem] text-[#f1f2f6] w-[35rem] text-center'>Transactions</h2>
   
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Transaction Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Time
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                Status
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   trx1
                </th>
                <td className="px-6 py-4">
                Date1
                </td>
                <td className="px-6 py-4">
                Time1
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-6 py-4">
                   remarks
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                trx2
                </th>
                <td className="px-6 py-4">
                Date2
                </td>
                <td className="px-6 py-4">
                Time2
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
                <td className="px-6 py-4">
                   remarks
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                trx3
                </th>
                <td className="px-6 py-4">
                    Date3
                </td>
                <td className="px-6 py-4">
                Time3
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
                <td className="px-6 py-4">
                   remarks
                </td>
            </tr>
            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                trx4
                </th>
                <td className="px-6 py-4">
                Date4
                </td>
                <td className="px-6 py-4">
                Time4
                </td>
                <td className="px-6 py-4">
                    $799
                </td>
                <td className="px-6 py-4">
                   remarks
                </td>
            </tr>
            <tr>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                trx5
                </th>
                <td className="px-6 py-4">
                Date5
                </td>
                <td className="px-6 py-4">
                Time5
                </td>
                <td className="px-6 py-4">
                    $999
                </td>
                <td className="px-6 py-4">
                   remarks
                </td>
            </tr>
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