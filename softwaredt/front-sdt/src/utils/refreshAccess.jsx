import { axiosAuth } from "../API/api";

/**
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