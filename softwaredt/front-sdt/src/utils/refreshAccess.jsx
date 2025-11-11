import { axiosAuth } from "../API/api.js";

const refreshAccessToken = async (setToken, handleLogout) => {
    try {
        // Usamos axiosAuth para enviar la cookie 'jwt' y obtener un nuevo token.
        const response = await axiosAuth.get('/user/refresh'); 
        
        const { accessToken } = response.data;
        
        // CORRECCIÓN CLAVE: setToken espera solo el valor del token (string), no un callback de estado de objeto.
        setToken(accessToken);
        
        // También guardamos en localStorage, ya que UserProvider lo necesita para la carga inicial.
        localStorage.setItem('accessToken', accessToken);
        
        return accessToken;
        
    } catch (error) {
        console.error("Error refreshing access token: Session expired or invalid refresh token.", error);
        
        // Forzamos el cierre de sesión si el token de refresco falla con 401.
        if (handleLogout && error.response && error.response.status === 401) {
            handleLogout();
        }
        
        // Re-lanza el error para que el interceptor sepa que falló y detenga la petición original.
        throw error;
    }
};

// Se mantiene la exportación por defecto
export default refreshAccessToken;