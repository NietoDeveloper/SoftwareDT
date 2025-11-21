import { createContext, useState, useEffect, useCallback } from "react";
import { setupInterceptors } from "../API/api"; // Se asume que esta es la ruta correcta
// Asegúrate de que esta ruta sea correcta para tu lógica de hooks/utilidades
import useOnClickOutside from "../hooks/useOnClickOutside"; // Si lo usas, impórtalo aquí o en los componentes que lo necesitan

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    // Definición de estados
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    
    // Función de limpieza de sesión
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken'); 
        // 🚨 CRÍTICO: Limpiar cualquier dato de sesión adicional si existe
        // localStorage.removeItem('user'); 
    }, []);

    // Función para leer el token actual desde el estado (necesaria para el interceptor)
    // Usamos 'useCallback' para que el useEffect que configura los interceptores
    // no se ejecute infinitamente.
    const getAccessToken = useCallback(() => {
        return token;
    }, [token]);


    // Efecto 1: Cargar el token al iniciar la aplicación
    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        
        if (storedAccessToken) {
            setToken(storedAccessToken);
            // 📝 NOTA: Aquí iría la lógica para llamar a tu API y obtener el perfil
            // fetchUser(storedAccessToken); 

            // Para que los componentes que consumen el contexto no muestren un usuario nulo 
            // hasta que se obtenga el perfil real, puedes establecer un usuario placeholder si lo deseas.
            setUser({ profileLoaded: false }); 
        }

        // Una vez que se verifica localStorage, loading debe ser false.
        setLoading(false);
    }, []); // Sin dependencias, solo se ejecuta al montar


    // Efecto 2: Configurar los interceptores de Axios
    // Se ejecuta solo una vez al montar, y cuando getAccessToken o handleLogout cambien
    // (aunque getAccessToken depende del token, setupInterceptors maneja la configuración única)
    useEffect(() => {
        // 🔑 CORRECCIÓN CRÍTICA: Se pasa el getter y el setter/limpiador.
        // Asumiendo que setupInterceptors en api.js recibe (getAccessToken, handleLogout)
        setupInterceptors(getAccessToken, handleLogout); 
        
        // El interceptor usa getAccessToken() para obtener el valor más reciente del token.
        // No añadimos getAccessToken o handleLogout a las dependencias si setupInterceptors
        // maneja la configuración única, pero si no se usa el patrón de ref, se deben incluir:
        // return () => { /* Aquí iría la lógica para desmontar los interceptores si fuera necesario */ };
    }, [getAccessToken, handleLogout]); 

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                loading, // Estado de carga (útil para proteger rutas antes de que se lea el token)
                getAccessToken, // Exponer el getter si otros componentes lo necesitan
                setAppointmentDetails,
                appointmentDetails,
                handleLogout, // Función de cierre de sesión
            }}
        >
            {/* 🔑 Solo renderizar los hijos si la verificación inicial (loading) ha terminado */}
            {!loading ? children : <div>Cargando sesión...</div>} 
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };