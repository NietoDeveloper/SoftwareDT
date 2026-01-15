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




                            </p>
                       
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