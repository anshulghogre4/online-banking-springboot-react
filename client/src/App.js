import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import {Routes,Route} from "react-router-dom"
import './App.css';
import Login from './Components/Registration/Login';
import Register from './Components/Registration/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element = {<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      </Routes>
  );
}

export default App;
