import { useEffect, useState } from "react";
// Se han eliminado las importaciones de 'react-icons/fi' para evitar el error de compilación.
// Los iconos ahora se definen como componentes SVG internos.

// --- MOCK DE DATOS Y LÓGICA DE NAVEGACIÓN (Se asumen disponibles en el entorno real) ---

/** Simula la lista de citas que vendría de una API de Mongo Atlas. */
const mockAppointments = [
    {
        _id: 'R101',
        doctorName: 'Dr. Emilia Rojas',
        date: '2025-12-10',
        time: '09:00',
        specialization: 'Odontología',
        status: 'Confirmada',
    },
    {
        _id: 'R102',
        doctorName: 'Dr. Juan Pérez',
        date: '2025-12-15',
        time: '16:30',
        specialization: 'Pediatría',
        status: 'Pendiente',
    },
    {
        _id: 'R103',
        doctorName: 'Dra. Laura Gómez',
        date: '2026-01-05',
        time: '10:00',
        specialization: 'Nutrición',
        status: 'Cancelada',
    },
];

/** Simula el hook useNavigate para la navegación. */
const useNavigate = () => (path) => console.log(`Navigating to ${path}`);

// --- COMPONENTES AUXILIARES SVG (Reemplazando react-icons/fi) ---

const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5" />
    </svg>
);

const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a.75.75 0 01.75-.75h14.5a.75.75 0 01.75.75v1a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-1z" />
    </svg>
);

const XCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Componente para el ícono de carga (Spinner)
const Spinner = () => (
    <div className="flex justify-center items-center py-20">
        <svg
            className="animate-spin h-10 w-10 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    </div>
);

/**
 * Tarjeta de Resumen de Cita. Reutiliza la estructura solicitada.
 * Se pueden ajustar los colores basados en el estado real de la cita.
 */
const AppointmentCard = ({ appointment, onViewDetails }) => {
    const { _id, doctorName, date, time, specialization, status } = appointment;

    // Lógica de estilos por estado
    let statusClass = "text-gray-600";
    let statusIcon = <ClockIcon className="h-5 w-5 text-yellow-500" />; // Icono para Pendiente
    let badgeClass = "bg-yellow-100 text-yellow-800";

    if (status === 'Confirmada') {
        statusClass = "text-green-600 font-bold";
        statusIcon = <CheckCircleIcon className="h-5 w-5 text-green-500" />; // Icono para Confirmada
        badgeClass = "bg-green-100 text-green-800";
    } else if (status === 'Cancelada') {
        statusClass = "text-red-600 font-bold";
        statusIcon = <XCircleIcon className="h-5 w-5 text-red-500" />; // Icono para Cancelada
        badgeClass = "bg-red-100 text-red-800";
    }

    // Formatear la fecha
    const formattedDate = new Date(date).toLocaleDateString("es-ES", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500 space-y-4">
            
            {/* Cabecera y Estado */}
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Cita ID: {_id}
                    </span>
                    <h3 className="text-xl font-extrabold text-indigo-700 mt-1">
                        {doctorName}
                    </h3>
                </div>
                <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${badgeClass}`}>
                    {statusIcon}
                    <span className="ml-1">{status}</span>
                </span>
            </div>

            {/* Detalles Rápidos (Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t pt-4">
                <div className="flex items-center text-gray-700">
                    <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" /> {/* Reemplazo de FiCalendar */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Fecha</p>
                        <p className="font-semibold">{formattedDate}</p>
                    </div>
                </div>
                <div className="flex items-center text-gray-700">
                    <ClockIcon className="h-5 w-5 mr-2 text-indigo-500" /> {/* Reemplazo de FiClock */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Hora</p>
                        <p className="font-semibold">{time}</p>
                    </div>
                </div>
                <div className="flex items-center text-gray-700 col-span-2 sm:col-span-1">
                    <UserIcon className="h-5 w-5 mr-2 text-indigo-500" /> {/* Reemplazo de FiUser */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase">Especialidad</p>
                        <p className="font-semibold">{specialization}</p>
                    </div>
                </div>
            </div>

            {/* Botón de Acción */}
            <div className="pt-4 border-t text-right">
                <button
                    onClick={() => onViewDetails(_id)}
                    className="py-2 px-6 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-200 shadow-md"
                >
                    Ver Detalles / Administrar
                </button>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

const ClientAppointmentsPanel = () => {
    const navigate = useNavigate(); // Uso del mock de navegación
    
    // Estado para la lista de citas
    const [appointments, setAppointments] = useState([]);
    // Estado para el indicador de carga
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Función que simula la conexión con la base de datos (Mongo Atlas).
     * En un entorno real, aquí iría la llamada a la API (`fetch` o `axios`)
     * al endpoint que devuelve las citas del cliente autenticado.
     * * RUTA TÍPICA: `/api/v1/client/appointments?userId={id}`
     */
    const fetchAppointments = () => {
        setIsLoading(true);
        // Simulación de latencia de red (2 segundos)
        setTimeout(() => {
            // Aquí se usaría: const response = await fetch('/api/v1/client/appointments');
            // Y luego: const data = await response.json();
            
            // Simulación: 1/5 de veces devolvemos una lista vacía.
            const shouldBeEmpty = Math.random() < 0.2; 
            const data = shouldBeEmpty ? [] : mockAppointments;

            setAppointments(data);
            setIsLoading(false);
        }, 2000); 
    };

    useEffect(() => {
        // Cargar las citas al montar el componente
        fetchAppointments();
    }, []);

    const onViewDetails = (appointmentId) => {
        // Navegar a la vista de detalle de la cita
        navigate(`/client/appointment/${appointmentId}`);
    };

    // --- MANEJO DE ESTADOS DE RENDERIZADO ---

    // 1. Estado de Carga
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans flex flex-col justify-center items-center">
                <Spinner />
                <p className="text-lg font-medium text-gray-600 mt-4">
                    Cargando citas agendadas...
                </p>
            </div>
        );
    }

    // 2. Estado Vacío (No hay citas)
    if (appointments.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans flex flex-col justify-center items-center">
                <div className="max-w-xl mx-auto p-10 mt-12 bg-white rounded-xl shadow-2xl border border-gray-200 text-center">
                    <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-6" /> {/* Reemplazo de FiXCircle */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        No hay citas agendadas
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Parece que aún no tienes ninguna cita pendiente.
                    </p>
                    <button
                        onClick={() => navigate("/services")}
                        className="py-3 px-8 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition duration-300 transform hover:-translate-y-0.5"
                    >
                        Agendar Nueva Cita
                    </button>
                </div>
            </div>
        );
    }

    // 3. Renderizado de Citas (Citas encontradas)
    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-4xl mx-auto mt-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 border-b pb-3">
                    Mis Citas Agendadas ({appointments.length})
                </h1>

                <div className="space-y-6">
                    {appointments.map((appointment) => (
                        <AppointmentCard 
                            key={appointment._id} 
                            appointment={appointment} 
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate("/services")}
                        className="py-3 px-8 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-700 transition duration-300 transform hover:-translate-y-0.5"
                    >
                        Agendar Otra Cita
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientAppointmentsPanel;