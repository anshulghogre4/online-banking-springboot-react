import React from 'react'
import DashboardMain from './DashboardMain'
import NavbarDashboard from './NavbarDashboard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  

  return (
    <div>
        <NavbarDashboard/>
        <DashboardMain/>
    </div>
  )
  
}

export default Dashboard