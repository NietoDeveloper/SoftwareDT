import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

// Usamos la variable de entorno para flexibilidad entre Local y Vercel
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// Para Auth (Login/Register)
const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Para todas las peticiones protegidas (Dashboard, Booking, etc.)
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Crucial para que el Refresh Token (Cookie) viaje
});

let interceptorsConfigured = false;

const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
  if (interceptorsConfigured) return;

  // --- INTERCEPTOR DE PETICIÓN (Request) ---
  axiosPrivate.interceptors.request.use(
    async (config) => {
      let token = getAccessToken();
      
      // Si no hay token en memoria, intentamos recuperar uno antes de fallar
      if (!token) {
        try {
          token = await refreshAccessToken();
          setAccessToken(token);
        } catch (error) {
          // Si falla el refresh silencioso, el usuario debe loguearse
          return Promise.reject(error);
        }
      }

      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  // --- INTERCEPTOR DE RESPUESTA (Response) ---
  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
      const status = error.response?.status;

      // Si el servidor responde 401 y no hemos reintentado aún
      if (status === 401 && !prevRequest._retry) {
        prevRequest._retry = true;

        try {
          console.log("🔄 Token expirado detectado. Intentando refrescar...");
          const newAccessToken = await refreshAccessToken();
          
          setAccessToken(newAccessToken);
          
          // Actualizamos la cabecera y reintentamos la petición original
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
          
        } catch (refreshError) {
          console.error("❌ Refresco de token fallido. Cerrando sesión...");
          
          if (onLogout) {
            onLogout(); // Limpia UserContext
          }
          
          // Redirección forzada para limpiar la UI
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
      
      // Manejo de otros errores (ej. 403 Forbidden)
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