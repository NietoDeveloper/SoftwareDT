import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 

const PrivateRoutes = () => {
    const { token, loading } = useContext(UserContext);
    const location = useLocation(); 
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Sincronización con el estado de carga global
        if (!loading) {
            setIsChecking(false);
        }
    }, [loading]);

    // 1. Pantalla de carga (Datacenter SDT) - Coherencia visual total
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
     * El token del contexto es la verdad absoluta. 
     * Si el contexto se reinicia, el UserProvider lo recuperará del localStorage.
     */
    const isAuthenticated = !!token;

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