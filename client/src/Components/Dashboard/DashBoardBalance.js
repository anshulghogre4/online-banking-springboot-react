import React from 'react'
import { NavLink } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard'


const DashBoardBalance = () => {
  return (
    <div>
        <NavbarDashboard/>
        <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>

<h2 className='text-[1.5rem] text-[#f1f2f6] font-semibold text-center'>DashBoard</h2>
<div className=' flex flex-row justify-around items-center'>

<div className=' flex flex-col justify-center items-center gap-4'>
      <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
      <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
       <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button>
      <NavLink to={"/dashboard/Stmt"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Statements</button></NavLink>

</div>




<div className='w-[50rem]'>
   <h2 className='text-[2rem] text-[#f1f2f6] w-[50rem]'>Available Balance</h2>
   <div className='flex  flex-col  justify-center items-start gap-2 mt-[3rem] text-[#f1f2f6]' >
        <h3>Name:</h3>
        <h3>AccountNo:</h3>
        <h3>Balance:</h3>


   </div>

</div>
</div>
</section>
    </div>
  )
}

export default DashBoardBalance