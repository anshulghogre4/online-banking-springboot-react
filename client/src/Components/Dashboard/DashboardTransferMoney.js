import React from 'react'
import NavbarDashboard from './NavbarDashboard'
import { NavLink } from 'react-router-dom'

const DashboardTransferMoney = () => {
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




<div className='w-[50rem]'>
        <h2>Amount transfer</h2>
   <div>
            <button>Add beneficiaries</button>
            <button>See all beneficiaries</button>

   </div>

    <div>

        <form >
        <div>
            <label htmlFor="fromAccount">From Account:
                <input type="number" name='fromAccount' id='fromAccount' />
            </label>

            <label htmlFor="toAccount">to Account:
                <input type="number" name='toAccount' id='toAccount' />
            </label>
        </div>

        <div>
        <label htmlFor="amount">Amount
                <input type="number" name='amount' id='amount' />
            </label>
            <label htmlFor="Remark">Remark
                <input type="text" name='Remark' id='Remark' />
            </label>
        </div>

        <button className='bg-[#f1f2f6]'>Send</button>
        </form>
    </div>
</div>
</div>
</section>


    </div>
  )
}

export default DashboardTransferMoney