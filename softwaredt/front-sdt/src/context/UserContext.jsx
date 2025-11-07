import { createContext, useState, useEffect, useCallback } from "react";
// ELIMINADO: import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../API/api";
import React from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
    // ELIMINADO: const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    // handleLogout ahora solo limpia el estado. 
    // Lo hacemos estable con useCallback para que useEffect no se ejecute innecesariamente.
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken'); // Limpia también el token de acceso
        // ELIMINADO: navigate("/login"); 
    }, [setToken, setUser]);

    // El interceptor usa la función de logout simple.
    useEffect(() => {
        setupInterceptors(setToken, handleLogout);
    }, [setToken, handleLogout]);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                setAppointmentDetails,
                appointmentDetails,
                handleLogout, // La función ahora solo limpia el estado
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { UserProvider, AppContext };