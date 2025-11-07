import { createContext, useState, useEffect, useCallback } from "react";
// Eliminamos: import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../API/api";
import React from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
    // Eliminamos: const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    // 1. handleLogout ahora solo limpia el estado. 
    // Usamos useCallback para que sea estable y no se recree en cada render.
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        // También limpia el token de acceso del almacenamiento local.
        localStorage.removeItem('accessToken'); 
        // ❌ ELIMINAMOS: navigate("/login");
    }, [setToken, setUser]); // Depende solo de las funciones set

    // 2. El interceptor se configura con la función de logout estable.
    // La dependencia 'handleLogout' ahora es estable gracias a useCallback.
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
                handleLogout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export { UserProvider, AppContext };