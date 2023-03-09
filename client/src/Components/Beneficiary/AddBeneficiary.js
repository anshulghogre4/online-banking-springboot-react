import React, {useEffect, useState} from 'react'
import axios from '../Utills/AxiosWithJWT.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useBankingSystem } from '../Context/UserContext.js';


const AddBeneficiary = () => {
    const {BASE_URL, userDetails} = useBankingSystem();
    
    

    const navigateTo = useNavigate();
    useEffect(()=>{
      if(!sessionStorage.getItem("jwtToken")){
        navigateTo("/")
      }
    },[])

    const [userBeneficiary,setUserBeneficiary] = useState({
        beneaccountno : "",
        beneficiaryname : "",
        relation: ""
      
    })

    let beneficiary,beneficiaryValue;

        const  handleBeneficiaryDetails = (ele) =>{
            beneficiary = ele.target.name;
            beneficiaryValue = ele.target.value;
            setUserBeneficiary({...userBeneficiary,[beneficiary]:beneficiaryValue});
        };


        const handleAddBeneficiarySubmit = async (e) => {
            e.preventDefault();
            
  
            const { beneaccountno, beneficiaryname, relation} = userBeneficiary;
  
            const data = {
                beneaccountno,
                beneficiaryname,
                relation
            }
  
            if (!beneaccountno || !beneficiaryname || !relation ) {
               //alert("Please fill all fields");
               toast.error("Please fill all fields");
              return;
            };

                const userId = userDetails.userId;
                console.log("++++tet++ ");
              const resp = await axios.post(`${BASE_URL}/beneficiaries/create/${userId}`, data);
                
                console.log("++++tet++ ",resp);
                
                if (resp.data === "This account cannot be added"){
                    toast.success("You can't add yourself as a beneficiary");
                    return;
                }

                if (resp.data === "Already Exists"){
                    toast.success("Beneficiary already added");
                    return;
                }


                if (resp.status === 200) {
                  navigateTo("/dashboard/trx")
                  toast.success("Beneficiary Added Successfullly!");
            }else{
              toast.error("Error While Adding Beneficiary");
            }
  
           } 

  return (
    
    <section className='flex flex-col items-center justify-center h-[100vh] '>
    <form  
     onSubmit={handleAddBeneficiarySubmit}
     className="bg-white p-6 rounded-lg flex flex-col  items-start  justify-center border border-2">
    
      
    <div className=' flex flex-row items-center justify-center space-x-4'>
        <p className='text-xl font-semibold'>Beneficiary Account Number:</p>
        <label className="font-medium text-lg mb-2" htmlFor="beneaccountno">
        <input
          className="bg-gray-200 w-[20rem] p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
          type="number"
          id="beneaccountno"
          name='beneaccountno'
          required
           value={userBeneficiary?.beneaccountno}
           onChange={handleBeneficiaryDetails}
        />
        </label>
        </div>
    

    
    <div className=' flex flex-row items-center justify-center space-x-4'>
    <p className='text-xl font-semibold'>Beneficiary Name:</p>
    <label className="block font-medium text-lg mb-2" htmlFor="beneficiaryname">
      <input className="bg-gray-200 w-[20rem] p-2 ml-[6.3rem] rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
        type="text"
        id="beneficiaryname"
        name='beneficiaryname'
         value={userBeneficiary?.beneficiaryname}
         onChange={handleBeneficiaryDetails}
      />
    </label>
    </div>

    <div className=' flex flex-row items-center justify-center space-x-4'>
    <p className='text-xl font-semibold'>Beneficiary Relation:</p>
    <label className="block font-medium text-lg mb-2" htmlFor="relation">
      <input className="bg-gray-200  w-[20rem]  p-2 ml-[5rem] rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
        type="text"
        id="relation"
        name='relation'
         value={userBeneficiary?.relation}
         onChange={handleBeneficiaryDetails}
         />
    </label>
    </div>
    

    <div className=' flex flex-row justify-center items-center space-x-4'>

      <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
        Add Beneficiary
      </button>

    </div>





  </form>
  </section>

  )
}

export default AddBeneficiary