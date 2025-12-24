import axios from 'axios';

// Asegúrate de que la URL coincida con tu backend (v1 o directo a api)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; 

const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

axiosSecure.interceptors.request.use(
  (config) => {
    // CORRECCIÓN: Usar la misma llave que en Signup.jsx ('token')
    const token = localStorage.getItem('token'); 

    if (token) {
      // Limpiamos comillas por si acaso se guardaron por error
      const cleanToken = token.replace(/['"]+/g, '');
      config.headers.Authorization = `Bearer ${cleanToken}`;
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
    // Si el servidor dice que el token no sirve (401 o 403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn('Sesión inválida o expirada. Limpiando credenciales...');
      
      // Limpieza profunda para Software DT
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      // Opcional: Podrías forzar un reload o usar un evento para avisar al Context
      // window.location.href = '/login'; 
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;