import React, {useContext, useState} from "react";

const UserContext  = React.createContext()


//instead creating diffrent file for Context,We utlized useContext here and we're exporting it
export function useBankingSystem(){

    return useContext(UserContext)

};


//Exporting the provider in index.js
export const UserContextProvider=({children}) =>{

     const BASE_URL = "http://localhost:8081";

    const [userDetails, setUserDetails]= useState();

return(
    //setting the values to be used for many times in different component
    <UserContext.Provider value={{userDetails, setUserDetails, BASE_URL}}>

        {children}

    </UserContext.Provider>

)
}