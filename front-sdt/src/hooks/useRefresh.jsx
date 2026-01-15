import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  // Extraemos setToken y setUser para limpiar la sesión completa si el refresco falla
  const { setToken, setUser } = useContext(UserContext);


s

export default useRefresh;