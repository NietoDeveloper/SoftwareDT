import { axiosAuth } from "../API/api.js"; // ⬅️ RUTA CORREGIDA

const refreshAccessToken = async (setToken, handleLogout) => {
    try {
        // Usamos axiosAuth para enviar la cookie 'jwt'.
        const response = await axiosAuth.get('/user/refresh'); 
        
        const { accessToken } = response.data;
        
        // Almacenar el nuevo token
        setToken(prev => { 
            console.log(JSON.stringify(prev));
            return { ...prev, accessToken };
        });
        
        return accessToken;
        
    } catch (error) {
        console.error("Error refreshing access token: Session expired or invalid refresh token.", error);
        
        // Forzamos el cierre de sesión si el token de refresco falla
        if (handleLogout && error.response && error.response.status === 401) {
            handleLogout();
        }
        
        throw error;
    }
};

export default refreshAccessToken;