import React, { useEffect, useState } from 'react'
import dashimg from "../../assets/images/Welcome_dashboard.png"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, NavLink } from 'react-router-dom'
import { useBankingSystem } from "../Context/UserContext"
import Accs from './Accs'




const DashboardMain = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, gettingAUser } = useBankingSystem();

  const [adminname, setAdminname] = useState("");



  const adminProfile = () => {
    try {
      setAdminname(userDetails?.firstname + " " + userDetails?.lastname);
    }
    catch {

    }
  };

  useEffect(() => {
    if(!sessionStorage.getItem("jwtToken")){
      navigateTo("/")
    }
    adminProfile();
  }, []);

  if (userDetails?.role != "ADMIN") {
    navigateTo("/dashboard");
    return;
  }



  return (
    <section className='h-[84vh] bg-blue-300 border pt-[2rem]'>
      <h2 className='text-[1.5rem] text-gray-900 font-semibold text-center'>DashBoard</h2>
      <div className=' flex flex-row justify-around '>

        <div className=' flex flex-col justify-center items-center gap-4 '>
          <h3 className='text-[1.2rem] font-semibold text-gray-900 dark:text-white'>Menu</h3>
          <NavLink to={"/admin/dashboard/requests"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all'>Requests</button></NavLink>
          <NavLink to={"/admin/dashboard/accounts"} > <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all'>Accounts</button></NavLink>
          <NavLink to={"/admin/dashboard/transactions"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] duration-[0.5s]transition-all'>Transactions</button></NavLink>

        </div>

        <div className='flex flex-col items-end'>
          <h1 className='text-[1.2rem] text-gray-900 dark:text-white' >Hello</h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white pb-8">{adminname}</h2>
          <div>
            <Accs />
          </div>
        </div>
      </div>


    </section>

  )
}


export default DashboardMain