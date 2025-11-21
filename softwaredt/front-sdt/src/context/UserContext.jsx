import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api"; 
// 🚨 Importación de hook: Se mantiene comentada para evitar el error de compilación 500.
// Si el archivo existe en la ruta '../hooks/useOnClickOutside', descomenta.
// import useOnClickOutside from "../hooks/useOnClickOutside"; 

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    // Definición de estados
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    // 1. Usar useRef para estabilizar el token
    const tokenRef = useRef(token);
    
    // Sincroniza la Referencia (Ref) con el estado (token)
    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    // Función de limpieza de sesión
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
            // 📝 NOTA: Aquí iría la lógica para llamar a tu API y obtener el perfil
            setUser({ profileLoaded: false }); 
        }

        setLoading(false);
    }, []); 


    // Efecto 2: Configurar los interceptores de Axios
    // 3. Se llama con los TRES argumentos requeridos por la versión corregida de api.js
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
            {/* Bloquear la interfaz hasta que se verifique la sesión */}
            {!loading ? children : <div>Cargando sesión...</div>} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };