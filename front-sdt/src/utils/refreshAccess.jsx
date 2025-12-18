import axios from 'axios';

// Usamos la variable de entorno para evitar errores en producción
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const refreshAccessToken = async () => {
  try {
    // Intentamos obtener el token del localStorage
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No se encontró el refresh token en el almacenamiento local.');
    }

    // Petición al endpoint de refresco
    const response = await axios.post(`${API_URL}/auth/refresh`, { 
      refreshToken 
    }, {
      withCredentials: true // Necesario si el backend usa cookies además del body
    });

    const { accessToken } = response.data;

    // Actualizamos el nuevo access token en el almacenamiento local
    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (error) {
    console.error('❌ Error crítico al refrescar el token:', error.message);
    
    // Si falla el refresco, limpiamos todo para forzar nuevo login
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    throw error;
  }
};

export default refreshAccessToken;