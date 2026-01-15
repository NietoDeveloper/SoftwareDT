import { createContext, useState, useEffect, useCallback, useRef, useMemo, useContext } from "react";
import { setupInterceptors } from "../API/api.js";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // 1. Estado de Usuario con inicialización segura
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (!savedUser || savedUser === "undefined" || savedUser === "null") return null;
            return JSON.parse(savedUser);
        } catch (e) {
            return null;
        }
    });



    const [loading, setLoading] = useState(true);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const tokenRef = useRef(token);

    // Sincronizar Referencia para Interceptores
    useEffect(() => {
        tokenRef.current = token;
