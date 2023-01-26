import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import {Routes,Route} from "react-router-dom"
import './App.css';
import Login from './Components/Registration/Login';
import Register from './Components/Registration/Register';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import AboutUs from './Components/AboutUs/AboutUs';

function App() {
  return (
    <Routes>
      <Route path="/home" element = {<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/' element={<AboutUs/>}/>

      
      </Routes>
  );
}

export default App;
