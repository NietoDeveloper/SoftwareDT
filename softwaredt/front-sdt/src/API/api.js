import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

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

// ----------------------------------------------------------------------
// 3. CONFIGURACIÓN DEL INTERCEPTOR (Añade Token y Maneja 401)
// ... (Toda esta lógica se mantiene igual)
// ----------------------------------------------------------------------

const setupInterceptors = (setToken) => {
    // ... (Tu lógica de interceptores request y response va aquí)
    const interceptor = axiosPrivateInstance => {
        
        // INTERCEPTOR DE PETICIÓN (Añade Access Token)
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

        // INTERCEPTOR DE RESPUESTA (Maneja el 401 y Refresh)
        axiosPrivateInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const { config, response: { status } } = error;
                const originalRequest = config;

                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const accessToken = await refreshAccessToken(setToken);
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return axiosPrivateInstance(originalRequest);
                    } catch (refreshError) {
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

// ----------------------------------------------------------------------
// EXPORTACIÓN ÚNICA (Correcta)
// ----------------------------------------------------------------------

export { 
    axiosAuth, 
    axiosPrivateUsers, 
    axiosPrivateDoctor, // Exportación única de las variables definidas arriba
    setupInterceptors 
};