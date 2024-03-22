import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext= createContext();

const UserProvider= ({children})=>{
    const [user, setUser]= useState()
    const navigate= useNavigate();

    useEffect(()=>{
        const userDetails= JSON.parse(sessionStorage.getItem("user"));
        setUser(userDetails);

        if(userDetails){
            navigate('/')
        }
    },[navigate]);

// Logout User //
    const logoutUser=()=>{
        sessionStorage.removeItem("user");
        setUser('');
    }

    return (
        <UserContext.Provider value={{user, setUser, logoutUser}}>{children}</UserContext.Provider>
    )
};

export const UserContextState=()=>{
    return useContext(UserContext)
}

export default UserProvider;