import { useContext } from "react";
// Cambiado de AppContext a UserContext para mantener consistencia con el Header
import { UserContext } from "../context/UserContext"; 
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  // Asegúrate de que el Provider de UserContext exponga setToken
  const { setToken } = useContext(UserContext);

  const refresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      
      // Actualizamos el estado global. 
      // Esto disparará la reactividad en el Header (punto verde)
      setToken(newAccessToken);

      // También es buena práctica asegurar que persista en caso de recarga
      localStorage.setItem('token', newAccessToken);

      return newAccessToken;

    } catch (error) {
      console.error("Error al refrescar token:", error);
      // Si falla el refresco, es probable que la sesión haya expirado totalmente
      setToken(null);
      localStorage.removeItem('token');
      throw error; 
    }
  };

  return refresh;
};

export default useRefresh;