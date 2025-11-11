// src/pages/ClientePortal.jsx

import { useUser } from '../context/UserContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ✅ CORRECCIÓN CLAVE: Se cambió 'ClientePortal' a 'ClientPortal' en todas las importaciones.
// Este cambio asume que tu carpeta en src/components/ se llama ClientPortal.
import Sidebar from '../components/ClientPortal/Sidebar.jsx';
import Header from '../components/ClientPortal/Header.jsx';
import Dashboard from '../components/ClientPortal/Dashboard.jsx';
import Payments from '../components/ClientPortal/Payments.jsx';
import Services from '../components/ClientPortal/Services.jsx';
import Invoices from '../components/ClientPortal/Invoices.jsx';
import Documents from '../components/ClientPortal/Documents.jsx';

// Componente principal del Portal del Cliente
const ClientePortal = () => {
    const { user, isAuthenticated, loading } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Función para obtener el componente basado en el path
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

    // Redirección si el usuario no está autenticado o no es un cliente
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
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <Header />
                
                {/* Main Content Area */}
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