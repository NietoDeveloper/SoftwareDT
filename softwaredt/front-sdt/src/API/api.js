import axios from 'axios';
// CORRECCIÓN DE RUTA: Asumo que el nombre del archivo es 'refreshAccess.js'
import refreshAccessToken from '../utils/refreshAccess.js'; 

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

// La función ahora acepta 'handleLogout', esencial para cerrar sesión si el refresh falla.
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

                // Si es un 401 (no autorizado) y no hemos intentado refrescar antes
                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Intentamos obtener un nuevo token y pasamos handleLogout
                        const accessToken = await refreshAccessToken(setToken, handleLogout); 
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        // Reintentamos la petición original con el nuevo token
                        return axiosPrivateInstance(originalRequest);
                    } catch (refreshError) {
                        // Si el refresh falla, la función 'refreshAccessToken' llama a handleLogout,
                        // y el error es rechazado.
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