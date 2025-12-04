import axios from 'axios';
import { eventNames } from 'process';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'; 

const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('Error de autenticación detectado. Token expirado o no autorizado.');
      
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;

console.log => () eventClick