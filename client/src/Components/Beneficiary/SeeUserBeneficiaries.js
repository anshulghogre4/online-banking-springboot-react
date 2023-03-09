import React, {useState, useEffect} from 'react'
import { useBankingSystem } from '../Context/UserContext.js'
import axios  from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast'
import Popup from 'reactjs-popup'
import { useNavigate } from 'react-router-dom'
import 'reactjs-popup/dist/index.css';


const SeeUserBeneficiaries = () => {
    const navigateTo = useNavigate();

    const [userBeneficiaries, setUserBeneficiaries] = useState(null);
    const [currentBeneficiary, setCurrentBeneficiary] = useState(null)
    const {BASE_URL, userDetails } = useBankingSystem();
        

    const getUserBeneficiaries = async()=>{
             
            const resp = await axios.get(`${BASE_URL}/beneficiaries/user/${userDetails?.userId}`)
               
                setUserBeneficiaries(resp?.data);
    }



    useEffect(()=>{
      
        if(!sessionStorage.getItem("jwtToken")){
          navigateTo("/")
        }
      
        getUserBeneficiaries();
        
    },[userDetails]);


    const handleDeleteBeneficiaries= async (beneId)=>{

            const resp = await axios.delete(`${BASE_URL}/beneficiaries/deleteabn/${beneId}`) 
            getUserBeneficiaries();

            if (resp.status === 204 || resp.status === 200 || resp.status === 201) {
                toast.success("Beneficiary Deleted!");
            } else{
                toast.error(" Error while Beneficiary Delete!");
            }
            
            console.log(resp);

    }

    let thisBeneficiary, thisBeneficiaryValue;
    const handleUpdateBeneficiaryDetails =(e)=>{
        thisBeneficiary = e.target.name;
        thisBeneficiaryValue = e.target.value;
        setCurrentBeneficiary({ ...currentBeneficiary, [thisBeneficiary]: thisBeneficiaryValue })
    }


    const handleUpdateBeneficiary = async (e)=>{

        e.preventDefault();
            
        const {beneficiaryid, beneaccountno, beneficiaryname, relation} = currentBeneficiary;

            const data = {
                beneficiaryid,
                beneaccountno,
                beneficiaryname,
                relation
            }

                const resp = await axios.put(`${BASE_URL}/beneficiaries/updateabn/${userDetails.userId}`, data);

                console.log(resp);
                if (resp.status === 200) {
                    navigateTo("/dashboard/trx");
                    toast.success("Beneficiary Updated Successfullly!");
              }else{
                toast.error("Error While Updating The  Beneficiary");
              }


    }





  return (
   <>
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Beneficiaries
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Beneficiary ID
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Beneficiary AC Number
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Beneficiary Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                Beneficiary Relation
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Update
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>

               { 
                 userBeneficiaries && userBeneficiaries.map((beneficiary) => ( 
                  <tr key={beneficiary.beneficiaryid}  >
                <td className="px-4 py-3">
                     {beneficiary.beneficiaryid} 
                    </td>
                <td className="px-4 py-3">
                     {beneficiary.beneaccountno} 
                    </td>
                    <td className="px-4 py-3">
                     {beneficiary.beneficiaryname} 
                    </td>
                    <td className="px-4 py-3">
                     {beneficiary.relation} 
                    </td>
                <td className="px-4 py-3">
                  {/* <button className="hover:text-green-500" 
                
                   >Edit</button> */}
                         <Popup
                                                trigger={<div><button onClick={() => setCurrentBeneficiary(beneficiary)
                                                }
                                                    className="button hover:text-green-500" > Update</button></div>}
                                                modal
                                                nested>

                                                {close => (
                                                    <div className="modal">
                                                        <button className="close" onClick={close}>
                                                            &times;
                                                        </button>
                                                        <div className="header"> time pass </div>
                                                        <div className="content">

                                                        <section className='flex flex-col items-center justify-center h-[100vh] '>
    <form  
      onSubmit={handleUpdateBeneficiary}
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
            value={currentBeneficiary?.beneaccountno}
           onChange={handleUpdateBeneficiaryDetails}
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
          value={currentBeneficiary?.beneficiaryname}
         onChange={handleUpdateBeneficiaryDetails}
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
          value={currentBeneficiary?.relation}
          onChange={handleUpdateBeneficiaryDetails}
         />
    </label>
    </div>
    

    <div className=' flex flex-row justify-center items-center space-x-4'>

      <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
        Update Beneficiary
      </button>

    </div>





  </form>
  </section>
                                                            
                                                        </div>
                                                        <div className="actions">
                                                           
                                                            <button
                                                                className="button"
                                                                onClick={() => {
                                                                    console.log('modal closed ');
                                                                    close();
                                                                }}
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Popup>

                   


                </td>
                <td className="px-4 py-3 text-lg text-gray-900">
                  <button className="hover:text-red-500" 
                   onClick={()=>{
                    handleDeleteBeneficiaries(beneficiary.beneficiaryid)
                   }} 
                   >Delete</button>
                </td>
              </tr>

                 )) 
               } 
              
            </tbody>
          </table>
        </div>
      </div>
    </section>
   </>
  )
}

export default SeeUserBeneficiaries