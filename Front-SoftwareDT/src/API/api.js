import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess'; 

/**
 * 🛰️ SOFTWARE DT - CENTRAL DATA LINK (Nivel S+)
 * Configuración de túneles Axios para comunicación con Railway.
 */
const BASE_URL = 'https://back-softwaredt-production.up.railway.app/api';

/**
 * 🛠️ SANITIZACIÓN ATÓMICA DE TOKENS
 * Evita que caracteres residuales rompan el handshake con el backend.
 */
const sanitizeToken = (rawToken) => {
    if (!rawToken || rawToken === "null" || rawToken === "undefined") return null;
    return typeof rawToken === 'string' 
        ? rawToken.replace(/['"]+/g, '').replace(/Bearer\s+/i, '').trim() 
        : rawToken; 
};

// 1. Instancia Pública (Registro, Catálogo de Productos inicial)
export const axiosPublic = axios.create({ 
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

// 2. Instancia de Autenticación (Específica para Handshake de Login)
export const axiosAuth = axios.create({ 
    baseURL: BASE_URL, 
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

// 3. Instancia Privada (Nodos de Datos Protegidos - Usar para Citas y Mensajería)
export const axiosPrivate = axios.create({ 
    baseURL: BASE_URL, 
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

/**
 * 🔄 GESTIÓN DE COLA DE REINTENTOS (TOKEN REFRESH)
 */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

/**
 * 🛡️ SETUP DE INTERCEPTORES - INDUSTRIAL GRADE
 * Mantiene la persistencia de sesión sincronizada con el estado global de React.
 */
export const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
    
    // INTERCEPTOR DE PETICIÓN (Inyectar Token Bearer)
    axiosPrivate.interceptors.request.use(
        (config) => {
            // Prioridad: Estado en memoria (UserContext) -> Persistencia (LocalStorage)
            const currentToken = getAccessToken() || localStorage.getItem('token');
            const cleanToken = sanitizeToken(currentToken);

            if (cleanToken) {
                config.headers.Authorization = `Bearer ${cleanToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // INTERCEPTOR DE RESPUESTA (Manejo de 401 y Refresco Automático)
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Si el token expiró (401) y no es una ruta de auth crítica
            if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/login')) {
                
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
                    // Handshake con el endpoint de refresh
                    const newAccessToken = await refreshAccessToken();
                    const cleanNewToken = sanitizeToken(newAccessToken);
                    
                    if (!cleanNewToken) throw new Error("SDT_REFRESH_EXPIRED");

                    // Sincronización de Datacenters (Global + Local)
                    setAccessToken(cleanNewToken);
                    localStorage.setItem('token', cleanNewToken);
                    
                    processQueue(null, cleanNewToken);
                    
                    // Reintentar petición original con el nuevo token
                    originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;
                    return axiosPrivate(originalRequest);
                    
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    // Si el refresh falla, el arquitecto debe re-autenticarse
                    if (onLogout) onLogout(); 
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        }
    );
};

export default axiosPrivate;