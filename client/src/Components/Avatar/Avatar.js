import React, { useEffect, useState } from 'react'
import axios from '../Utills/AxiosWithJWT.js'
import  "./Avatar.css"
import noFillPng from "../../assets/images/nofillpng.png"
import { BsFillCameraFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useBankingSystem } from '../Context/UserContext'


const Avatar = () => {
    const token = sessionStorage.getItem("jwtToken");
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const userId = sessionStorage.getItem("userId");
    const { BASE_URL} = useBankingSystem();
    const navigateTo = useNavigate();
    const  [src, setSrc]= useState();
    const  [image, setImage]= useState();


        const getUserImage =async()=>{
            const resp = await axios.get(`${BASE_URL}/api/v1/user/image/${userId}`, { responseType: 'arraybuffer' })
            const blob = new Blob([resp.data], { type: resp.headers['content-type'] });
        const objectUrl = URL.createObjectURL(blob);
        
            setSrc(objectUrl);
        }

        useEffect(()=>{
          getUserImage();
        },[userId])

    const handleImageChange =(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
            setSrc(reader.result);
        };
    
        reader.readAsDataURL(file);
      }

      const handleFileChange =(e)=>{
        const file = e.target.files[0];
            setImage(file);
      }

      const handleBothFileImageChnage=(e)=>{
        handleImageChange(e);
        handleFileChange(e);
      }

        
        const handleImageUpload= async ()=>{
            const formData = new FormData();
            formData.append("image", image);
            const resp = await axios.post(`${BASE_URL}/api/v1/user/image/${userId}`, formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            } )
            console.log(resp);
            if (resp.status === 201) { 
              getUserImage();
                    toast.success("image uploaded!")
            }
        }







  return (
    <div className='  flex flex-col justify-center items-center pt-8'>
        
       
<div className="upload">
{src ? (<img className='defaultClass' src={src
    }    />):(<img className='defaultClass'  src={noFillPng} />) } 
  {/* <div className='flex flex-row justify-center items-center space-x-4'>
  <input className=' w-[15rem] border-2 rounded-full file:rounded-full file:px-[1rem]' id='file' type="file" name='file' />
  <button className='bg-gray-600 text-white rounded-full font-semibold px-4 py-2 ' >Upload</button>
  </div> */}
  <div className='flex flex-col justify-center items-center'>
    <label
  htmlFor="file-upload"
  className="block w-[2.2rem] h-[2.2rem] rounded-full relative  left-[3rem] bottom-[2rem]  cursor-pointer bg-gray-300 rounded-md font-medium text-white hover:bg-gray-400 "
>
  <BsFillCameraFill className='absolute left-[0.6rem] top-[0.5rem]  text-black scale-[1.5]'/>
  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleBothFileImageChnage}  />
</label>
<button className='bg-gray-500 px-4 py-2 font-semibold text-white rounded-full' onClick={handleImageUpload}  >Upload</button>
</div>

  
</div>



    </div>
  )
}

export default Avatar