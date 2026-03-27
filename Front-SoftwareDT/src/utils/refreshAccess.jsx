import axios from 'axios';

/**
 * 🛰️ SERVICIO DE REFRESCO DE TOKEN - CORE AUTH DT (Nivel S+)
 * Objetivo: Regenerar el Access Token usando la HttpOnly Cookie en Railway.
 */

const API_URL = 'https://back-softwaredt-production.up.railway.app/api';

const refreshAccessToken = async () => {
  try {
    // 1. Verificación de Integridad de Sesión en el Nodo Local
    const rawToken = localStorage.getItem('token'); 
    
    if (!rawToken || rawToken === "null" || rawToken === "undefined") {
      throw new Error('Protocolo SDT: No se detectó token previo para sincronización.');
    }

    // Sanitización preventiva: Eliminamos ruido de strings (comillas de JSON.stringify)
    const cleanCurrentToken = String(rawToken).replace(/['"]+/g, '').trim();

    /**
     * 2. Ejecución del Handshake con el Datacenter
     * Endpoint: /user/refresh (Sincronizado con userRoutes/userRefresh.js)
     * withCredentials: true es CRÍTICO para enviar la cookie 'jwt' de Railway.
     */
    const response = await axios.post(`${API_URL}/user/refresh`, null, {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-sdt-refresh-request': 'true',
        'Authorization': `Bearer ${cleanCurrentToken}`
      }
    });

    // 3. Extracción y Validación de Payload (Mapeo Flexible)
    const res = response.data;
    
    // El backend puede devolverlo como 'token', 'accessToken' o dentro de un objeto 'data'
    const newAccessToken = res.token || 
                           res.accessToken || 
                           res.data?.token || 
                           res.data?.accessToken;

    if (!newAccessToken) {
      console.error("🚨 SDT_AUTH_CRITICAL: El Datacenter no emitió un nuevo ticket de acceso.", res);
      throw new Error('Datacenter Error: Payload de acceso vacío o corrupto.');
    }

    // 4. Persistencia Industrial y Limpieza
    const cleanToken = String(newAccessToken).replace(/['"]+/g, '').trim();
    
    // Actualizamos el almacenamiento local para futuras peticiones de axiosPrivate
    localStorage.setItem('token', cleanToken);
    
    console.log("✅ [SDT_AUTH]: Handshake exitoso. Nodo de acceso regenerado.");
    return cleanToken;

  } catch (error) {
    const status = error.response?.status;
    const msg = error.response?.data?.message || error.message;
    
    console.error(`🚨 [SDT_AUTH_FAILURE] Status: ${status} | Motivo: ${msg}`);
    
    // 5. Gestión de Seguridad en Fallo Crítico
    // Si el refresh token expiró (401/403), limpiamos el nodo para forzar re-login
    if ([401, 403].includes(status)) {
      console.warn("⚠️ [SDT_SECURITY]: Sesión revocada por el Datacenter. Limpiando credenciales.");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Emitimos evento personalizado para que App.jsx o UserContext reaccionen si es necesario
      window.dispatchEvent(new Event('sdt_auth_expired'));
    }
    
    throw error;
  }
};

export default refreshAccessToken;