import React from 'react'
import bankpic from "../../assets/images/banking-hero.jpg"
import {BsArrowRight} from "react-icons/bs"
import { NavLink } from 'react-router-dom'

const LandingHero = () => {
  return (
    <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Browse All New Banking Smoothly </h1>
        <p className="mb-8 leading-relaxed">Free easy money management, easy transfer and easy account oppening.</p>
        <NavLink to={"/signup"}> <button className="flex flex-row justify-center items-center gap-[0.5rem] bg-slate-600 text-[#f1f2f6] p-[0.4rem] rounded font-semibold  hover:text-slate-600 hover:bg-[#f1f2f6] ">Get Started <BsArrowRight className='text-bold'/></button>
        </NavLink>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded" alt="hero" src={bankpic}/>
      </div>
    </div>
  </section>
  )
}

export default LandingHero