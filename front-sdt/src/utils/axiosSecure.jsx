import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'; 

const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

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