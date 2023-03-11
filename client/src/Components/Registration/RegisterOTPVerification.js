import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Await, useNavigate } from 'react-router-dom'
import { useBankingSystem } from '../Context/UserContext'
import { toast } from 'react-hot-toast'
import  SyncLoader from "react-spinners/SyncLoader"


const RegisterOTPVerification = () => {

    const navigateTo =useNavigate();
     const [otp, setOtp] = useState();
     const [otpCount, setOtpCount] = useState(0);
     const [isLoading, setIsLoading] = useState(false);
      const maxOtpCount = 3;
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

        const userId = sessionStorage.getItem("userId");

        
        const handleResendOTP = async () =>{

          if (otpCount < maxOtpCount) {
            setIsLoading(true)
              const resp = await axios.post(`${BASE_URL}/api/v1/resend-otp/${userId}`)
              if (resp.status === 200) {
                toast.success("OTP sent succefully");
                setIsLoading(false)
              }else{
                toast.error("Unkown Error occured");
                setIsLoading(false)
              }
              setOtpCount(otpCount+1);
          }else{
            toast.error("You have reached the maximum number of OTPs that can be sent.");
            return
          }
          }
              

    

  return (
    <>
        {isLoading ? (
        <div className='flex flex-row justify-center items-center  h-[100vh]'>
           <SyncLoader
          margin={10}
          size={20}
          speedMultiplier={1}
           color={"#5145CD"}
           loading={isLoading}
           aria-label="Loading Spinner"
           data-testid="loader"
         />
         </div>
    ) : (
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
                <p>Didn't recieve code?</p> <a onClick={handleResendOTP} className="flex flex-row items-center text-blue-600" href="#"  rel="noopener noreferrer">Resend</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
    )
}
    </>
  )
}

export default RegisterOTPVerification