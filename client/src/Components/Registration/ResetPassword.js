import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from '../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState();
    const [comfirmPassword, setComfirmPassword] = useState();
    const navigateTo = useNavigate();

    const {BASE_URL} = useBankingSystem();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token1 = urlParams.get('token');
    console.log("yeh h reset token",token1);
        



            const handleResetPassword = async (e)=>{
                e.preventDefault();
                if (comfirmPassword !== password) {
                        toast.error("Password not matched")
                } else{

                    const data ={
                        password:comfirmPassword
                    }

                    const resp = await axios.post(`${BASE_URL}/api/v1/user/reset-password/${token1}`, data);

                    if (resp.status === 200) {
                        toast.success("password reset successfull, please login!")
                        navigateTo("/login");
                    }
                }


            }




  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         
          Welcome    
      </a>
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Reset Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleResetPassword} action="#">
              
              <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
              </div>
              <div>
                  <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={comfirmPassword} onChange={(e)=>{setComfirmPassword(e.target.value)}} required />
              </div>
              
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
          </form>
      </div>
  </div>
</section>
    </div>
  )
}

export default ResetPassword