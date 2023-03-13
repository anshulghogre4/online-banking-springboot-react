import React from 'react'
import Admin from './Admin'
import axios from 'axios'
import DashboardMain from './DashboardMain'
import { useNavigate } from 'react-router-dom'
import { useBankingSystem } from "../Context/UserContext"
import NavbarDashboardAdmin from './NavbarDashboardAdmin'



const DashboardAdmin = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const navigateTo = useNavigate();
  const { BASE_URL, userDetails, gettingAUser } = useBankingSystem();

  if (userDetails?.role != "ADMIN") {
    navigateTo("/dashboard");
    return;
  }

  return (
    <div>
      <img src='' />
      <NavbarDashboardAdmin />
      <DashboardMain />
    </div>
  )

}

export default DashboardAdmin