import React, { useState } from 'react'
import dashimg from "../../assets/images/Welcome_dashboard.png"
import {HiOutlineExclamationCircle} from "react-icons/hi"
import { Modal,Button } from 'flowbite-react'
import { NavLink } from 'react-router-dom'



const DashboardMain = () => {
  let accountNo =1;

  const [show, setShow] = useState(false);






if (accountNo===null) {
  return (
    <section className='  h-[80vh]  border ' >
        <div className='dash_hero flex flex-row justify-around items-center pt-[1rem]
         '>
            <div className='w-[20rem] bg-[#f1f2f6] p-[1rem] rounded-lg text-center'>
            <button className=' text-[#2d3436] text-[1.5rem] font-semibold rounded-lg '>
                 Click here to apply for Account Oppening!
               </button>
      
                {/* Modal Testing */}
                <div>
  {/* <Button bg-white
   onClick={()=> setShow(!show)}>
     Click here to apply for Account Oppening!
  </Button>
  <Modal
    show={show}
    size="md"
    popup={true}
    onClose={()=> setShow(!show)}
  >
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this product?
        </h3>
        <div className="flex justify-center gap-4">
          <Button
            color="failure"
            onClick={()=> setShow(!show)}
          >
            Yes, I'm sure
          </Button>
          <Button
            color="gray"
            onClick={()=> setShow(!show)}
          >
            No, cancel
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal> */}
</div>

            </div>

            <div >
              <img src={dashimg} className="w-[40rem]" alt="dashboard welcome image" />
            </div>
        </div>

        


    </section>
  )
} else{
  return (
  <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>

      <h2 className='text-[1.5rem] text-[#f1f2f6] font-semibold text-center'>DashBoard</h2>
    <div className=' flex flex-row justify-around items-center'>

      <div className=' flex flex-col justify-center items-center gap-4'>
            <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
            <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
            <NavLink to={"/dashboard/trx"} > <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
            <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded text-center'>Statements</button>

      </div>




      <div>
         <h2 className='text-[2rem] text-[#f1f2f6] w-[50rem] text-center'>Congratulations your bank account has been created!</h2>
      </div>
    </div>
  </section>
  )



}
  
}

export default DashboardMain