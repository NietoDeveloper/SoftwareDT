import { createContext, useState, useEffect, useCallback, useContext } from "react"; // ⬅️ AÑADIDO: useContext
import { setupInterceptors } from "../API/api";
import React from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
    // ... (Tu lógica de useState y useEffect sigue igual) ...
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
    }, [setToken, setUser]);

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
                // Puedes agregar aquí la propiedad 'isAuthenticated' para que funcione mejor
                isAuthenticated: !!user && !!token, // Añadiendo un chequeo de autenticación simple
                loading: token === undefined // Define tu lógica de 'loading'
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// ⬅️ SOLUCIÓN: Crear y exportar el hook useUser
export const useUser = () => {
    return useContext(AppContext);
};

// ⬅️ Exportamos el proveedor y el nuevo hook
export { UserProvider, AppContext };
// NOTA: Con la línea de arriba, useUser no se exporta automáticamente.
// Lo más limpio es:
// export { UserProvider, AppContext, useUser };