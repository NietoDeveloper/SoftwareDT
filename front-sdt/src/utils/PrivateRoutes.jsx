import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

const PrivateRoutes = () => {
    const { token, loading } = useContext(UserContext);
    const location = useLocation(); 
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Sincronización con el estado de carga global del Datacenter
        if (!loading) {
            setIsChecking(false);
        }
    }, [loading]);

    // 1. Splash Screen de Clase Mundial (Software DT Standard)
    if (loading || isChecking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-main">
                <div className="relative">
                    <div className="w-14 h-14 border-4 border-headingColor/10 rounded-full"></div>
                    <div className="w-14 h-14 border-4 border-t-yellowColor rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <h1 className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-headingColor animate-pulse">
                    Validando Datacenter...
                </h1>
            </div>
        );
    }

    /**
     * 2. LÓGICA DE PROTECCIÓN SOFTWARE DT:
     * Verificamos el token del contexto y, como redundancia de seguridad (SSR/Hydration), 
     * el localStorage. Esto garantiza que el usuario nunca sea rebotado por un error de estado.
     */
    const isAuthenticated = !!token || !!localStorage.getItem('token');

    return isAuthenticated ? (
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