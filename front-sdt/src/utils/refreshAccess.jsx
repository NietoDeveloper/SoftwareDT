import axios from 'axios';

// Configuración de la URL base alineada con el entorno de Software DT
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Servicio de Refresco de Token - Core Auth DT
 * Se encarga de mantener la sesión activa sin interrumpir el flujo del cliente.
 */
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      // Si no hay token, no hay nada que refrescar. Redirigimos al flujo de login.
      throw new Error('Sesión inexistente o expirada.');
    }

    // Petición al endpoint de refresco de Software DT
    const response = await axios.post(`${API_URL}/auth/refresh-token`, { 
      token: refreshToken // Ajustado a 'token' si tu backend lo espera así
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (!accessToken) throw new Error('La respuesta del servidor no contiene un token válido.');

    // Persistencia de la nueva sesión
    localStorage.setItem('token', accessToken);
    
    // Si el backend rota los refresh tokens, lo actualizamos también
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    // Log técnico para NietoDeveloper (Consola)
    console.error(' [AUTH_SYSTEM] Fallo en la re-validación:', error.response?.data?.message || error.message);
    
    // Limpieza total para forzar re-autenticación en PrivateRoutes
    localStorage.clear(); 
    
    // Lanzamos el error para que el interceptor o el componente sepa que debe redirigir a /login
    throw error;
  }
};

export default refreshAccessToken;