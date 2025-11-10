import { useUser } from '../context/UserContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from '../components/ClientPortal/Sidebar';
import Header from '../components/ClientPortal/Header';
import Dashboard from '../components/ClientPortal/Dashboard';
import Payments from '../components/ClientPortal/Payments';
import Services from '../components/ClientPortal/Services';
import Invoices from '../components/ClientPortal/Invoices';
import Documents from '../components/ClientPortal/Documents';

// Componente principal del Portal del Cliente
const ClientePortal = () => {
    // La magia del Contexto para obtener los datos del usuario
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