import React, { useEffect } from 'react'
import dashimg from "../../assets/images/Welcome_dashboard.png"
import axios from "../Utills/AxiosWithJWT.js"
import { useBankingSystem } from '../Context/UserContext'
import { toast } from 'react-hot-toast'
import { useNavigate, NavLink } from 'react-router-dom'


//need to create checks for every page in dashboard for account no, if account no is present then only permit user to reach that URI else navigate back to dashboard

const DashboardMain = () => {

  const { BASE_URL, userDetails, setUser: setUserDetails } = useBankingSystem();



  console.log(userDetails?.userId);
  //console.log(userDetails.accounts[0].accountno);
  let accountNo = 0;


  // const role = userDetails?.role;

  // const navigateTo = useNavigate();
  // if (role == "ADMIN") {
  //   navigateTo("/admin");
  // }


  if (userDetails?.accounts?.length == 0) {
    console.log("@@@@@@@@@@@ Empty null")
  }
  else {

    accountNo = userDetails?.accounts[0]?.accountno;
    console.log("@@@@@@@@@@@ not null accno : " + accountNo)
  }

  console.log("account no :" + accountNo);

  useEffect(() => {
    
  }, [userDetails])



  const handleAccountOpnReq = async (e) => {

    e.preventDefault("user Id is ", userDetails?.userId);




    if (userDetails?.userdetails?.adhaar == null || userDetails?.userdetails?.pan == null || userDetails?.userdetails?.mobile == null || userDetails?.userdetails?.gender == null) {
      toast.error("Please Update Profile First");
      return;
    }

    if (userDetails?.accountopenningreq === false) {
      const reqResp = await axios.put(`${BASE_URL}/api/v1/user/acopreq/${userDetails?.userId}`)
      setUserDetails(reqResp.data);
      toast.success("Request Sent Successfully!");
      console.log(reqResp);

    } else {
      toast.success("Already Requested For Account Opening!");
    }
  }







  if (accountNo == 0) {
    return (
      <section className='  h-[80vh]  border ' >
        <div className='dash_hero flex flex-row justify-around items-center pt-[1rem]
         '>
          <div className='w-[20rem] bg-[#f1f2f6] p-[1rem] rounded-lg text-center'>
            <button onClick={handleAccountOpnReq} className=' text-[#2d3436] text-[1.5rem] font-semibold rounded-lg '>
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
            <img src={dashimg} className="w-[40rem]" alt="dashboard_welcome_image" />
          </div>
        </div>




      </section>
    )
  } else {
    return (
      <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>

        <h2 className='text-[1.5rem] text-[#f1f2f6] font-semibold text-center'>DashBoard</h2>
        <div className=' flex flex-row justify-around items-center'>

          <div className=' flex flex-col justify-center items-center gap-4'>
            <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
            <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
            <NavLink to={"/dashboard/trx"} > <button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
            <NavLink to={"/dashboard/Stmt"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded text-center'>Statements</button></NavLink>

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