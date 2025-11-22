import { useContext } from "react";
import { AppContext } from "../context/UserContext";
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  const { setToken } = useContext(AppContext);

  const refresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();

      // 2. Nosotros actualizamos el estado de React AQUÍ
      // (Ajusta esto si tu estado es un objeto, ej: setAuth({ ...auth, accessToken: newAccessToken }))
      setToken(newAccessToken);

      // 3. Retornamos el token por si quien llama al hook lo necesita inmediatamente
      return newAccessToken;

    } catch (error) {
      console.error("Error al refrescar token:", error);
      // Opcional: Si falla el refresh, podrías limpiar el estado aquí
      // setToken(null);
      throw error; 
    }
  };

  return refresh;
};

export default useRefresh;