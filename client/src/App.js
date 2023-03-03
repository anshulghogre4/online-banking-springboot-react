import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import {Routes,Route} from "react-router-dom"
import './App.css';
import Login from './Components/Registration/Login';
import Register from './Components/Registration/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import AboutUs from './Components/AboutUs/AboutUs';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import DashBoardBalance from './Components/Dashboard/DashBoardBalance';
import DashBoardTransactions from './Components/Dashboard/DashBoardTransactions';
import DashboardTransferMoney from './Components/Dashboard/DashboardTransferMoney';




function App() {

  

  return (
    
    <Routes>
      <Route path="/" element = {<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register />}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/balance' element={<DashBoardBalance/>}/>
      <Route path='/dashboard/Stmt' element={<DashBoardTransactions/>}/>
      <Route path='/dashboard/trx' element={<DashboardTransferMoney/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/error'element={<ErrorPage/>}/>
      </Routes>
  );
}

export default App;
