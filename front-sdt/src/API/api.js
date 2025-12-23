import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instancias base
export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL, withCredentials: true });
export const axiosPrivate = axios.create({ baseURL: BASE_URL, withCredentials: true });

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

export const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
    
    // --- INTERCEPTOR DE PETICIÓN (Limpieza de JWT) ---
    axiosPrivate.interceptors.request.use(
        (config) => {
            let token = getAccessToken();

            // SANEAMIENTO DE TOKEN: Eliminamos comillas y validamos que no sea basura
            if (token) {
                token = token.replace(/"/g, "").trim(); // Elimina comillas de JSON.stringify()
            }

            if (token && token !== "undefined" && token !== "null" && token !== "") {
                // Si el token ya trae "Bearer ", no lo duplicamos
                config.headers.Authorization = token.startsWith("Bearer ") 
                    ? token 
                    : `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // --- INTERCEPTOR DE RESPUESTA ---
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // 1. Manejo de Errores Críticos (403 o JWT mal formado)
            if (error.response?.status === 403) {
                console.error("DEBUG [SDT]: Credenciales Corruptas o Prohibidas.");
                if (onLogout) onLogout();
                // No intentamos refrescar si es 403, porque es un error de integridad
                return Promise.reject(error);
            }

            // 2. Manejo de Expiración (401 Unauthorized)
            if (error.response?.status === 401 && !originalRequest._retry) {
                
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return axiosPrivate.request(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(async (resolve, reject) => {
                    try {
                        console.log("🔄 SDT Security: Token expirado. Renovando...");
                        const newAccessToken = await refreshAccessToken();
                        
                        if (!newAccessToken) throw new Error("Refresh token falló");

                        // Limpiamos el nuevo token también
                        const cleanNewToken = newAccessToken.replace(/"/g, "").trim();
                        setAccessToken(cleanNewToken);
                        
                        axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${cleanNewToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${cleanNewToken}`;
                        
                        processQueue(null, cleanNewToken);
                        resolve(axiosPrivate.request(originalRequest));
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        console.error("❌ Sesión expirada permanentemente.");
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