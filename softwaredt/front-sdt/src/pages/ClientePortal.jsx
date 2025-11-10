import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente principal del Portal del Cliente
const ClientPortal = () => {
    // 1. Estados para manejar los datos del cliente
    const [clientData, setClientData] = useState({
        name: 'Cliente VIP', // Nombre simulado, deberías obtenerlo del contexto o API
        projects: [],
        quotes: [],
        messages: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Efecto para cargar los datos del backend
    useEffect(() => {
        // Esta función simula la carga de datos del backend
        const fetchClientData = async () => {
            // Obtener el token de autenticación para asegurar la petición
            const authToken = localStorage.getItem('authToken'); 
            if (!authToken) {
                setError("No autenticado. Por favor, inicia sesión.");
                setIsLoading(false);
                return;
            }

            try {
                // Aquí deberías cambiar esta URL por la tuya
                const response = await axios.get('http://localhost:5000/api/client/portal-data', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });

                // Simulación de datos exitosos
                setClientData({
                    name: response.data.clientName || 'Cliente Estimado',
                    projects: response.data.projects || [
                        { id: 1, title: "Desarrollo de App Móvil", status: "En Curso", progress: 90 },
                        { id: 2, title: "Integración de API", status: "En Revisión", progress: 45 },
                    ],
                    quotes: response.data.quotes || [
                        { id: 101, title: "Landing Page Personalizada", status: "Pendiente de Aprobación" },
                        { id: 102, title: "Mantenimiento Mensual", status: "Aprobada" },
                    ],
                    messages: response.data.messages || [
                        { id: 201, text: "Tienes 2 nuevos mensajes de tu gerente de proyecto.", unread: true },
                    ]
                });
                setError(null);

            } catch (err) {
                // Manejo de errores de red o token inválido
                console.error("Error al cargar datos del portal:", err);
                setError("Error al cargar la información. Inténtalo de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchClientData();
    }, []); 

    // 3. Renderizado de estados
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold text-indigo-600">Cargando información del portal... ⏳</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 text-center bg-red-100 border-l-4 border-red-500 text-red-700">
                <p className="text-xl font-bold">¡Lo sentimos! Algo salió mal.</p>
                <p>{error}</p>
            </div>
        );
    }

    // 4. Renderizado Final del Portal (usando Tailwind para la estética)
    const { name, projects, quotes, messages } = clientData;

    return (
        <div className="flex flex-col items-center justify-start p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl w-full p-6 sm:p-10 bg-white shadow-2xl rounded-xl border border-gray-100 mt-10">
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-6 border-b-4 border-indigo-100 pb-3">
                    🔑 Bienvenido/a a tu Portal, {name}
                </h1>
                <p className="text-gray-600 mb-8 text-lg">
                    Revisa el estado de tus proyectos, cotizaciones y tu bandeja de mensajería.
                </p>

                {/* --- Grid: Proyectos y Cotizaciones --- */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    
                    {/* Proyectos en Curso */}
                    <div className="p-6 border-2 border-indigo-300 rounded-xl bg-indigo-50 shadow-md">
                        <h2 className="text-2xl font-bold text-indigo-800 mb-3 flex items-center">
                            Proyectos Activos <span role="img" aria-label="project" className="ml-2 text-3xl">🚀</span>
                        </h2>
                        {projects.length > 0 ? (
                            <ul className="space-y-3 text-gray-700">
                                {projects.map(p => (
                                    <li key={p.id} className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-indigo-500">
                                        <div className="font-semibold">{p.title}</div>
                                        <div className="text-sm text-gray-500">Estado: {p.status}</div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${p.progress}%` }}></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (<p className="text-gray-500">No tienes proyectos activos en este momento.</p>)}
                    </div>
                    
                    {/* Cotizaciones */}
                    <div className="p-6 border-2 border-green-300 rounded-xl bg-green-50 shadow-md">
                        <h2 className="text-2xl font-bold text-green-800 mb-3 flex items-center">
                            Cotizaciones <span role="img" aria-label="quote" className="ml-2 text-3xl">💰</span>
                        </h2>
                        {quotes.length > 0 ? (
                            <ul className="space-y-3 text-gray-700">
                                {quotes.map(q => (
                                    <li key={q.id} className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-green-500 flex justify-between items-center">
                                        <span className="font-semibold">{q.title}</span>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${q.status.includes('Aprobada') ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {q.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (<p className="text-gray-500">No tienes cotizaciones recientes.</p>)}

                        <button className="mt-4 w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                            Ver Historial Completo
                        </button>
                    </div>
                </div>

                {/* --- Sección de Mensajería --- */}
                <div className="p-6 border-2 border-yellow-300 rounded-xl bg-yellow-50 shadow-md">
                    <h2 className="text-2xl font-bold text-yellow-800 mb-3 flex items-center">
                        Mensajería <span role="img" aria-label="messages" className="ml-2 text-3xl">💬</span>
                    </h2>
                    {messages.length > 0 ? (
                        <p className={`text-lg ${messages[0].unread ? 'font-bold text-red-600' : 'text-gray-700'}`}>
                            {messages[0].text}
                        </p>
                    ) : (<p className="text-gray-500">No hay mensajes recientes en tu bandeja.</p>)}
                    
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium block mt-2">
                        Ir a la Bandeja de Entrada
                    </a>
                </div>
                
            </div>
        </div>
    );
};

export default ClientPortal;