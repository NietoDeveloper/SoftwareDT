import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

/**
 * 🛰️ SOFTWARE DT - PROTECTED ROUTE CONTROLLER
 */
const PrivateRoutes = () => {
  const { token, loading } = useUser();
  const location = useLocation();

  // Espera industrial para hidratación de estado
  if (loading) {
    return (
      <div className="min-h-screen bg-[#DCDCDC] flex items-center justify-center font-sans text-black">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-black/10 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-t-[#FEB60D] border-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
            Verificando Credenciales <span className="text-[#FEB60D]">DT</span>
          </p>
        </div>
      </div>
    );
  }

  const isAuthenticated = !!token && token !== "null" && token !== "undefined";

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;