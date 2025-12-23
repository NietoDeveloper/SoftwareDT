import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api.js"; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // 1. Inicialización consistente de Usuario
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('userData');
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            console.error("Error parsing userData", e);
            return null;
        }
    });

    // 2. Inicialización consistente de Token (Aseguramos que sea String limpio)
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        return (savedToken && savedToken !== "undefined") ? savedToken : null;
    });

    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    const tokenRef = useRef(token);

    // Sincronizar Token: Referencia -> Storage -> Estado
    useEffect(() => {
        tokenRef.current = token;
        if (token && token !== "undefined") {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Sincronizar Objeto Usuario
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
    }, []); 

    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    // Configuración de interceptores y finalización de carga
    useEffect(() => {
        setupInterceptors(getAccessToken, setToken, handleLogout); 
        setLoading(false);
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
                        <p className="text-headingColor font-black uppercase tracking-widest text-xs">
                            SoftwareDT Datacenter Sincronizando...
                        </p>
                    </div>
                </div>
            )} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };