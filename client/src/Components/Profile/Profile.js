
import React, { useState, useEffect } from 'react';
import { useBankingSystem } from "../Context/UserContext.js"
import axios from "../Utills/AxiosWithJWT.js"
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"
import NavbarDashboard from '../Dashboard/NavbarDashboard.js';

const Profile = () => {

  const token = sessionStorage.getItem("jwtToken");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  //contextAPI
  const { BASE_URL, setUser: setUserDetails, userDetails, gettingAUser } = useBankingSystem();
  // const [image, setImage] = useState(null);
  // const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [existedUser, setExistedUser] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    userdetails: {
      userdetailsid: "",
      address: "",
      city: "",
      state: "",
      pin: "",
      adhaar: "",
      pan: "",
      gender: "",
      mobile: "",
      dateOfBirth: ""

    }
  });



  const navigateTo = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("jwtToken")){
      navigateTo("/")
    }
  },[])

  useEffect(() => {
  setExistedUser(userDetails)
  }, [userDetails])



  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     setImage(file)
  //     setImagePreviewUrl(reader.result);
  //   }

  //   reader.readAsDataURL(file)
  // }


  let user, uservalue;
  const handleAlreadyExistedDetails = (ele) => {
    const fieldsLevel1 = ['userId',
      'firstname',
      'lastname',
      'email'];
    user = ele.target.name;
    uservalue = ele.target.value;
    console.log("+++++ ", user);
    if (fieldsLevel1.indexOf(user?.trim()) < 0) {
      let modifiedUser = {
        ...existedUser,
        userdetails: {
          ...existedUser?.userdetails,
          [user]: uservalue,
        }
      };
      console.log("Modified User: ", modifiedUser);
      setExistedUser(modifiedUser);
    } else {
      let modifiedUser = { ...existedUser, [user]: uservalue };
      console.log("Modified User 2: ", modifiedUser);
      setExistedUser(modifiedUser);
    }


  };


    useEffect(()=>{
      
      },[existedUser])

  const handleCreateProfile = async (event) => {
    event.preventDefault();
    console.log("create profile initiated", existedUser);
    
      

    const { userdetails } = existedUser;

    console.log("adhaar length ",userdetails?.adhaar?.length);
    console.log("pan length ",userdetails?.pan?.length);
    console.log("mobile length ",userdetails?.mobile?.length);
    
    const data = {
      address: userdetails?.address,
      city: userdetails?.city,
      state: userdetails?.state,
      pin: userdetails?.pin,
      adhaar: userdetails?.adhaar,
      pan: userdetails?.pan,
      gender: userdetails?.gender,
      mobile: userdetails?.mobile,
      dateOfBirth: userdetails?.dateOfBirth
    }


    if (!userdetails?.adhaar || !userdetails?.pan || !userdetails?.mobile || !userdetails?.gender ) {
      //alert("Please fill all fields");
      toast.error("Please fill all mandatory fields");
      return;
    };

    


    if (userdetails?.adhaar?.length !== 12) {
      toast.error("Aadhar must be of 12 numbers!");
      return;
    }

    if (userdetails?.pan?.length !== 10) {
      toast.error("PAN must be of 10 numbers!");
      return;
    }

    if (userdetails?.mobile?.length !== 10) {
      toast.error("Mobile number must be of 10 numbers!");
      return;
    }

    const profileResp = await axios.put(`${BASE_URL}/api/v1/user/updateprofile/${existedUser.userId}`, data);

    setUserDetails(profileResp.data.user);

    console.log(profileResp);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Created,Please Relogin and Request for Account opening!");
      sessionStorage.clear();
      navigateTo("/login")

    } else {
      toast.error("Error in creating Profile!");
    }



  }

  useEffect(()=>{
      
  },[existedUser])


  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    console.log("update profile initiated", existedUser);

    const { userdetails } = existedUser;

    console.log("adhaar length ",typeof(userdetails?.adhaar));
    
    console.log("pan length ",userdetails?.pan?.length);
    console.log("pan length ",typeof(userdetails?.pan));
    console.log("mobile length ",userdetails?.mobile?.length);

    const data = {
      userdetailsid: userdetails?.userdetailsid,
      address: userdetails?.address,
      city: userdetails?.city,
      state: userdetails?.state,
      pin: userdetails?.pin,
      adhaar: userdetails?.adhaar,
      pan: userdetails?.pan,
      gender: userdetails?.gender,
      mobile: userdetails?.mobile,
      dateOfBirth: userdetails?.dateOfBirth
    }


    if (!userdetails?.adhaar || !userdetails?.pan || !userdetails?.mobile) {
      //alert("Please fill all fields");
      toast.error("Please fill all mandatory fields");
      return;
    };

    if (userdetails?.adhaar?.length !== 12) {
      toast.error("Aadhar must be of 12 numbers!");
      return;
    }

    if (userdetails?.pan?.length !== 10) {
      toast.error("PAN must be of 10 numbers!");
      return;
    }

    if (userdetails?.mobile?.length !== 10) {
      toast.error("Mobile number must be of 10 numbers!");
      return;
    }



    const profileResp = await axios.put(`${BASE_URL}/api/v1/user/updateprofile/${existedUser.userId}`, data);

    setUserDetails(profileResp.data.user);

    console.log(profileResp);

    if (profileResp.status === 200) {
      toast.success("Profile Successfully Updated,Please Relogin and Request for Account opening!");
      sessionStorage.clear();
      navigateTo("/login")

    } else {
      toast.error("Error in creating Profile!");
    }



  }




  if (!existedUser?.userdetails?.userdetailsid) {

    return (
        <> 
          <NavbarDashboard/>

      <form onSubmit={handleCreateProfile} className="bg-white p-6 rounded-lg flex flex-col">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block font-medium text-lg mb-2" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
              type="text"
              id="firstname"
              name='firstname'
              value={existedUser?.firstname?.toUpperCase()}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="w-full px-3">
            <label className="block font-medium text-lg mb-2" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
              type="text"
              id="lastname"
              name='lastname'
              value={existedUser?.lastname?.toUpperCase()}
              onChange={handleAlreadyExistedDetails}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block font-medium text-lg mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
              type="email"
              id="email"
              name='lastname'
              value={existedUser?.email}
              onChange={handleAlreadyExistedDetails}
            />
          </div>
        </div>


        <label className="block font-medium text-lg mb-2">
          Address:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="address"
            name='address'
            value={existedUser?.userdetails?.address}
            onChange={handleAlreadyExistedDetails}
          />
        </label>



        <label className="block font-medium text-lg mb-2">
          City:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="city"
            name='city'
            value={existedUser?.userdetails?.city}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          State:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text"
            id="state"
            name='state'
            value={existedUser?.userdetails?.state}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          PIN Code:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="pin"
            name='pin'
            value={existedUser?.userdetails?.pin}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          Aadhar Card Number:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="adhaar"
            name='adhaar'
            value={existedUser?.userdetails?.adhaar}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          PAN Card Number:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="pan"
            name='pan'
            value={existedUser?.userdetails?.pan?.toUpperCase()}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          Gender:
          <div className="inline-block">
            <label className="mr-3">
              <input type="radio"
                id='gender'
                name='gender'
                value='M'
                checked={existedUser?.userdetails?.gender === 'M'}
                onChange={handleAlreadyExistedDetails}
                className="form-radio focus:outline-none focus:shadow-outline-indigo" />
              Male
            </label>
            <label className="mr-3">
              <input type="radio"
                id='gender'
                name='gender'
                value='F'
                checked={existedUser?.userdetails?.gender === 'F'}
                onChange={handleAlreadyExistedDetails}
                className="form-radio focus:outline-none focus:shadow-outline-indigo" />
              Female
            </label>
            <label className="mr-3">
              <input type="radio"
                id='gender'
                name='gender'
                value='M'
                checked={existedUser?.userdetails?.gender === 'O'}
                onChange={handleAlreadyExistedDetails}
                className="form-radio focus:outline-none focus:shadow-outline-indigo" />
              Others
            </label>
          </div>
        </label>

        <label className="block font-medium text-lg mb-2">
          Mobile Number:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="tel"
            //  pattern="[+][9][1][0-9]{10}"
            id="mobile"
            name='mobile'
            value={(existedUser?.userdetails?.mobile)}
            // onChange={(e) => setPhone(e.target.value.substring(3))}
            onChange={handleAlreadyExistedDetails}
          />
        </label>
        <br />

        <label className="block font-medium text-lg mb-2">
          Date of Birth:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="date"
            id='dateOfBirth'
            name='dateOfBirth'
            value={(existedUser?.userdetails?.dateOfBirth)}
            onChange={handleAlreadyExistedDetails} />
        </label>
        <br />

        {/* <div>
    <label className="block font-medium text-lg mb-2">
      Profile Picture:
      <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="file" onChange={handleImageChange} accept="image/*" />
    </label>
    <br />
    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover" />}
  </div> */}


        <div className=' flex flex-row justify-center items-center space-x-4'>



          <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">
            Create
          </button>





        </div>





      </form>
      </>
    )


  }
  else {
    // .................................................else condition.......................................
    return (

      <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-lg flex flex-col">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block font-medium text-lg mb-2" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
              type="text"
              id="firstname"
              name='firstname'
              value={existedUser?.firstname?.toUpperCase()}
              onChange={handleAlreadyExistedDetails}
            />
          </div>

          <div className="w-full px-3">
            <label className="block font-medium text-lg mb-2" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
              type="text"
              id="lastname"
              name='lastname'
              value={existedUser?.lastname?.toUpperCase()}
              onChange={handleAlreadyExistedDetails}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block font-medium text-lg mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
              type="email"
              id="email"
              name='lastname'
              value={existedUser?.email}
              onChange={handleAlreadyExistedDetails}
            />
          </div>
        </div>


        <label className="block font-medium text-lg mb-2">
          Address:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="address"
            name='address'
            value={existedUser?.userdetails?.address}
            onChange={handleAlreadyExistedDetails}
          />
        </label>



        <label className="block font-medium text-lg mb-2">
          City:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="city"
            name='city'
            value={existedUser?.userdetails?.city}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          State:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100" type="text"
            id="state"
            name='state'
            value={existedUser?.userdetails?.state}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          PIN Code:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="pin"
            name='pin'
            value={existedUser?.userdetails?.pin}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          Aadhar Card Number:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="adhaar"
            name='adhaar'
            value={existedUser?.userdetails?.adhaar}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          PAN Card Number:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:bg-white hover:bg-gray-100"
            type="text"
            id="pan"
            name='pan'
            value={existedUser?.userdetails?.pan?.toUpperCase()}
            onChange={handleAlreadyExistedDetails} />
        </label>

        <label className="block font-medium text-lg mb-2">
          Gender:
          <div className="inline-block">
            <label className="mr-3">
              <input type="radio"
                id='gender'
                name='gender'
                value='M'
                checked={existedUser?.userdetails?.gender === 'M'}
                onChange={handleAlreadyExistedDetails}
                className="form-radio focus:outline-none focus:shadow-outline-indigo" />
              Male
            </label>
            <label className="mr-3">
              <input type="radio"
                id='gender'
                name='gender'
                value='F'
                checked={existedUser?.userdetails?.gender === 'F'}
                onChange={handleAlreadyExistedDetails}
                className="form-radio focus:outline-none focus:shadow-outline-indigo" />
              Female
            </label>
            <label className="mr-3">
              <input type="radio"
                id='gender'
                name='gender'
                value='O'
                checked={existedUser?.userdetails?.gender === 'O'}
                onChange={handleAlreadyExistedDetails}
                className="form-radio focus:outline-none focus:shadow-outline-indigo" />
              Others
            </label>
          </div>
        </label>

        <label className="block font-medium text-lg mb-2">
          Mobile Number:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="tel"
            //  pattern="[+][9][1][0-9]{10}"
            id="mobile"
            name='mobile'
            value={(existedUser?.userdetails?.mobile)}
            // onChange={(e) => setPhone(e.target.value.substring(3))}
            onChange={handleAlreadyExistedDetails}
          />
        </label>
        <br />

        <label className="block font-medium text-lg mb-2">
          Date of Birth:
          <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="date"
            id='dateOfBirth'
            name='dateOfBirth'
            value={(existedUser?.userdetails?.dateOfBirth)}
            onChange={handleAlreadyExistedDetails} />
        </label>
        <br />

        {/* <div>
    <label className="block font-medium text-lg mb-2">
      Profile Picture:
      <input className="bg-gray-200 p-2 rounded-lg w-full focus:outline-none focus:shadow-outline-indigo" type="file" onChange={handleImageChange} accept="image/*" />
    </label>
    <br />
    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover" />}
  </div> */}


        <div className=' flex flex-row justify-center items-center space-x-4'>



          <button className="bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700">
            Update
          </button>


        </div>

      </form>
    )
  }











}

export default Profile