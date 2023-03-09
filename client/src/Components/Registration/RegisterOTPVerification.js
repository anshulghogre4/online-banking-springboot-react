import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Await, useNavigate } from 'react-router-dom'
import { useBankingSystem } from '../Context/UserContext'
import { toast } from 'react-hot-toast'


const RegisterOTPVerification = () => {

    const navigateTo =useNavigate();
     const [otp, setOtp] = useState();
        const {BASE_URL, userDetails} =useBankingSystem();

        useEffect(()=>{
        },[userDetails])

        const handleOtpVerificationRegister= async (e)=>{
            e.preventDefault();

           

            const data ={
                otp
            }

            const resp =  await axios.post(`${BASE_URL}/api/v1/otp`,data);
            console.log(resp);
            if (resp.status === 200) {
                toast.success("Email verified successfully! Please login!");
                navigateTo("/login");
            }else{
                toast.console.error("Error in verification!");
            }

        }






  return (
    <>
      
<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email!</p>
        </div>
      </div>
      <div>
        <form  onSubmit={handleOtpVerificationRegister}  >
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-[20rem] h-16 ">
                <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="otp" id="otp"/>
              </div>

            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default RegisterOTPVerification