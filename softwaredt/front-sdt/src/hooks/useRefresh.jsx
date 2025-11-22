import { useContext } from "react";
import { AppContext } from "../context/UserContext";
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  const { setToken } = useContext(AppContext);

  const refresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      setToken(newAccessToken);

      return newAccessToken;

    } catch (error) {
      console.error("Error al refrescar token:", error);
      throw error; 
    }
  };

  return refresh;
};

export default useRefresh;