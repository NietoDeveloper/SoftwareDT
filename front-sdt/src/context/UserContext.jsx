import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api.js"; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // 1. Inicialización consistente con las claves de localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Cambiamos a 'token' para que coincida con lo que el Header y Login esperan
    const [token, setToken] = useState(localStorage.getItem('token') || null); 
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    const tokenRef = useRef(token);

    // Sincronizar la referencia del token para los interceptores y Storage
    useEffect(() => {
        tokenRef.current = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Sincronizar el objeto usuario
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
        localStorage.removeItem('token'); 
        localStorage.removeItem('userData');
        // Opcional: localStorage.removeItem('user'); // Por si acaso usaste esta clave antes
    }, []); 

    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    // Finalizar carga inicial
    useEffect(() => {
        setLoading(false);
    }, []); 

    // Configuración de interceptores
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
            {!loading ? children : (
                <div className="flex items-center justify-center h-screen bg-main">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-headingColor font-black uppercase tracking-widest text-sm">
                            SoftwareDT Datacenter...
                        </p>
                    </div>
                </div>
            )} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };