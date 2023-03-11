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

import AdminTransaction from './Components/Transaction/AdminTransaction';
import DashboardAdmin from './Components/Admin/DashboardAdmin';
import Requests from './Components/Admin/Requests';
import Protected from './Components/Protected/Protected';
import RegisterOTPVerification from './Components/Registration/RegisterOTPVerification';
import ForgotPassword from './Components/Registration/ForgotPassword';
import ResetPassword from './Components/Registration/ResetPassword';
import ChangePassword from './Components/Registration/ChangePassword';
import ContactUs from './Components/ContactUs/ContactUs';



function App() {
  return (
    
    <Routes>
      <Route path="/" element = {<LandingPage/>}/>
      <Route path="/contactUs" element = {<ContactUs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register />}/>
      <Route path='/signup/otp' element={<RegisterOTPVerification/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/balance' element={<Protected Component={DashBoardBalance}/>}/>
      <Route path='/dashboard/Stmt' element={<Protected Component={DashBoardTransactions}/>}/>
      <Route path='/dashboard/trx' element={ <Protected Component={DashboardTransferMoney}/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='*'element={<ErrorPage/>}/>
      <Route path='/admin/dashboard' element={<DashboardAdmin/>}/>
      <Route path='/admin/dashboard/accounts' element={<Accounts/>}/>
      <Route path='/dashboard/trx/seebene' element={ <Protected Component={SeeUserBeneficiaries}/>}/>
      <Route path='/dashboard/trx/addbene' element={<Protected Component={AddBeneficiary}/>}/>
      <Route path='/admin/dashboard/transactions' element={<AdminTransaction/>}/>
      <Route path='/admin/dashboard/requests' element={<Requests/>}/>

      </Routes>
  );
}

export default App;
