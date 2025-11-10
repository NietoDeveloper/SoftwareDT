import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccessToken.js'; // ⬅️ Asumo que el nombre es 'refreshAccessToken.js'

const BASE_URL = 'http://localhost:5000/api';

const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const axiosPrivateUsers = axios.create({
    baseURL: `${BASE_URL}/user`,
});

const axiosPrivateDoctor = axios.create({
    baseURL: `${BASE_URL}/doctor`,
});

// 1. CORRECCIÓN: La función ahora acepta 'handleLogout'.
const setupInterceptors = (setToken, handleLogout) => {

    const interceptor = axiosPrivateInstance => {
        
        axiosPrivateInstance.interceptors.request.use(
            config => {
                const token = localStorage.getItem('accessToken'); 
                if (token && !config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        axiosPrivateInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const { config, response: { status } } = error;
                const originalRequest = config;

                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // 2. CORRECCIÓN: Pasamos 'handleLogout' a la función de refresh.
                        const accessToken = await refreshAccessToken(setToken, handleLogout); 
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return axiosPrivateInstance(originalRequest);
                    } catch (refreshError) {
                        // Si el refresh falla, el error es rechazado y 'handleLogout' 
                        // debe ser llamado dentro de 'refreshAccessToken'
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    };

    interceptor(axiosPrivateUsers);
    interceptor(axiosPrivateDoctor);
};

export { 
    axiosAuth, 
    axiosPrivateUsers, 
    axiosPrivateDoctor,
    setupInterceptors 
};