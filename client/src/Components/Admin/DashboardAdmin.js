import React from 'react'
import Admin from './Admin'
import DashboardMain from './DashboardMain'
import NavbarDashboard from '../Dashboard/NavbarDashboard'
import { useNavigate } from 'react-router-dom'


const DashboardAdmin = () => {
  

  return (
    <div>
        <NavbarDashboard/>
        <DashboardMain/>
    </div>
  )
  
}

export default DashboardAdmin