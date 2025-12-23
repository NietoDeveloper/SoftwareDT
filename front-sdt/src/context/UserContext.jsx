import { createContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { setupInterceptors } from "../API/api.js"; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
    // 1. Inicialización ultra-segura de Usuario
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('userData');
            if (!savedUser || savedUser === "undefined") return null;
            return JSON.parse(savedUser);
        } catch (e) {
            console.error("DEBUG [SDT]: Error recuperando userData", e);
            localStorage.removeItem('userData');
            return null;
        }
    });

    // 2. Inicialización de Token (Limpieza total de strings basura)
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        // Validamos que no sea un string de error común o vacío
        return (savedToken && savedToken !== "undefined" && savedToken !== "null" && savedToken !== "") 
            ? savedToken 
            : null;
    });

    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    // useRef para mantener el token actualizado para los interceptores sin causar re-renders
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
            localStorage.setItem('userData', JSON.stringify(user));
        } else {
            localStorage.removeItem('userData');
        }
    }, [user]);

    // handleLogout estable con useCallback para evitar loops en los interceptores
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAppointmentDetails(null);
        localStorage.clear(); // Limpieza total preventiva del datacenter
    }, []); 

    // Función segura para obtener el token en peticiones async
    const getAccessToken = useCallback(() => {
        return tokenRef.current; 
    }, []); 

    // Configuración única de interceptores al montar el componente
    useEffect(() => {
        const initAuth = async () => {
            setupInterceptors(getAccessToken, setToken, handleLogout); 
            // Pequeño delay artificial para asegurar que la animación de carga sea suave
            setTimeout(() => setLoading(false), 500);
        };
        initAuth();
    }, [getAccessToken, handleLogout]); 

    // Memorización del valor del contexto para evitar re-renders innecesarios en la app
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
                <div className="flex items-center justify-center h-screen bg-main">
                    <div className="flex flex-col items-center gap-6">
                        {/* Spinner estilo SoftwareDT */}
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

export { UserProvider, UserContext };