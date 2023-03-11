import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import  {toast} from "react-hot-toast"
import  {useBankingSystem} from '../Context/UserContext'
import  SyncLoader from "react-spinners/SyncLoader"




const ContactUs = () => {

  const navigateTo = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [body, setBody] = useState(); 
  const { BASE_URL } = useBankingSystem();

  

    const handleSendMail = async (e) =>{
      e.preventDefault();

      const data ={
        email,
        subject,
        body
      }

      setIsLoading(true);
      const resp = await axios.post(`${BASE_URL}/api/v1/user/mail`, data);

      if (resp.status === 200) {
          toast.success("Mail sent succefully!")
          handleReset();
          setIsLoading(false);
          
      } else{
        toast.error("unknown Error Occured!")
        setIsLoading(false);
      }
    }


    const handleReset = () =>{
      setEmail("");
      setSubject("");
      setBody("");
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
        <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
      Contact Us
    </h2>
    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
      Got a technical issue?Need
      details about our Project Plan? or any help? Let us know.
    </p>
    <form action="#"  onSubmit={handleSendMail} className="space-y-8">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="name@name.com"
          required
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Let us know how we can help you"
          required
          value={subject}
          onChange={(e)=>{setSubject(e.target.value)}}
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Leave a comment..."
          value={body}
          onChange={(e)=>{setBody(e.target.value)}}
        />
      </div>
      <button
        type="submit"
        className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Send message
      </button>
    </form>
  </div>
</section>
    )
} 

    </div>
  )
}

export default ContactUs