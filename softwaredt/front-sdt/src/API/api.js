import axios from 'axios';
import refreshAccessToken from './refreshAccess'; 

const BASE_URL = 'http://localhost:5000/api';

// 1. Instancia Pública (Para rutas abiertas)
const axiosPublic = axios.create({
    baseURL: BASE_URL,
});

const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});

let interceptorsConfigured = false;

const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
    if (interceptorsConfigured) return;
    
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
    
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error.config;
            const status = error.response?.status;
            
            if (status === 401 && !prevRequest._retry) {
                prevRequest._retry = true;

                try {
                    const newAccessToken = await refreshAccessToken();
                    
                    setAccessToken(newAccessToken); 

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