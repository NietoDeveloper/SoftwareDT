import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


let isRefreshing = false;
let failedQueue = [];





export const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
    
    // 1. INTERCEPTOR DE PETICIÓN
    axiosPrivate.interceptors.request.use(
        (config) => {
            // Intentamos obtener el token del estado de React, si no, del disco duro
            let token = getAccessToken() || localStorage.getItem('token');
            const cleanToken = getCleanToken(token);

            if (cleanToken) {
                config.headers.Authorization = `Bearer ${cleanToken}`;
            } else {
                // Si no hay token en absoluto, no dejamos que la petición salga "sucia"
                // Esto evita que el backend responda 401 y el interceptor de respuesta dispare el logout
                console.warn("⚠️ SDT: Intento de petición privada sin token.");
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 2. INTERCEPTOR DE RESPUESTA
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Error 403: Prohibido o Malformado (No intentamos refrescar)
            if (error.response?.status === 403) {
                console.error("❌ SDT: Error 403 Crítico.");
                if (onLogout) onLogout();
                return Promise.reject(error);
            }

            // Error 401: Expirado (Iniciamos flujo de refresh)
            if (error.response?.status === 401 && !originalRequest._retry) {
                
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosPrivate(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(async (resolve, reject) => {
                    try {
                        console.log("🔄 SDT Security: Renovando acceso...");
                        const newAccessToken = await refreshAccessToken();
                        
                        const cleanNewToken = getCleanToken(newAccessToken);
                        
                        if (!cleanNewToken) throw new Error("Refresh fallido");

                        setAccessToken(cleanNewToken); // Actualiza Contexto
                        localStorage.setItem('token', cleanNewToken); // Actualiza Disco
                        
                        originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;
                        processQueue(null, cleanNewToken);
                        resolve(axiosPrivate(originalRequest));
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        console.error("🚨 SDT: Sesión caducada definitivamente.");
                        if (onLogout) onLogout();
                        reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                });
            }

            return Promise.reject(error);
        }
    );
};