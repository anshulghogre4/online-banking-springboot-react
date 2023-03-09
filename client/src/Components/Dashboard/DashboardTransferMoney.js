import React,{useState,useEffect} from 'react'
import axios from "../Utills/AxiosWithJWT.js"
import { useBankingSystem } from '../Context/UserContext.js'
import NavbarDashboard from './NavbarDashboard'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const DashboardTransferMoney = () => {
    const {BASE_URL, userDetails} = useBankingSystem();
    const [selectedBeneficiary, setSelectedbeneficiary] = useState();
    const [benefeciaryOption, setBenefeciaryOption] = useState([]);
    
    const [accountNo, setAccountNo] = useState();
    const [toAccount, setToAccount] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    // setAccountNo(userDetails?.accounts[0]?.accountno);

    console.log("ye lo fund details ",accountNo,toAccount,amount,description);
    console.log("ye lo selectedBeneficiary ",selectedBeneficiary);
    console.log("ye lo userDetails?.accounts[0]?.accountno  ",userDetails?.accounts[0]?.accountno);

  
    const navigateTo = useNavigate();

        console.log("benlol", benefeciaryOption);

    
       

    const getUserBeneficiaries = async()=>{
             
        const resp = await axios.get(`${BASE_URL}/beneficiaries/user/${userDetails?.userId}`)
           
        setBenefeciaryOption(resp.data);
}

    useEffect(()=>{
        
            if(!sessionStorage.getItem("jwtToken")){
              navigateTo("/")
            }
          
        getUserBeneficiaries();
    },[userDetails])


  
    const handleFundTransferSubmit = async (e)=>{
        e.preventDefault();

        const data ={
            accountno:userDetails?.accounts[0]?.accountno
        }

            const resp = await axios.post(`${BASE_URL}/fund/transfer`, data,{
                params:{
                    toAccount:selectedBeneficiary,
                    amount,
                    description
                }
            })

            console.log(resp);

            if (resp.status === 200) {
                toast.success("Transactions Succesfully done!");
            }
        

    }









  return (
    <div>
        <NavbarDashboard/>
        <section className='h-[80vh] bg-gray-600 border pt-[2rem]'>

<h2 className='text-[1.5rem] text-[#f1f2f6] font-semibold text-center'>DashBoard</h2>
<div className=' flex flex-row justify-around items-center'>

<div className=' flex flex-col justify-center items-center gap-4'>
      <h3 className='text-[1.2rem] text-[#f1f2f6]'>Operations</h3>
      <NavLink to={"/dashboard/balance"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Check balance</button></NavLink>
      <NavLink to={"/dashboard/trx"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Transfer Amount</button></NavLink>
      <NavLink to={"/dashboard/Stmt"} ><button className='w-[10rem] p-2 bg-[#f1f2f6] font-semibold rounded '>Statements</button></NavLink>

</div>


<div className='w-[50rem] '>
        <h2 className='text-[#f1f2f6] text-[1.3rem] '>Amount transfer</h2>
   <div className='flex flex-row justify-around p-4 ml-[2rem] '>
            <button onClick={() => navigateTo("/dashboard/trx/addbene")} className='bg-[#f1f2f6] font-semibold p-1 rounded'>Add beneficiaries</button>
            <button className='bg-[#f1f2f6] font-semibold p-1 rounded'  onClick={() => navigateTo("/dashboard/trx/seebene")}    > View/Update Beneficiaries</button>

   </div>
        <div>
            <select onChange={(event) => setSelectedbeneficiary(event.target.value)}>
                <option > Select Beneficiary</option>
                 { benefeciaryOption && benefeciaryOption.map((options)=>(
                    <option key={options.beneficiaryid} value={options.beneaccountno}>{options.beneficiaryname}</option>
                 )) }
                    
                
            </select>
        </div>
    <div>

        <form  onSubmit={handleFundTransferSubmit}  >
        <div className='flex flex-row justify-around p-4 '>
            <label  className='text-[#f1f2f6]' htmlFor="fromAccount">From Account:
                <input 
                    required
                    contenteditable='true'
                //  value={accountNo}
                 value={userDetails?.accounts[0]?.accountno}
                 
                 onChange={(e)=>{setAccountNo(e.target.value)}}
                 className='text-gray-600'  type="number" name='accountno' id='accountno'  />
            </label>

            <label className='text-[#f1f2f6]'  htmlFor="toAccount">to Account:
                <input required className='text-gray-600' 
                contenteditable='true' value={selectedBeneficiary}
                 onChange={(e)=>{setToAccount(e.target.value)}} type="number" name='toAccount' id='toAccount' />
            </label>
        </div>
                    
        <div className='flex flex-row justify-around p-4 ml-[4rem] '>
        <label className='text-[#f1f2f6] relative right-[1rem]'  htmlFor="amount">Amount
                <input className='text-gray-600' required type="number" value={amount}  onChange={(e)=>{setAmount(e.target.value)}}  name='amount' id='amount' />
            </label>
            <label className='text-[#f1f2f6]'  htmlFor="Remark">Remark
                <input className='text-gray-600' required value={description} onChange={(e)=>{setDescription(e.target.value)}}   type="text" name='description' id='Remark' />
            </label>
        </div  >
            <div className='flex flex-row justify-center items center'><button type='submit' className='bg-[#f1f2f6] font-semibold px-[2rem] py-[0.5rem] rounded'>Send</button></div>
        
        </form>
    </div>
</div>
</div>
</section>


    </div>
  )
}

export default DashboardTransferMoney