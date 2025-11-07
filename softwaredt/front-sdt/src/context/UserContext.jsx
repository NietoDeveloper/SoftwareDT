import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Necesitas esto para redirigir
import { setupInterceptors } from "../API/api";
// eslint-disable-next-line no-unused-vars
import React from "react";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const navigate = useNavigate(); // 👈 Hook para la navegación
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // 🔑 FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = () => {
    // 1. Limpia el estado
    setToken(null);
    setUser(null);
    // 2. Redirige al usuario al login
    navigate("/login");
    // NOTA: Tu backend DEBE tener una ruta de /logout que limpie la cookie de refreshToken.
    // Si tienes esa ruta, deberías llamarla aquí con axiosusers.post('/logout').
  };

  // 🔑 INICIALIZACIÓN DEL INTERCEPTOR CON LOGOUT
  useEffect(() => {
    // Ahora pasamos setToken Y handleLogout al interceptor
    setupInterceptors(setToken, handleLogout);
  }, [setToken, handleLogout]); // Dependencias para evitar errores de linting/hooks

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
