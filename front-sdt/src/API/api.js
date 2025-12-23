import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instancias base
export const axiosPublic = axios.create({ baseURL: BASE_URL });
export const axiosAuth = axios.create({ baseURL: BASE_URL, withCredentials: true });
export const axiosPrivate = axios.create({ baseURL: BASE_URL, withCredentials: true });

// Variables para control de refresco múltiple
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export const setupInterceptors = (getAccessToken, setAccessToken, onLogout) => {
  
  // --- INTERCEPTOR DE PETICIÓN ---
  axiosPrivate.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // --- INTERCEPTOR DE RESPUESTA (CLASE MUNDIAL) ---
  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Si no es un error 401 o la petición ya fue reintentada, terminamos
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Si ya estamos refrescando el token, encolamos esta petición
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return axiosPrivate(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          console.log("🔄 SDT Security: Renovando acceso...");
          const newAccessToken = await refreshAccessToken();
          
          setAccessToken(newAccessToken);
          axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
          processQueue(null, newAccessToken);
          resolve(axiosPrivate(originalRequest));
        } catch (refreshError) {
          processQueue(refreshError, null);
          console.error("❌ Sesión expirada. Redirigiendo...");
          if (onLogout) onLogout();
          // Solo redirigir si no estamos ya en el login para evitar bucles
          if (!window.location.pathname.includes('/login')) {
            window.location.href = "/login?session=expired";
          }
          reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      });
    }
  );
};