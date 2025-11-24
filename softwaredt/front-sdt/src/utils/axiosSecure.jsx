import axios from 'axios';

// 1. Define la URL base de tu backend.
// Utiliza la variable de entorno de Vite (VITE_API_URL).
// Si no está definida, usa un fallback (ej. http://localhost:5000/api/v1).
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'; 

// 2. Crea la instancia de Axios.
const axiosSecure = axios.create({
  baseURL: baseURL,
  // Habilita el envío de cookies a través de CORS si tu backend lo requiere.
  withCredentials: true, 
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); 
    
    // Si se encuentra el token, se añade al encabezado de Autorización como Bearer Token.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejar cualquier error durante la configuración de la solicitud.
    return Promise.reject(error);
  }
);

// 4. Interceptor de Respuesta (Response Interceptor)
// Este código se ejecuta cuando el servidor responde.
// Se usa principalmente para manejar errores de autenticación (401/403).
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica si el error es por falta de autorización (401) o prohibido (403).
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log('Error de autenticación detectado. Token expirado o no autorizado.');
      
      // Aquí puedes implementar la lógica de cierre de sesión forzado:
      // 1. Eliminar el token del almacenamiento local:
      // localStorage.removeItem('accessToken'); 
      
      // 2. Redirigir al usuario a la página de inicio de sesión:
      // window.location.href = '/login'; 
      
      // Opcionalmente, mostrar una notificación al usuario.
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;