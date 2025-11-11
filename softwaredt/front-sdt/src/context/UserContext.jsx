// src/context/UserContext.jsx

import { createContext, useState, useEffect, useCallback, useContext } from "react";
// 💡 IMPORTANTE: Asegúrate de importar axiosPrivateUsers o la instancia que necesites.
import { setupInterceptors, axiosPrivateUsers } from "../API/api.js"; 
import React from "react";

const AppContext = createContext();

// Función auxiliar para obtener la data del usuario
const fetchUserData = async (setInitialLoading, setUser, handleLogout) => {
    try {
        // Asumiendo que /user/me devuelve la información del usuario logueado
        const response = await axiosPrivateUsers.get('/me'); 
        setUser(response.data.user); // Asume que la data del usuario está en response.data.user
    } catch (error) {
        console.error("No se pudo obtener la información del usuario. La sesión expiró.", error);
        // Si falla (y el interceptor no pudo refrescar el token), cerramos sesión
        handleLogout();
    } finally {
        // La carga inicial termina, ya sea con éxito o con fallo.
        setInitialLoading(false);
    }
};


const UserProvider = ({ children }) => {
    // Inicialización del estado
    const [token, setToken] = useState(() => localStorage.getItem('accessToken'));
    const [user, setUser] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
    }, []); // Nota: setUser y setToken son estables, se pueden quitar de las dependencias si lo deseas.
    
    // ----------------------------------------------------------------------
    // 1. Efecto para configurar los interceptores de Axios
    // ----------------------------------------------------------------------
    useEffect(() => {
        setupInterceptors(setToken, handleLogout); 
    }, [setToken, handleLogout]);

    // ----------------------------------------------------------------------
    // 2. Efecto para cargar la data del usuario
    // ----------------------------------------------------------------------
    useEffect(() => {
        if (token) {
            // Si tenemos un token, intentamos cargar la data
            fetchUserData(setInitialLoading, setUser, handleLogout);
        } else {
            // Si no hay token, la carga inicial termina inmediatamente
            setInitialLoading(false);
        }
        // Nota: Agregamos las funciones como dependencias para satisfacer el linter, aunque handleLogout es useCallback.
    }, [token, handleLogout, setUser, setInitialLoading]);


    // Lógica para determinar si el usuario está autenticado
    const isAuthenticated = !!user && !!token;
    const loading = initialLoading; 

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                setAppointmentDetails,
                appointmentDetails,
                handleLogout,
                isAuthenticated, 
                loading
            }}
        >
            {/* Solo renderiza los hijos una vez que la carga inicial terminó */}
            {loading ? <p className="text-center p-8 text-xl">Cargando sesión...</p> : children} 
        </AppContext.Provider>
    );
};

// Custom Hook y Exportaciones
export const useUser = () => {
    return useContext(AppContext);
};

export { UserProvider, AppContext };