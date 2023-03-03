import React, {useContext, useState} from "react";

const UserContext  = React.createContext()

export function useBankingSystem(){

    return useContext(UserContext)

};


export const UserContextProvider=({children}) =>{

     const BASE_URL = "http://localhost:8081";


    const [userDetails, setUserDetails]= useState();








return(

    <UserContext.Provider value={{userDetails, setUserDetails, BASE_URL}}>

        {children}

    </UserContext.Provider>

)
}