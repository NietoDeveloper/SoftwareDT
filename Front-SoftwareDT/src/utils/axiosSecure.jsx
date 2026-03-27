import axios from 'axios';

/**
 * 🛰️ SOFTWARE DT - AXIOS SECURE CONFIG
 * S+ Tier Security | Railway Production Ready
 */

const baseURL = 'https://back-softwaredt-production.up.railway.app/api'; 

const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

axiosSecure.interceptors.request.use(
  (config) => {
    // 1. Recuperación con validación de tipo
    const rawToken = localStorage.getItem('token'); 

    // 2. Limpieza profunda: Evitamos enviar "null", "undefined" o tokens con ruido de comillas
    if (rawToken && rawToken !== "null" && rawToken !== "undefined") {
      const cleanToken = String(rawToken)
        .replace(/['"]+/g, '') // Elimina comillas accidentales
        .replace(/Bearer\s+/i, '') // Evita duplicar el esquema Bearer
        .trim();

      if (cleanToken !== "") {
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
    }
    
    // 3. Inyección del Header de Acceso Industrial (Requerido por Middleware SDT)
    config.headers['x-sdt-access'] = 'true';
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    /**
     * Gestión de Errores de Credenciales (401, 403, 400)
     * Si el Datacenter rechaza el acceso, limpiamos la sesión para forzar re-autenticación.
     */
    if ([400, 401, 403].includes(status)) {
      console.warn(`🚨 SDT Security [${status}]: Nodo de acceso rechazado.`);
      
      // Limpieza atómica de credenciales
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      /**
       * MANTENEMOS: sdt_pending_appointment y sdt_return_path
       * Esto permite que, tras el re-login, el usuario pueda retomar su flujo
       * de reserva sin perder los datos del servicio seleccionado.
       */
    }
    
    return Promise.reject(error);
  }
);

export default axiosSecure;