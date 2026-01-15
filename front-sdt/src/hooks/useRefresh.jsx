import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  // Extraemos setToken y setUser para limpiar la sesión completa si el refresco falla
  const { setToken, setUser } = useContext(UserContext);

  const refresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      
      // 1. Validación de seguridad: Si no hay token nuevo, lanzamos error
      if (!newAccessToken) {
        throw new Error("No se recibió un nuevo token de acceso");
nst cleanToken = newAccessToken.replace(/['"]+/g, '').replace(/Bearer\s+/i, '').trim();



      return cleanToken;

    } catch (error) {
      console.error("Fallo crítico en el refresco de sesión:", error.message);
      
      // 5. Limpieza total de seguridad en Software DT
      // Si el refresh falla, el usuario debe ser tratado como deslogueado
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');

      throw error; 
    }
  };

  return refresh;
};

export default useRefresh;