import { axiosAuth } from "../API/api";

/**
 * Función para solicitar un nuevo Access Token usando el Refresh Token (en cookies).
 * Esta función debe ser PURE (no debe usar setters de React ni hooks).
 * @returns {Promise<string>} El nuevo Access Token.
 * @throws {Error} 
 */
const refreshAccessToken = async () => {
    try {
        const response = await axiosAuth.get('/user/refresh'); 
        
        const { accessToken } = response.data;

        return accessToken;
        
    } catch (error) {
        console.error("Error al refrescar el token de acceso. Sesión no renovada.", error);
        
        throw error;
    }
};

export default refreshAccessToken;