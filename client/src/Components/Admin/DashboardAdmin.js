import React from 'react'
import Admin from './Admin'
import DashboardMain from './DashboardMain'
import NavbarDashboardAdmin from './NavbarDashboardAdmin'


const DashboardAdmin = () => {
  return (
    <div>
        <NavbarDashboardAdmin/>
        
        <DashboardMain/>
    </div>
  )
  
}

export default DashboardAdmin