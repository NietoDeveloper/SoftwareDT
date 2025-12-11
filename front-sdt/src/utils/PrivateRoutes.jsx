import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
// 🚨 CORRECCIÓN 1: Cambiado de AppContext a UserContext
import { UserContext } from "../context/UserContext"; 

const PrivateRoutes = () => {
    const { token, loading } = useContext(UserContext); 
    
    if (loading) {
        return <div>Cargando autenticación...</div>;
    }

    return (
        token ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default PrivateRoutes;