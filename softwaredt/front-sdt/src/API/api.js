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

const setupInterceptors = (setToken) => {

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

export { 
    axiosAuth, 
    axiosPrivateUsers, 
    axiosPrivateDoctor,
    setupInterceptors 
};