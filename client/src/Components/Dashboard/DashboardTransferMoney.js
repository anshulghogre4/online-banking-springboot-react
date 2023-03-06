import React from 'react'
import NavbarDashboard from './NavbarDashboard'
import { NavLink, useNavigate } from 'react-router-dom'

const DashboardTransferMoney = () => {
    const navigateTo = useNavigate();
  return (
    <div>
        <NavbarDashboard/>
        <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>

<h2 className='text-[1.5rem] text-[#f1f2f6] font-semibold text-center'>DashBoard</h2>
<div className=' flex flex-row justify-around items-center'>

<div className=' flex flex-col justify-center items-center gap-4'>
      <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
      <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
      <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
      <NavLink to={"/dashboard/Stmt"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Statements</button></NavLink>

</div>




<div className='w-[50rem] '>
        <h2 className='text-[#f1f2f6] text-[1.3rem] '>Amount transfer</h2>
   <div className='flex flex-row justify-around p-4 ml-[2rem] '>
            <button onClick={() => navigateTo("/dashboard/trx/addbene")} className='bg-[#f1f2f6] font-semibold p-1 rounded'>Add beneficiaries</button>
            <button className='bg-[#f1f2f6] font-semibold p-1 rounded'>See all beneficiaries</button>

   </div>

    <div>

        <form >
        <div className='flex flex-row justify-around p-4 '>
            <label  className='text-[#f1f2f6]' htmlFor="fromAccount">From Account:
                <input type="number" name='fromAccount' id='fromAccount' />
            </label>

            <label className='text-[#f1f2f6]'  htmlFor="toAccount">to Account:
                <input type="number" name='toAccount' id='toAccount' />
            </label>
        </div>

        <div className='flex flex-row justify-around p-4 ml-[4rem] '>
        <label className='text-[#f1f2f6] relative right-[1rem]'  htmlFor="amount">Amount
                <input type="number" name='amount' id='amount' />
            </label>
            <label className='text-[#f1f2f6]'  htmlFor="Remark">Remark
                <input type="text" name='Remark' id='Remark' />
            </label>
        </div  >
            <div className='flex flex-row justify-center items center'><button className='bg-[#f1f2f6] font-semibold px-[2rem] py-[0.5rem] rounded'>Send</button></div>
        
        </form>
    </div>
</div>
</div>
</section>


    </div>
  )
}

export default DashboardTransferMoney