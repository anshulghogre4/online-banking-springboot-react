
import React, { useState } from 'react';
import {useBankingSystem} from "../Context/UserContext"
import axios from "../../Utills/AxiosWithJWT"

const Profile = () => {
   
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [aadharCard, setAadharCard] = useState('');
  const [panCard, setPanCard] = useState('');
  
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const [existedUser, setExistedUser] = useState();

  const { setUserDetails, userDetails} = useBankingSystem();

   

  useEffect(() => {
    console.log(userDetails)
    setExistedUser(userDetails)
 }, [userDetails])

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file)
      setImagePreviewUrl(reader.result);
    }

    reader.readAsDataURL(file)
  }
  


  const  handleAlreadyExistedDetails = (ele) =>{
    user = ele.target.name;
    uservalue = ele.target.value;
    setUserDetails({...userDetails,[user]:uservalue});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
    // Add code here to handle form submission, such as sending the data to a server
  }


  return (
      
    <form className="bg-white p-6 rounded-lg flex flex-col">
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block font-medium text-lg mb-2" for="firstName">
          First Name:
        </label>
        <input
          className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
  
      <div className="w-full px-3">
        <label className="block font-medium text-lg mb-2" for="lastName">
          Last Name:
        </label>
        <input
          className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
    </div>
  
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block font-medium text-lg mb-2" for="email">
          Email:
        </label>
        <input
          className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>

   
    <label className="block font-medium text-lg mb-2">
        Address Line 1:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
        Address Line 2:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
        City:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
        State:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={state} onChange={(e) => setState(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
        PIN Code:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={zip} onChange={(e) => setZip(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
        Aadhar Card Number:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={aadharCard} onChange={(e) => setAadharCard(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
        PAN Card Number:
        <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text" value={panCard} onChange={(e) => setPanCard(e.target.value)} />
    </label>

    <label className="block font-medium text-lg mb-2">
  Gender:
  <div className="inline-block">
    <label className="mr-3">
      <input type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} className="form-radio focus:outline-none focus:shadow-outline-indigo" />
      Male
    </label>
    <label className="mr-3">
      <input type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} className="form-radio focus:outline-none focus:shadow-outline-indigo" />
      Female
    </label>
    <label className="mr-3">
      <input type="radio" value="others" checked={gender === 'others'} onChange={(e) => setGender(e.target.value)} className="form-radio focus:outline-none focus:shadow-outline-indigo" />
      Others
    </label>
  </div>
</label>

<label className="block font-medium text-lg mb-2">
  Phone Number:
  <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="tel" pattern="[+][9][1][0-9]{10}" value={`+91${phone}`} onChange={(e) => setPhone(e.target.value.substring(3))} placeholder="+91" />
</label>
<br />

<label className="block font-medium text-lg mb-2">
  Date of Birth:
  <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
</label>
<br />

<div>
  <label className="block font-medium text-lg mb-2">
    Profile Picture:
    <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="file" onChange={handleImageChange} accept="image/*" />
  </label>
  <br />
  {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover" />}
</div>
      <div className=' flex flex-row justify-center items-center space-x-4'>
      <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
        Create
      </button>
      <button className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700">
        Update
      </button>
      </div>





      </form>
          


  )

  

       
  
}

export default Profile