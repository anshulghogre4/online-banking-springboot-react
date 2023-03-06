import React from 'react'
import { NavLink } from 'react-router-dom'

const NavbarDashboardAdmin = () => {
  return (
    <nav className='navbar  flex flex-row justify-between mx-auto items-center h-[20vh] bg-gray-300 mx-auto px-[7rem]'>
        <div><h1 className='text-[2rem] font-semibold'>Admin</h1></div>

              <div>
            <NavLink className="abc hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] py-[1rem] px-[2.5rem] rounded-lg text-xl duration-[0.5s]transition-all font-semibold">...</NavLink >
        </div>
    </nav>
  )
}

export default NavbarDashboardAdmin