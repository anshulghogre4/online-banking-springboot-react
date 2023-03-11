import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from '../Context/UserContext'
import  SyncLoader from "react-spinners/SyncLoader"


const ForgotPassword = () => {

        const [email, setEmail] = useState();
        const [isLoading, setIsLoading] = useState(false);

    const {BASE_URL} = useBankingSystem();


    const handleForgotPasswordPage= async(e)=>{
            e.preventDefault();

            const data ={
                email
            }
            setIsLoading(true);
            const resp =  await axios.post(`${BASE_URL}/api/v1/user/forget-password`, data);
            console.log(resp);

            if (resp.status === 200) {
                    toast.success("Reset password link has been sent to your email!")
                    setIsLoading(false);
            }else{
                toast.error("Unkown error occured!")
                    setIsLoading(false);
            }
        
    }



  return (
    <div>
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
        <section className=' flex flex-col items-center justify-center h-[100vh]'>
        <div class="max-w-sm  ">
            <h1 class="mb-2 text-center text-sm font-semibold text-gray-900">Reset your password</h1>
            <p class="mb-10 text-center text-sm">Enter your email and we'll send you a link to reset your password.</p>
            <form   onSubmit={handleForgotPasswordPage} class="w-full">
                <div class="">
                    <label htmlFor="email-address" class="block text-sm font-semibold leading-6 text-gray-900">Email address</label>
                    <input type="email" id="email-address" class="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200" value={email} onChange={(e)=>{setEmail(e.target.value)}} required autofocus/>
                </div> 
                    <button type="submit" class="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 mt-6 w-full">
                        <span>Reset your password</span>
                        </button>
            </form>
        </div>
        </section>
    )
}
    </div>
  )
}

export default ForgotPassword