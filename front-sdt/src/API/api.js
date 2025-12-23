import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instancias base
export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL, withCredentials: true });
export const axiosPrivate = axios.create({ baseURL: BASE_URL, withCredentials: true });

// Control de flujo para refresco de tokens
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
            // Aseguramos que el token sea un string válido antes de inyectarlo
            if (token && token !== "undefined" && token !== "null") {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // --- INTERCEPTOR DE RESPUESTA (Estrategia de Reintento de SoftwareDT) ---
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // 1. Manejo de Errores Críticos (403 Forbidden / Malformed)
            // Si el backend dice 403, el token no sirve para nada, forzamos logout.
            if (error.response?.status === 403) {
                console.error("DEBUG [SDT]: Acceso Prohibido o Token Malformado.");
                if (onLogout) onLogout();
                return Promise.reject(error);
            }

            // 2. Manejo de Expiración (401 Unauthorized)
            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            // Gestión de cola si ya hay un proceso de refresco en curso
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
                    console.log("🔄 SDT Security: Renovando acceso en el Datacenter...");
                    const newAccessToken = await refreshAccessToken();
                    
                    if (!newAccessToken) throw new Error("No se pudo obtener nuevo token");

                    setAccessToken(newAccessToken);
                    
                    // Actualizar headers para la petición actual y futuras
                    axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    processQueue(null, newAccessToken);
                    resolve(axiosPrivate.request(originalRequest));
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    console.error("❌ Sesión expirada permanentemente.");
                    
                    if (onLogout) onLogout();

                    if (!window.location.pathname.includes('/login')) {
                        window.location.href = "/login?session=expired";
                    }
                    reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            });
        }
    );
};