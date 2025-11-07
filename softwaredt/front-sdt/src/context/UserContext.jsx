import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../API/api";
import React from "react";

const AppContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

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