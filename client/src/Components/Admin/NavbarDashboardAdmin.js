import React from "react";
import { NavLink } from "react-router-dom";
import banklogo from "../../assets/images/cblogo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const NavbarDashboardAdmin = () => {
  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigateTo("/login");
    toast.success("SignOut Successfull!");
  };

  return (
    <nav className="navbar  flex flex-row justify-between mx-auto items-center h-[16vh] bg-blue-700 mx-auto px-[7rem]">
      <img src={banklogo} className="logo w-[6rem] rounded-sm" alt="yolobank" />
      <div>
        {" "}
        <h1 className="text-[2rem] font-semibold text-white">Admin</h1>{" "}
      </div>
      <button
        className=" hover:bg-slate-600 hover:text-[#f1f2f6] bg-[#f1f2f6] py-[1rem] px-[2.5rem] rounded-lg text-xl duration-[0.5s]transition-all font-semibold"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </nav>
  );
};

export default NavbarDashboardAdmin;
