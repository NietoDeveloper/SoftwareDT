import { axiosAuth } from "../API/api";

/**
 * Función para solicitar un nuevo Access Token usando el Refresh Token (en cookies).
 * Esta función debe ser PURE (no debe usar setters de React ni hooks).
 * @returns {Promise<string>} El nuevo Access Token.
 * @throws {Error} Si el refresh token es inválido o ha expirado.
 */
const refreshAccessToken = async () => {
    try {
        const response = await axiosAuth.get('/user/refresh'); 
        
        const { accessToken } = response.data;
        
        // 🔑 El interceptor de Axios en api.js se encargará de llamar a setToken(accessToken) 
        // y de reintentar la solicitud original.
        return accessToken;
        
    } catch (error) {
        // Registramos el error de manera informativa
        console.error("Error al refrescar el token de acceso. Sesión no renovada.", error);
        
        // Relanzamos el error. El interceptor de Axios lo capturará 
        // y usará la función handleLogout que le pasamos desde el Contexto.
        throw error;
    }
};

export default refreshAccessToken;