import { createContext, useState, useEffect, useCallback } from "react";
import { setupInterceptors } from "../API/api";
import React from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // El token es el objeto que contendrá el accessToken
    const [token, setToken] = useState(null); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);

        localStorage.removeItem('accessToken'); 
    }, [setToken, setUser]);

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        
        if (storedAccessToken) {
        
            setToken({ accessToken: storedAccessToken }); 
            
        }
    }, []); 
    
    useEffect(() => {
        setupInterceptors(setToken, handleLogout);
    }, [setToken, handleLogout]);


    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                setAppointmentDetails,
                appointmentDetails,
                handleLogout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { UserProvider, AppContext };