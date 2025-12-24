import { createContext, useState, useEffect, useCallback, useRef, useMemo, useContext } from "react";
import { setupInterceptors } from "../API/api.js"; 

// 1. Crear el contexto con un valor inicial null
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // Inicialización de Usuario
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (!savedUser || savedUser === "undefined" || savedUser === "null") return null;
            return JSON.parse(savedUser);
        } catch (e) {
            console.error("DEBUG [SDT]: Error recuperando user", e);
            localStorage.removeItem('user');
            return null;
        }
    });

    // Inicialización de Token con limpieza de comillas
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        if (!savedToken || savedToken === "undefined" || savedToken === "null" || savedToken === "") return null;
        return savedToken.replace(/"/g, "").replace(/Bearer /g, "").trim();
    });

    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    // Referencia para los interceptores de Axios
    const tokenRef = useRef(token);

    useEffect(() => {
        tokenRef.current = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAppointmentDetails(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        // Redirección limpia
        window.location.href = '/login';
    }, []); 

    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    // Configuración de interceptores y fin de carga
    useEffect(() => {
        setupInterceptors(getAccessToken, setToken, handleLogout); 
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
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
            {/* Si no está cargando, mostramos la app. Si carga, mostramos el splash SDT */}
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

// Hook personalizado para evitar errores de destructuring
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe ser usado dentro de un UserProvider");
    }
    return context;
};