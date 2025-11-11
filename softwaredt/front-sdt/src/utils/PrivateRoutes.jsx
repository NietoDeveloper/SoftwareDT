import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
// Usaremos el custom hook para una mejor lectura, aunque AppContext funciona.
import { useUser } from "../context/UserContext.jsx"; 

const PrivateRoutes = () => {
    // 🛑 CORRECCIÓN CLAVE: Usamos loading e isAuthenticated para una lógica segura.
    const { loading, isAuthenticated } = useUser(); 

    // Muestra una pantalla de carga mientras se verifica la sesión
    if (loading) {
        return <div className="text-center p-8">Verificando sesión...</div>;
    }
    
    // Si está autenticado, permite el acceso a las rutas anidadas (<Outlet/>).
    // Si NO está autenticado, redirige a '/login'.
    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
    );
}

export default PrivateRoutes;