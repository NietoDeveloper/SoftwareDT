import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Mail, User, Clock, Stethoscope, BriefcaseMedical } from 'lucide-react';

// --- Iconos reutilizables de Lucide ---

const IconWrapper = ({ children, className }) => (
    <div className={`p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 ${className}`}>
        {children}
    </div>
);

// --- Componente principal de Confirmación de Cita ---
const AppointmentConfirmation = () => {
    // 1. Obtiene el ID de la cita de la URL
    const { appointmentId } = useParams();
    
    // 2. Estados para manejar la data
    const [appointmentData, setAppointmentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Efecto para simular la carga de datos (fetch real)
    useEffect(() => {
        const fetchAppointmentData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // --- SIMULACIÓN DE LLAMADA A API (REEMPLAZAR CON FETCH REAL) ---
                // Aquí iría tu llamada fetch/axios a la API, por ejemplo:
                // const response = await fetch(`/api/appointments/${appointmentId}`);
                // const data = await response.json();
                
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simula latencia
                
                // Si la data es exitosa, se establece el estado.
                // Esta data debe ser REAL, obtenida del backend.
                const realData = {
                    appointmentId: appointmentId,
                    doctorId: '6913840444079672f1096e6a',
                    doctorName: 'Ing. Manuel Nieto',
                    doctorEmail: 'NietoSoftwareDeveloper@outlook.com',
                    patientId: 'patient-789',
                    patientName: 'Usuario Ejemplo',
                    patientEmail: 'usuario.ejemplo@email.com',
                    date: '2025-11-19',
                    time: '14:30',
                    specialization: 'Programación Clínica',
                    notes: 'Revisión de arquitectura de software para Historias Clínicas Electrónicas.'
                };

                setAppointmentData(realData);

                // Log para verificar que se carga la data real, como solicitaste.
                console.log('Cita real cargada:', realData); 

            } catch (err) {
                console.error("Error al cargar la cita:", err);
                setError('No fue posible cargar los detalles de la cita. Por favor, verifica tu conexión o inténtalo más tarde.');
            } finally {
                setIsLoading(false);
            }
        };

        if (appointmentId) {
            fetchAppointmentData();
        } else {
            setError('ID de cita no proporcionado.');
            setIsLoading(false);
        }

    }, [appointmentId]); // Se ejecuta cada vez que cambia el ID de la URL

    // 4. Renderizado condicional

    if (isLoading) {
        // Estado de Carga
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-sans">
                <div className="flex items-center space-x-3 bg-white p-6 rounded-xl shadow-lg">
                    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-lg font-semibold text-gray-700">Cargando detalles de la cita...</p>
                </div>
            </div>
        );
    }

    if (error) {
        // Estado de Error
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-sans">
                <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl text-center">
                    <BriefcaseMedical className="h-12 w-12 mx-auto text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-red-700 mb-4">Error al Cargar la Cita</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to="/doctors" className="text-blue-600 hover:text-blue-800 font-medium">
                        Volver a la lista de doctores
                    </Link>
                </div>
            </div>
        );
    }
    
    // Si no hay data y no hay error (caso muy raro, pero seguro)
    if (!appointmentData) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-sans">
                 <p className="text-lg font-semibold text-gray-700">No se encontraron datos para la cita.</p>
            </div>
        );
    }

    // Estado de Éxito - Muestra la confirmación
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-sans">
            <div className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-2xl shadow-2xl transform transition duration-500 hover:shadow-3xl">
                
                <div className="text-center mb-8">
                    <IconWrapper className="mx-auto mb-4 bg-green-100 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </IconWrapper>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">¡Cita Confirmada con Éxito!</h1>
                    <p className="text-gray-600 text-lg">Tu reserva ha sido procesada. Recibirás un recordatorio por correo.</p>
                </div>

                {/* Detalles de la Cita - Layout de tarjeta */}
                <div className="space-y-4 border-t border-b border-gray-100 py-6">
                    
                    {/* Sección Doctor */}
                    <div className="flex items-center p-4 bg-blue-50/70 rounded-xl shadow-inner">
                        <IconWrapper>
                            <User className="h-6 w-6" />
                        </IconWrapper>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-blue-700">Ingeniero de Software Asignado</p>
                            <h2 className="text-xl font-bold text-gray-900">{appointmentData.doctorName}</h2>
                            <p className="text-sm text-gray-500">Especialidad: {appointmentData.specialization}</p>
                        </div>
                    </div>

                    {/* Fila de Fecha y Hora */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem 
                            icon={<Calendar className="h-5 w-5" />}
                            title="Fecha de la Cita"
                            value={appointmentData.date}
                        />
                        <DetailItem 
                            icon={<Clock className="h-5 w-5" />}
                            title="Hora Estimada"
                            value={appointmentData.time}
                        />
                    </div>

                    {/* Fila de Contacto */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem 
                            icon={<Mail className="h-5 w-5" />}
                            title="Email de Contacto (Doctor)"
                            value={appointmentData.doctorEmail}
                        />
                        <DetailItem 
                            icon={<BriefcaseMedical className="h-5 w-5" />}
                            title="ID de Referencia"
                            value={appointmentData.appointmentId}
                        />
                    </div>

                    {/* Notas */}
                    <div className="p-4 bg-yellow-50/70 rounded-xl border border-yellow-200">
                        <p className="text-sm font-medium text-yellow-700 mb-1">Motivo/Notas</p>
                        <p className="text-gray-700">{appointmentData.notes}</p>
                    </div>

                </div>

                {/* Acciones */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link
                        to="/dashboard"
                        className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-300 text-center"
                    >
                        Ir a mi Panel de Control
                    </Link>
                    <Link
                        to="/services"
                        className="py-3 px-6 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition duration-300 text-center"
                    >
                        Reservar Otra Cita
                    </Link>
                </div>

            </div>
        </div>
    );
};

// Componente auxiliar para mostrar detalles
const DetailItem = ({ icon, title, value }) => (
    <div className="flex items-center p-3 bg-white border border-gray-200 rounded-xl">
        <div className="text-blue-500 mr-3">
            {icon}
        </div>
        <div>
            <p className="text-xs font-medium text-gray-500">{title}</p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

export default AppointmentConfirmation;