import { axiosAuth } from "../API/api";

const refreshAccessToken = async (setToken, handleLogout) => {
    try {
        // Usamos axiosAuth para enviar la cookie 'jwt'.
        // La ruta completa debe ser '/user/refresh' o '/doctor/refresh' 
        // ya que la baseURL de axiosAuth es 'http://localhost:5000/api'.
        // Asumo que esta es la ruta de usuario.
        const response = await axiosAuth.get('/user/refresh'); 
        
        const { accessToken } = response.data;
        
        setToken(prev => { 
            console.log(JSON.stringify(prev));
            return { ...prev, accessToken };
        });
        
        return accessToken;
        
    } catch (error) {
        console.error("Error refreshing access token: Session expired or invalid refresh token.", error);
        
        // Si la función de logout fue proporcionada y el error es 401, 
        // forzamos el cierre de sesión para detener el bucle.
        if (handleLogout && error.response && error.response.status === 401) {
            handleLogout();
        }
        
        throw error;
    }
};

export default refreshAccessToken;