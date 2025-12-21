import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api.js"; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // Definición de estados
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    const tokenRef = useRef(token);

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken'); 
    }, []); 

    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        
        if (storedAccessToken) {
            setToken(storedAccessToken);
            setUser({ profileLoaded: false }); 
        }

        setLoading(false);
    }, []); 

    useEffect(() => {
        setupInterceptors(getAccessToken, setToken, handleLogout); 
    }, [getAccessToken, setToken, handleLogout]); 


    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                loading, 
                getAccessToken, 
                setAppointmentDetails,
                appointmentDetails,
                handleLogout, 
            }}
        >
            {!loading ? children : <div>Cargando sesión...</div>} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };