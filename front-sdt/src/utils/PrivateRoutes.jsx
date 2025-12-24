import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

const PrivateRoutes = () => {
    // Extraemos el token y el estado de carga del contexto global
    const { token, loading } = useContext(UserContext);
    const location = useLocation(); 
    
    // 1. Mientras el Contexto verifica el LocalStorage o refresca el token
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#DCDCDC]">
                <div className="relative">
                    <div className="w-14 h-14 border-4 border-black/10 rounded-full"></div>
                    <div className="w-14 h-14 border-4 border-t-[#FEB60D] rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <h1 className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-black animate-pulse">
                    Validando Datacenter...
                </h1>
            </div>
        );
    }

    /**
     * 2. LÓGICA DE PROTECCIÓN SDT:
     * Si hay token: Permitimos el paso al contenido protegido (Booking, Panel, etc.)
     * Si NO hay token: Redirigimos al Login guardando la ubicación actual para volver después.
     */
    return token ? (
        <Outlet />
    ) : (
        <Navigate 
            to="/login" 
            state={{ from: location }} 
            replace 
        />
    );
}

export default PrivateRoutes;