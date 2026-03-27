import { createContext, useState, useEffect, useCallback, useRef, useMemo, useContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    
    // 1. Sanitización de Datos Core
    const sanitize = (val) => {
        if (!val || val === "undefined" || val === "null") return null;
        return typeof val === 'string' ? val.replace(/['"]+/g, '').trim() : val;
    };

    // 2. Inicialización de Estado (Hidratación)
    const [token, setToken] = useState(() => sanitize(localStorage.getItem('token')));
    
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('user');
            return (saved && saved !== "undefined" && saved !== "null") ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const tokenRef = useRef(token);

    // 3. Persistencia Atómica
    // Escuchamos cambios en token/user para mantener LocalStorage al día
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

    /**
     * 🚀 handleLogin: Protocolo de Handshake
     * Inyecta la identidad en el estado global tras el Registro o Login exitoso.
     */
    const handleLogin = useCallback((userData, userToken) => {
        const cleanToken = sanitize(userToken);
        if (!cleanToken) {
            console.error("⚠️ SDT IDENTITY: Token inválido en el Handshake.");
            return;
        }

        // Actualización síncrona de ambos estados
        setToken(cleanToken);
        setUser(userData);
        tokenRef.current = cleanToken;
        
        console.log(`📡 [USER-DATACENTER]: Nodo conectado -> ${userData.email}`);
    }, []);

    /**
     * 🔐 handleLogout: Limpieza total por seguridad
     */
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        setAppointmentDetails(null);
        tokenRef.current = null;
        localStorage.clear();
        console.log("🔒 [USER-DATACENTER]: Nodo desconectado.");
    }, []);

    const getAccessToken = useCallback(() => tokenRef.current, []);

    // 4. Ciclo de Vida: Validación de Integridad Inicial
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken || storedToken === "undefined") {
            if (tokenRef.current) handleLogout();
        }
        
        // Simulación de carga para sincronización de UI S+
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, [handleLogout]);

    // 5. Ecosistema de Datos Memorizado
    const contextValue = useMemo(() => ({
        user, 
        setUser,
        token, 
        setToken,
        loading,
        getAccessToken,
        appointmentDetails,
        setAppointmentDetails,
        handleLogout, 
        handleLogin,
    }), [user, token, loading, appointmentDetails, handleLogout, handleLogin, getAccessToken]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("SDT_CONTEXT_ERROR: useUser debe ser usado dentro de un UserProvider.");
    }
    return context;
};