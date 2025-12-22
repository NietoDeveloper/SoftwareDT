import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

const PrivateRoutes = () => {
    const { token, loading } = useContext(UserContext);
    const location = useLocation(); 
    
    // Estado de carga con estilo Software DT
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#DCDCDC]">
                <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin mb-4"></div>
                <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-black animate-pulse">
                    Verificando Credenciales...
                </h1>
            </div>
        );
    }

    /**
     * Si hay token, permitimos el acceso.
     * Si no, redirigimos a login, pero guardamos 'from' para que, 
     * tras loguearse, el cliente vuelva exactamente a donde intentó entrar 
     * (por ejemplo, directamente a la BookingPage del servicio que eligió).
     */
    return (
        token ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
}

export default PrivateRoutes;