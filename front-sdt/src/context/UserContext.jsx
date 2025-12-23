import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api.js"; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // 1. Inicializamos estados desde localStorage para evitar el panel vacío al recargar
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null); 
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    const tokenRef = useRef(token);

    // Sincronizar la referencia del token para los interceptores
    useEffect(() => {
        tokenRef.current = token;
        if (token) {
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
        }
    }, [token]);

    // Sincronizar el objeto usuario en localStorage cuando cambie
    useEffect(() => {
        if (user) {
            localStorage.setItem('userData', JSON.stringify(user));
        } else {
            localStorage.removeItem('userData');
        }
    }, [user]);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAppointmentDetails(null);
        localStorage.removeItem('accessToken'); 
        localStorage.removeItem('userData');
    }, []); 

    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    // Solo para el montaje inicial: Finalizar la carga
    useEffect(() => {
        setLoading(false);
    }, []); 

    // Configuración de interceptores de Axios
    useEffect(() => {
        setupInterceptors(getAccessToken, setToken, handleLogout); 
    }, [getAccessToken, setToken, handleLogout]); 

    return (
        <UserContext.Provider
            value={{
                user,
                setUser, // Al llamar setUser(data.userData) desde Login, se guardará todo
                token,
                setToken,
                loading, 
                getAccessToken, 
                setAppointmentDetails,
                appointmentDetails,
                handleLogout, 
            }}
        >
            {!loading ? children : (
                <div className="flex items-center justify-center h-screen bg-main">
                    <p className="text-headingColor font-bold">Iniciando SoftwareDT Datacenter...</p>
                </div>
            )} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };