import axios from "../Utills/AxiosWithJWT.js"
import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const UserContext  = React.createContext()

    

//instead creating diffrent file for Context,We utlized useContext here and we're exporting it
export function useBankingSystem(){
 
    return useContext(UserContext)

};


//Exporting the provider in index.js
export const UserContextProvider=({children}) =>{
   
    const navigateTo =useNavigate();
     const BASE_URL = "http://localhost:8081";

    const [userDetails, setUserDetails]= useState();

    const setUser = (details => {
        console.log("Main Pagal Hu: ", details);
        setUserDetails(details)
    })

    const gettingAUser = async () =>{

        const userid = sessionStorage.getItem("userId");

        const resp = await axios.get(`${BASE_URL}/api/v1/user/auser`,{
            params:{
                userid
            }
        })
        
        setUser(resp.data);
        

    }
        useEffect(()=>{
            gettingAUser();
        },[])





return(
    //setting the values to be used for many times in different component
    <UserContext.Provider value={{userDetails, setUser, BASE_URL, gettingAUser }}>

        {children}

    </UserContext.Provider>

)
}