import React,{useEffect,useState} from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import {Routes,Route} from "react-router-dom"
import './App.css';
import axios from "./Components/Utills/AxiosWithJWT.js"
import Login from './Components/Registration/Login';
import Register from './Components/Registration/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import AboutUs from './Components/AboutUs/AboutUs';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import DashBoardBalance from './Components/Dashboard/DashBoardBalance';
import DashBoardTransactions from './Components/Dashboard/DashBoardTransactions';
import DashboardTransferMoney from './Components/Dashboard/DashboardTransferMoney';
import Admin from './Components/Admin/Admin'
import Accounts from './Components/Admin/FindAllAccounts';
import AddBeneficiary from './Components/Beneficiary/AddBeneficiary';
import SeeUserBeneficiaries from './Components/Beneficiary/SeeUserBeneficiaries';




function App() {


  // const BASE_URL = "http://localhost:8081";

  // const [userData, setUserData]= useState();

  //   const setUser = (details => {
  //       console.log("Main Pagal Hu: ", details);
  //       setUserData(details)
  //   })

  //   const gettingAUser = async () =>{

  //       const userid = sessionStorage.getItem("userId");

  //       const resp = await axios.get(`${BASE_URL}/api/v1/user/auser/`,{
  //           params:{
  //               userid
  //           }
  //       })

        
  //       setUser(resp.data);

  //   }
  //       useEffect(()=>{
  //           gettingAUser();
  //       },[])



  

  return (
    
    <Routes>
      <Route path="/" element = {<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/balance' element={<DashBoardBalance/>}/>
      <Route path='/dashboard/Stmt' element={<DashBoardTransactions/>}/>
      <Route path='/dashboard/trx' element={<DashboardTransferMoney
      //  gettingAUser={gettingAUser} userData={userData} 
        />}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/error'element={<ErrorPage/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admin/accounts' element={<Accounts/>}/>
      <Route path='/dashboard/trx/seebene' element={<SeeUserBeneficiaries/>}/>
      <Route path='/dashboard/trx/addbene' element={<AddBeneficiary/>}/>
      </Routes>
  );
}

export default App;
