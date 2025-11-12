import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/UserContext";

const PrivateRoutes = () => {
    const {token} = useContext(AppContext);

    // Nota: El uso de 'replace: true' se escribe como 'replace'.
    return (
        token ? <Outlet/> : <Navigate to="/login" replace />
    )
}

export default PrivateRoutes;