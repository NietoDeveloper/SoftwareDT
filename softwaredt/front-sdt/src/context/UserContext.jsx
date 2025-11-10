import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { setupInterceptors } from "../API/api.js"; // ⬅️ RUTA CORREGIDA
import React from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
    }, [setToken, setUser]);

    useEffect(() => {
        // Asegura que los interceptores se configuren al iniciar
        setupInterceptors(setToken, handleLogout); 
    }, [setToken, handleLogout]);

    // Lógica para determinar si el usuario está autenticado o si la carga inicial está pendiente
    const isAuthenticated = !!user && !!token;
    // Define tu lógica de carga inicial aquí. 
    const loading = token === null && localStorage.getItem('accessToken') !== null; 

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
            {children}
        </AppContext.Provider>
    );
};

// Custom Hook: ESTO ES LO QUE PERMITE IMPORTAR { useUser }
export const useUser = () => {
    return useContext(AppContext);
};

// Exportamos todo lo necesario.
export { UserProvider, AppContext, useUser };