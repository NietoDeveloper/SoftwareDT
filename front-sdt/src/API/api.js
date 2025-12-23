import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

// Ajuste para Vercel: Prioriza la variable de entorno de producción
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
    
    // --- INTERCEPTOR DE PETICIÓN (Inyección Blindada) ---
    axiosPrivate.interceptors.request.use(
        (config) => {
            const token = getAccessToken();

            if (token) {
                // SANEAMIENTO PROFUNDO para evitar el error "jwt malformed" que vimos en tus logs
                const cleanToken = String(token)
                    .replace(/['"]+/g, '')
                    .replace(/Bearer\s+/i, '')
                    .trim();

                if (cleanToken && cleanToken !== "null" && cleanToken !== "undefined") {
                    config.headers.Authorization = `Bearer ${cleanToken}`;
                }
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

            // 1. Manejo de Errores Críticos (403 Forbidden / Malformed)
            if (error.response?.status === 403) {
                console.error("DEBUG [SDT]: Error Crítico 403 - Token Malformado o Prohibido.");
                if (onLogout) onLogout();
                return Promise.reject(error);
            }

            // 2. Manejo de Expiración (401 Unauthorized)
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
                        
                        if (!newAccessToken) throw new Error("No se recibió nuevo token");

                        const cleanNewToken = String(newAccessToken)
                            .replace(/['"]+/g, '')
                            .replace(/Bearer\s+/i, '')
                            .trim();
                        
                        setAccessToken(cleanNewToken);
                        
                        originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;
                        processQueue(null, cleanNewToken);
                        resolve(axiosPrivate(originalRequest));
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        console.error("❌ SDT Security: Fallo crítico de renovación.");
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