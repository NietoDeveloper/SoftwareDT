// src/pages/ClientePortal.jsx
import { useUser } from '../context/UserContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// 🛑 CORRECCIÓN DE CAPITALIZACIÓN: Se usa 'ClientePortal' en todas las rutas
import Sidebar from '../components/ClientePortal/Sidebar.jsx';
import Header from '../components/ClientePortal/Header.jsx';
import Dashboard from '../components/ClientePortal/Dashboard.jsx';
import Payments from '../components/ClientePortal/Payments.jsx';
import Services from '../components/ClientePortal/Services.jsx';
import Invoices from '../components/ClientePortal/Invoices.jsx';
import Documents from '../components/ClientePortal/Documents.jsx';

// Componente principal del Portal del Cliente
const ClientePortal = () => {
    const { user, isAuthenticated, loading } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Función para obtener el componente basado en el path
    const getActiveComponent = () => {
        // Obtenemos el último segmento de la URL, o 'dashboard' si estamos en /portal
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
        // Esperamos a que el contexto termine de cargar la sesión.
        if (!loading) { 
            if (!isAuthenticated) {
                navigate('/login');
            } else if (user?.role !== 'client') {
                // Redirige a la raíz si no es un cliente (ej. si fuera un doctor)
                navigate('/'); 
            }
        }
    }, [isAuthenticated, loading, navigate, user]);

    if (loading) {
        return <div className="text-center p-8 text-xl">Cargando portal...</div>;
    }

    // Doble chequeo para evitar renderizar contenido sensible mientras ocurre la redirección
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