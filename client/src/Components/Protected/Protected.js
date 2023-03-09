import React, { useEffect } from 'react'
import { useBankingSystem } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
const Protected = ({Component}) => {
    const {userDetails} = useBankingSystem();
    const navigateTo = useNavigate();

    useEffect(()=>{
      if(!sessionStorage.getItem("jwtToken")){
        navigateTo("/")
      }
        if ( userDetails?.accounts === null || userDetails?.accounts?.length == 0){
            navigateTo("/dashboard");
        }
    },[userDetails])

  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected