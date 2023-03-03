import React from 'react'
import {NavLink} from "react-router-dom"
import yolo from "../../assets/images/yolo.jpeg"

const Navbar = () => {
  return (
    <nav className='navbar  flex flex-row justify-between mx-auto items-center h-[15vh] bg-gray-300 mx-auto px-[7rem]'>
        <div><img src={yolo} className="logo w-[8rem]" alt="yolobank" /></div>
        <div>
            
          <NavLink  to={"/about"}><a href="#" className="abc hover:bg-slate-300/[0.1] py-[0.2rem] px-[1.0rem] rounded-lg duration-[0.5s]  transition-all font-semibold">About</a></NavLink> 
          
            <NavLink to={"/login"} className="abc hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] py-[0.4rem] px-[1.0rem] rounded-lg  duration-[0.5s]transition-all font-semibold">Sign In/Up</NavLink >
        </div>
    </nav>
  )
}

export default Navbar