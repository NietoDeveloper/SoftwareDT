import axios from 'axios';

// URL base alineada con tu backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Servicio de Refresco de Token - Core Auth DT
 */
const refreshAccessToken = async () => {
  try {
    // 1. Intentamos obtener el refreshToken (o el token actual si tu lógica es simple)
    const refreshToken = localStorage.getItem('token'); 
    
    if (!refreshToken) {
      throw new Error('No hay rastro de sesión en el almacenamiento local.');
    }

    // 2. AJUSTE CRÍTICO: El endpoint debe coincidir con tu index.js ( /api/user/refresh )
    // Usamos axios base para evitar bucles con axiosPrivate
    const response = await axios.post(`${API_URL}/user/refresh`, {}, {
      withCredentials: true, // VITAL para que viajen las cookies de HTTP-Only
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken.replace(/"/g, "")}`
      }
    });

    // 3. Capturamos la data según la estructura de tu Backend
    const data = response.data;
    const newAccessToken = data.token || data.accessToken;

    if (!newAccessToken) {
      throw new Error('El Datacenter no devolvió un token de acceso.');
    }

    // 4. Limpieza y guardado del nuevo token
    const cleanToken = String(newAccessToken).replace(/['"]+/g, '').trim();
    localStorage.setItem('token', cleanToken);
    
    return cleanToken;

  } catch (error) {
    // Log para NietoDeveloper
    console.error('🚨 [SDT_AUTH] Error en refresco:', error.response?.status, error.response?.data?.message);
    
    // Si falla el refresco, la sesión ya no es válida
    // No borramos todo el localStorage (para no perder el flujo de la cita), 
    // solo lo relacionado a la sesión.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    throw error;
  }
};

export default refreshAccessToken;