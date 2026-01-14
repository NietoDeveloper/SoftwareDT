import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

/**
 * SOFTWARE DT - DATACENTER API CONFIG
 * Centralización de instancias y seguridad de tokens.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

// Instancias de Axios
export const axiosPublic = axios.create({ baseURL: BASE_URL });

export const axiosAuth = axios.create({ 
    baseURL: BASE_URL, 
    withCredentials: true 
});

export const axiosPrivate = axios.create({ 
    baseURL: BASE_URL, 
    withCredentials: true 
});

// Lógica de Cola para Refresco de Token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

const getCleanToken = (rawToken) => {
    if (!rawToken) return null;
    const clean = String(rawToken)
        .replace(/['"]+/g, '')
        .replace(/Bearer\s+/i, '')
        .trim();
    return (clean !== "null" && clean !== "undefined" && clean !== "") ? clean : null;
};

/**
 * Configuración de Interceptores
 */
export const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
    
    // 1. Interceptor de Petición
    axiosPrivate.interceptors.request.use(
        (config) => {
            const token = getAccessToken() || localStorage.getItem('token');
            const cleanToken = getCleanToken(token);

            if (cleanToken) {
                config.headers.Authorization = `Bearer ${cleanToken}`;
            } else {
                console.warn("⚠️ SDT: Petición enviada sin token.");
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // 2. Interceptor de Respuesta (Manejo de 401)
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Si el error no tiene configuración original o no es 401, rechazar de inmediato
            if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

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

            try {
                console.log("🔄 SDT: Renovando sesión en el Datacenter...");
                const newAccessToken = await refreshAccessToken();
                const cleanNewToken = getCleanToken(newAccessToken);
                
                if (!cleanNewToken) throw new Error("Refresh fallido");

                // Actualizar storage y estado global
                setAccessToken(cleanNewToken);
                localStorage.setItem('token', cleanNewToken);
                
                originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;
                processQueue(null, cleanNewToken);
                
                return axiosPrivate(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                console.error("🚨 SDT: Sesión expirada permanentemente.");
                if (onLogout) onLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    );
};

export default axiosPrivate;