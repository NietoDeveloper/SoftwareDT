import { createContext, useState, useEffect, useCallback, useRef } from "react";
import { setupInterceptors } from "../API/api"; 
// 🔑 Importación de hook: Si el archivo existe en la ruta '../hooks/useOnClickOutside', descomenta.
// Si no existe, déjalo comentado y resuelve la dependencia de Header.jsx.
// import useOnClickOutside from "../hooks/useOnClickOutside"; 

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    // Definición de estados
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    // 💡 Paso 1: Usar useRef para estabilizar el token
    const tokenRef = useRef(token);
    
    // Sincroniza la Referencia (Ref) con el estado (token)
    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    // Función de limpieza de sesión
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken'); 
    }, []); // Dependencias vacías, solo se crea una vez

    // 💡 Paso 2: El Getter usa el Ref (estable, no cambia con 'token')
    const getAccessToken = useCallback(() => {
        return tokenRef.current; // Devuelve el valor más reciente del token
    }, []); // Dependencias vacías, solo se crea una vez

    // Efecto 1: Cargar el token al iniciar la aplicación (Sin cambios, ya era correcto)
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        
        if (storedAccessToken) {
            setToken(storedAccessToken);
            // 📝 NOTA: Aquí iría la lógica para llamar a tu API y obtener el perfil
            // fetchUser(storedAccessToken); 

            setUser({ profileLoaded: false }); 
        }

        setLoading(false);
    }, []); 


    // Efecto 2: Configurar los interceptores de Axios
    // 💡 Paso 3: setupInterceptors se llama con los 3 argumentos necesarios.
    useEffect(() => {
        // La función getAccessToken es ESTABLE (gracias al useCallback y useRef).
        // La función setToken es ESTABLE.
        // La función handleLogout es ESTABLE (gracias al useCallback).
        // Por lo tanto, este useEffect solo se ejecuta al montar el componente.
        
        // 🔑 CORRECCIÓN CRÍTICA: Se pasan los TRES argumentos.
        setupInterceptors(getAccessToken, setToken, handleLogout); 
        
    }, [getAccessToken, setToken, handleLogout]); 
    // Al ser las dependencias funciones useCallback y setState, este efecto se estabiliza.


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
            {/* 🔑 Bloquear la interfaz hasta que se verifique la sesión */}
            {!loading ? children : <div>Cargando sesión...</div>} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };