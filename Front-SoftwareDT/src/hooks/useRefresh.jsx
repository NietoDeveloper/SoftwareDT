import { useContext } from "react";
import { UserContext } from "../context/UserContext"; 
import refreshAccessToken from "../utils/refreshAccess";

/**
 * 🛰️ SOFTWARE DT - REFRESH SYNC HOOK
 * S+ Tier Security | Auth Resilience
 */
const useRefresh = () => {
    const { setToken, setUser } = useContext(UserContext);

    const refresh = async () => {
        try {
            // 1. Handshake con el Datacenter para renovación
            const newAccessToken = await refreshAccessToken();
            
            if (!newAccessToken || newAccessToken === "undefined" || newAccessToken === "null") {
                throw new Error("Handshake fallido: Datacenter no otorgó nuevo acceso.");
            }

            // 2. Protocolo de Limpieza Industrial (Software DT Standard)
            // Eliminamos comillas, prefijos 'Bearer' y espacios residuales
            const cleanToken = newAccessToken
                .toString()
                .replace(/['"]+/g, '')
                .replace(/Bearer\s+/i, '')
                .trim();

            if (!cleanToken || cleanToken.length < 20) {
                throw new Error("Security Breach: Token malformado o corrupto.");
            }

            // 3. Persistencia de Capa Física (LocalStorage)
            localStorage.setItem('token', cleanToken);

            // 4. Inyección de Reactividad Global (Context)
            setToken(cleanToken);

            console.log("✅ [SDT_AUTH]: Nodo sincronizado correctamente.");
            return cleanToken;

        } catch (error) {
            console.error("🚨 [SDT_CRITICAL]: Fallo en refresco de sesión:", error.message);
            
            // 5. PURGA TOTAL (Protocolo de Seguridad)
            // Si el refresh falla, el usuario debe ser expulsado inmediatamente
            setToken(null);
            setUser(null);
            localStorage.clear(); // Limpieza atómica de todos los nodos
            
            throw error; 
        }
    };

    return refresh;
};

export default useRefresh;