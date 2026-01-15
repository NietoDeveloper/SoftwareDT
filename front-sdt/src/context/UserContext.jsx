import { createContext, useState, useEffect, useCallback, useRef, useMemo, useContext } from "react";
import { setupInterceptors } from "../API/api.js";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // 1. Estado de Usuario con inicialización segura
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (!savedUser || savedUser === "undefined" || savedUser === "null") return null;
            return JSON.parse(savedUser);
        } catch (e) {
            return null;
        }
    });

    // 2. Estado de Token con limpieza profunda
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        if (!savedToken || savedToken === "undefined" || savedToken === "null" || savedToken === "") return null;
        return savedToken.replace(/"/g, "").replace(/Bearer /g, "").trim();
    });

    const [loading, setLoading] = useState(true);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const tokenRef = useRef(token);

    // Sincronizar Referencia para Interceptores
    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    // Función Centralizada de Login (Clave para la redirección exitosa)
    const handleLogin = useCallback((userData, userToken) => {
        const cleanToken = userToken.replace(/"/g, "").replace(/Bearer /g, "").trim();
        
        // Guardar en Storage inmediatamente
        localStorage.setItem('token', cleanToken);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Actualizar Estado
        setToken(cleanToken);
        setUser(userData);
    }, []);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAppointmentDetails(null);
        localStorage.clear(); // Limpieza total para seguridad
        window.location.href = '/login';
    }, []);

    const getAccessToken = useCallback(() => tokenRef.current, []);

    // Configuración de Interceptores
    useEffect(() => {
        setupInterceptors(getAccessToken, setToken, handleLogout);
        const timer = setTimeout(() => setLoading(false), 800); // Un poco más de tiempo para el splash de clase mundial
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
        handleLogin, // Nueva función expuesta
    }), [user, token, loading, appointmentDetails, handleLogout, handleLogin, getAccessToken]);

    return (
        <UserContext.Provider value={contextValue}>
            {!loading ? children : (
                <div className="flex items-center justify-center h-screen bg-main">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-gainsboro rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-yellowColor border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                        </div>
                        <div className="text-center">
                            <p className="text-headingColor font-black uppercase tracking-[0.2em] text-sm animate-pulse">
                                Software D T
                            </p>
                            <span className="text-textColor/50 text-[10px] font-bold uppercase tracking-widest">
                                Sincronizando Datacenter...
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser debe ser usado dentro de un UserProvider");
    return context;
};