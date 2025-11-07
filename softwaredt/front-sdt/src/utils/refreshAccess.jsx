import { axiosusers } from "../API/api";

const refreshAccessToken = async (setToken, handleLogout) => {
  try {
    const response = await axiosusers.get('/refresh');
    const { accessToken } = response.data;
    setToken(prev => { 
      console.log(JSON.stringify(prev));
      return { ...prev, accessToken };
    });
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token: Session expired or invalid refresh token.", error);
    
    // Si la función de logout fue proporcionada y el error es de no autorizado (401),
    // forzamos el cierre de sesión para detener el bucle.
    if (handleLogout && error.response && error.response.status === 401) {
      handleLogout();
    }
    
    throw error;
  }
};

export default refreshAccessToken;