import { createContext, useState, useEffect, useCallback } from "react";
import { setupInterceptors } from "../API/api";

// 1. 🔑 CORRECCIÓN: Renombrado a UserContext para consistencia
const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 
    // 2. 🔑 CRÍTICO: Estado de carga. Inicialmente true hasta que se verifica localStorage.
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    // Función de ejemplo para cargar detalles del usuario (necesaria para llenar 'user')
    // Necesitarás implementar esta función con una llamada a la API
    const fetchUser = useCallback(async (accessToken) => {
        // Ejemplo de lógica futura:
        // try {
        //     const response = await axiosPublic.get('/user/profile', {
        //         headers: { Authorization: `Bearer ${accessToken}` }
        //     });
        //     setUser(response.data.user);
        // } catch (error) {
        //     console.error("Fallo al obtener el perfil de usuario:", error);
        //     handleLogout(); // Limpiar si el token no es válido
        // }
        // Si no tienes una API, puedes omitir esta parte por ahora, pero el 'user' quedará vacío.
    }, []);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken'); 
    }, []);

    // Efecto para cargar el token al iniciar la aplicación
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        
        if (storedAccessToken) {
            // 3. CORRECCIÓN: Almacenamos el token como string (más simple)
            setToken(storedAccessToken);
            
            // 4. 📝 RECORDATORIO: Necesitas una llamada a la API aquí para llenar el estado 'user'
            // fetchUser(storedAccessToken); 
        }

        // 5. 🔑 CRÍTICO: Una vez que se completa la verificación, establece loading en false.
        setLoading(false);
    }, [fetchUser]); // Dependencia fetchUser agregada para useCallback

    // Efecto para configurar los interceptores de Axios
    useEffect(() => {
        // Esto asume que setToken y handleLogout son necesarias en los interceptores
        setupInterceptors(setToken, handleLogout); 
    }, [setToken, handleLogout]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                // 6. 🔑 Añadimos el estado de carga al contexto
                loading, 
                setAppointmentDetails,
                appointmentDetails,
                handleLogout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// 7. 🔑 Exportamos el UserContext para ser usado con useContext()
export { UserProvider, UserContext };