import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api.js"; 
// 🚨 Importación de hook: Se mantiene comentada para evitar el error de compilación 500.
// Si el archivo existe en la ruta '../hooks/useOnClickOutside', descomenta.
// import useOnClickOutside from "../hooks/useOnClickOutside"; 

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

    // 2. El Getter usa el Ref
    const getAccessToken = useCallback(() => {
        return tokenRef.current; // Devuelve el valor más reciente del token
    }, []); 

    // Efecto 1: Cargar el token al iniciar la aplicación
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