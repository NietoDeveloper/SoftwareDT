import { useContext } from "react";
// Verifica si tu contexto se llama UserContext o AppContext en el archivo original
import { UserContext } from "../context/UserContext"; 
import refreshAccessToken from "../utils/refreshAccess";

const useRefresh = () => {
  // Cambié AppContext por UserContext que es el nombre estándar que usaste en App.jsx
  const context = useContext(UserContext);

  // Verificación de seguridad para evitar errores de "undefined"
  if (!context) {
    console.error("useRefresh debe ser usado dentro de un UserProvider");
    return null;
  }

  const { setToken } = context;

  const refresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      
      if (newAccessToken) {
        setToken(newAccessToken);
        // Opcional: Guardar en localStorage si tu lógica de auth lo requiere
        // localStorage.setItem("token", newAccessToken);
      }

      return newAccessToken;

    } catch (error) {
      console.error("Error crítico al refrescar token:", error);
      // Aquí podrías redirigir al login si el refresh falla definitivamente
      throw error; 
    }
  };

  return refresh;
};

export default useRefresh;