import { createContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { setupInterceptors } from "../API/api.js"; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // 1. Inicialización de Usuario (Sincronizado con Signup/Login)
    const [user, setUser] = useState(() => {
        try {
            // Usamos 'user' para coincidir con lo que guarda Signup.jsx
            const savedUser = localStorage.getItem('user');
            if (!savedUser || savedUser === "undefined" || savedUser === "null") return null;
            return JSON.parse(savedUser);
        } catch (e) {
            console.error("DEBUG [SDT]: Error recuperando user", e);
            localStorage.removeItem('user');
            return null;
        }
    });

    // 2. Inicialización de Token
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        if (!savedToken || savedToken === "undefined" || savedToken === "null" || savedToken === "") return null;
        
        // Limpieza de seguridad
        return savedToken.replace(/"/g, "").replace(/Bearer /g, "").trim();
    });

    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    const tokenRef = useRef(token);

    // Sincronizar Referencia y Storage cuando el token cambia
    useEffect(() => {
        tokenRef.current = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    // Sincronizar Objeto Usuario con el Storage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // handleLogout estable
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAppointmentDetails(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    }, []); 

    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    // Configuración única de interceptores
    useEffect(() => {
        const initAuth = async () => {
            setupInterceptors(getAccessToken, setToken, handleLogout); 
            // Pequeño delay para asegurar que el DOM esté listo
            setTimeout(() => setLoading(false), 500);
        };
        initAuth();
    }, [getAccessToken, handleLogout]); 

    const contextValue = useMemo(() => ({
        user,
        setUser, 
        token,
        setToken,
        loading, 
        getAccessToken, 
        setAppointmentDetails,
        appointmentDetails,
        handleLogout, 
    }), [user, token, loading, appointmentDetails, handleLogout, getAccessToken]);

    return (
        <UserContext.Provider value={contextValue}>
            {!loading ? children : (
                <div className="flex items-center justify-center h-screen bg-[#DCDCDC]">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-[#DCDCDC] rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-[#FEB60D] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                        </div>
                        <div className="text-center">
                            <p className="text-black font-black uppercase tracking-[0.2em] text-sm animate-pulse">
                                Software D T
                            </p>
                            <span className="text-black/50 text-[10px] font-bold uppercase tracking-widest">
                                Sincronizando Datacenter...
                            </span>
                        </div>
                    </div>
                </div>
            )} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };