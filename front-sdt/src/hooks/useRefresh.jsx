import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  // Extraemos setToken y setUser para limpiar la sesión completa si el refresco falla
  const { setToken, setUser } = useContext(UserContext);


      return cleanToken;

    } catch (error) {

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');

      throw error; 
    }
  };

  return refresh;
};

export default useRefresh;