import axios from 'axios';
import refreshAccessToken from './refreshAccess'; 

const BASE_URL = 'http://localhost:5000/api';

// 1. Instancia Pública (Para rutas abiertas)
const axiosPublic = axios.create({
    baseURL: BASE_URL,
});

// 2. Instancia Auth (Para Login/Logout/Refresh, maneja cookies)
const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// 3. Instancia Privada (Para rutas protegidas, usa interceptores)
const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});

// Variable para asegurar que el interceptor solo se configure una vez
let interceptorsConfigured = false;

const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
    // Evitar configurar los interceptores múltiples veces
    if (interceptorsConfigured) return;
    
    // --- Interceptor de Solicitud (Añadir el Access Token) ---
    axiosPrivate.interceptors.request.use(
        config => {
            const token = getAccessToken(); 

            if (token && !config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => Promise.reject(error)
    );
    
    // --- Interceptor de Respuesta (Manejar 401 y Refrescar Token) ---
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error.config;
            const status = error.response?.status;
            
            // 🛑 Condición de reintento: status 401 (Unauthorized) y no ha reintentado antes.
            if (status === 401 && !prevRequest._retry) {
                prevRequest._retry = true;

                try {
                    // Obtiene el nuevo Access Token
                    const newAccessToken = await refreshAccessToken();
                    
                    // 1. Almacena el nuevo token en el estado de React (Contexto)
                    setAccessToken(newAccessToken); 

                    // 2. Actualizar el encabezado y reenviar la solicitud fallida
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest); 

                } catch (refreshError) {
                    console.error("Token refresh failed, forcing logout:", refreshError);
                    
                    if (onLogout) {
                        onLogout(); 
                    }
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    interceptorsConfigured = true;
};

export { 
    axiosPublic,
    axiosAuth, 
    axiosPrivate,
    setupInterceptors 
};