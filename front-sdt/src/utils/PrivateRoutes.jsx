import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

const PrivateRoutes = () => {
    const { token, loading } = useContext(UserContext);
    const location = useLocation(); 
    
    // Estado local para manejar el fallback del storage de forma segura
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Pequeña validación de seguridad al montar el componente
        if (!loading) {
            setIsChecking(false);
        }
    }, [loading]);

    // 1. Pantalla de carga (Datacenter SDT)
    if (loading || isChecking) {
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
     * Priorizamos el token del contexto. Si el contexto está vacío, 
     * miramos el storage como último recurso antes de expulsar al usuario.
     */
    const hasBackupToken = localStorage.getItem('token');
    const isAuthenticated = !!token || !!hasBackupToken;

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