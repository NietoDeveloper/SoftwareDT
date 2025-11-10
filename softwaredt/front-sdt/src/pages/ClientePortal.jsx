// 🛑 LÍNEAS A AJUSTAR EN src/pages/ClientePortal.jsx 🛑

import { useUser } from '../context/UserContext.jsx'; // ⬅️ RUTA AJUSTADA
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from '../components/ClientPortal/Sidebar.jsx'; // ⬅️ RUTA AJUSTADA
import Header from '../components/ClientPortal/Header.jsx'; // ⬅️ RUTA AJUSTADA
import Dashboard from '../components/ClientPortal/Dashboard.jsx'; // ⬅️ RUTA AJUSTADA
import Payments from '../components/ClientPortal/Payments.jsx'; // ⬅️ RUTA AJUSTADA
import Services from '../components/ClientPortal/Services.jsx'; // ⬅️ RUTA AJUSTADA
import Invoices from '../components/ClientPortal/Invoices.jsx'; // ⬅️ RUTA AJUSTADA
import Documents from '../components/ClientPortal/Documents.jsx'; // ⬅️ RUTA AJUSTADA

// Componente principal del Portal del Cliente
const ClientePortal = () => {
    // ... (El resto del código es funcional y no necesita cambios)
    const { user, isAuthenticated, loading } = useUser(); 
    const navigate = useNavigate();
    const location = useLocation();

    // Lógica para renderizar el componente activo según la URL
    const getActiveComponent = () => {
        const path = location.pathname.split('/').pop() || 'dashboard';
        switch (path) {
            case 'pagos':
                return <Payments />;
            case 'servicios':
                return <Services />;
            case 'facturas':
            case 'invoices':
                return <Invoices />;
            case 'documentos':
                return <Documents />;
            case 'dashboard':
            default:
                return <Dashboard />;
        }
    };

    // Lógica de redirección (seguridad)
    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                navigate('/login'); 
            } else if (user?.role !== 'client') {
                navigate('/'); 
            }
        }
    }, [isAuthenticated, loading, navigate, user]);

    if (loading) {
        return <div className="text-center p-8">Cargando portal...</div>;
    }

    if (!isAuthenticated || user?.role !== 'client') {
        return null;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar y Contenido */}
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <div className="container mx-auto">
                        {getActiveComponent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClientePortal;