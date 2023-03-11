import React, { useEffect, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import NavbarDashboard from './NavbarDashboard'
import axios from "../Utills/AxiosWithJWT.js"
import { useBankingSystem } from '../Context/UserContext'
import { toast } from 'react-hot-toast'


const DashBoardBalance = () => {

  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, setUser: setUserDetails, gettingAUser } = useBankingSystem();
  const [balance, setBalance] = useState(0);
  let accountNo = 0;
  let userName = null;
  try {
    console.log(userDetails?.userId);
    console.log(userDetails.accounts[0].accountno);

    userName = userDetails.firstname + " " + userDetails.lastname;
    accountNo = userDetails.accounts[0].accountno;
    // setBalance(userDetails.accounts[0].balance);
  }
  catch
  { }


  
  const checkbal = async (e) => {
     gettingAUser();
    while (accountNo === 0) {
      console.log("im whilel loop");
      accountNo = userDetails?.accounts[0]?.accountno;
    }

    try {

      const resp = await axios.get(`${BASE_URL}/account/checkbal/${accountNo}`);

      setBalance(resp?.data[0]?.balance);
      console.log(resp);
    }
    catch (error) {
      console.log(error);

      if (userDetails?.accounts === undefined) { navigateTo("/dashboard") }

      // toast.error("Invalid Credentials!")
    }
  }

  useEffect(() => {
    
      if(!sessionStorage.getItem("jwtToken")){
        navigateTo("/")
      }
    
    checkbal();
  }, []);

  return (
    <div>
      <NavbarDashboard />
      <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>

        <h2 className='text-[1.5rem] text-[#f1f2f6] font-semibold text-center'>DashBoard</h2>
        <div className=' flex flex-row justify-around items-center'>

          <div className=' flex flex-col justify-center items-center gap-4'>
            <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
            <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded ' onClick={checkbal}>Check balance</button></NavLink>
            <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
            <NavLink to={"/dashboard/Stmt"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Statements</button></NavLink>
          </div>

          <div className='w-[50rem]'>
            <h2 className='text-[2rem] text-[#f1f2f6] w-[50rem]'>Available Balance</h2>
            <div className='flex  flex-col  justify-center items-start gap-2 mt-[3rem] text-[#f1f2f6]' >
              <h3>Name: {userName}</h3>
              <h3>AccountNo: {accountNo}</h3>
              <h3>Balance: {balance}</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashBoardBalance