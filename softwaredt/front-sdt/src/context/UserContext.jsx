import { createContext, useState, useEffect, useCallback, useContext } from "react";
// 🛑 IMPORTACIÓN CORREGIDA: Asumimos que los interceptores están en api.js
import { setupInterceptors, axiosAuth } from "../API/api.js";
import React from "react";

// Función auxiliar para usar el contexto más fácilmente
const AppContext = createContext();
export const useUser = () => useContext(AppContext);

// Asumimos que la respuesta del backend de autenticación devuelve el rol del usuario
const UserProvider = ({ children }) => {
    // Estado principal
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accessToken')); // Lee el token inicial de localStorage
    const [loading, setLoading] = useState(true); // Indica si el contexto está inicializando
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    // --- Funciones de Autenticación ---

    // 1. Cierre de sesión
    const handleLogout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        setLoading(false); // La sesión terminó, ya no está cargando
    }, []);

    // 2. Función para obtener datos del perfil (ejecutada después de obtener un token)
    const fetchUserData = useCallback(async (currentAccessToken) => {
        if (!currentAccessToken) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            // Ejemplo de endpoint para obtener el perfil del usuario autenticado
            const response = await axiosAuth.get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${currentAccessToken}`,
                },
            });

            // Asume que la respuesta contiene los datos del usuario (id, name, email, role)
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user data. Token might be invalid.", error);
            // Si falla la obtención de datos, forzamos un logout completo
            handleLogout();
        } finally {
            setLoading(false);
        }
    }, [handleLogout]);


    // --- Efectos y Configuración de Interceptores ---

    // 1. Configuración de Interceptores de Axios
    useEffect(() => {
        // Configuramos los interceptores: si el token expira, intentan refrescarlo con setToken y handleLogout
        setupInterceptors(setToken, handleLogout);
        // NOTA: setupInterceptors devuelve una función de limpieza, pero por simplicidad la omitimos aquí.
    }, [handleLogout]);


    // 2. Carga Inicial (Se ejecuta solo al montar el componente)
    useEffect(() => {
        // Carga el token guardado para iniciar la sesión
        const initialToken = localStorage.getItem('accessToken');
        if (initialToken) {
            setToken(initialToken);
            fetchUserData(initialToken);
        } else {
            // Si no hay token, la carga inicial ha terminado.
            setLoading(false);
        }
    }, [fetchUserData]);


    // 3. Efecto para obtener datos cuando el token cambia (ej. después de un login o refresh)
    useEffect(() => {
        if (token && !user) {
            // Si tenemos un token pero no el usuario, lo cargamos.
            fetchUserData(token);
            // Guardamos el token en localStorage cada vez que se actualiza.
            localStorage.setItem('accessToken', token);
        } else if (!token && !loading) {
             // Si el token es null (después de un logout o fallo de refresh), aseguramos el estado limpio
            setUser(null);
        }
        // Este efecto no debe re-ejecutarse si 'user' cambia, solo si 'token' cambia.
    }, [token, fetchUserData, loading]);


    const isAuthenticated = !!user && !!token;


    // --- Renderizado del Contexto ---
    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                isAuthenticated, // Nuevo
                loading, // Nuevo
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