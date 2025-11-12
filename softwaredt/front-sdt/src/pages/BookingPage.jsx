import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Se elimina la extensión '.jsx' del path para que el bundler pueda resolver el módulo correctamente.
import { AppContext } from '../context/UserContext';
// Importa tu instancia configurada de Axios
// import { axiosAuth } from '../API/api'; 

// --- Componentes SVG para Iconografía ---
const CalendarIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0H3" />
    </svg>
);

const ClockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

// Mock de disponibilidad de franjas horarias
const MOCK_SLOTS = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
];

const BookingPage = () => {
    // Hooks de enrutamiento y estado global
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AppContext);

    // Estados locales
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [doctorName, setDoctorName] = useState("Dr. (ID: " + doctorId + ")");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // Función Mock: Simula la carga de datos del doctor
    useEffect(() => {
        // En una app real, aquí llamarías a la API para obtener los detalles del doctor
        // y establecerías setDoctorName.
        // Ejemplo: const response = await axiosAuth.get(`/doctors/${doctorId}`);
        // setDoctorName(response.data.name);
        
        // Simular un nombre para la UI
        setTimeout(() => {
            if (doctorId === '6913840444079672f1096e6a') {
                 setDoctorName("Dr. Javier Solís");
            } else {
                 setDoctorName("Dr. Desconocido");
            }
        }, 500);
    }, [doctorId]);

    // Función Mock: Carga de franjas horarias disponibles
    const fetchAvailableSlots = (date) => {
        setIsLoading(true);
        setError(null);
        setSelectedTimeSlot(null);
        setAvailableSlots([]);

        // Lógica real: await axiosAuth.get(`/doctors/${doctorId}/slots?date=${date}`);
        
        // Simulación: Devuelve MOCK_SLOTS después de un breve retraso.
        setTimeout(() => {
            // En una app real, filtrarías slots basados en la fecha, si es fin de semana, etc.
            if (date) {
                setAvailableSlots(MOCK_SLOTS);
            } else {
                 setAvailableSlots([]);
            }
            setIsLoading(false);
        }, 800);
    };

    // Efecto para cargar slots cuando cambia la fecha
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate]); // No incluir fetchAvailableSlots aquí ya que no queremos que se ejecute al inicio

    // Manejador de la reserva
    const handleBooking = async () => {
        if (!selectedDate || !selectedTimeSlot) {
            setError("Debes seleccionar una fecha y una hora para la cita.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const bookingData = {
                doctorId: doctorId,
                patientId: user.id, // Asume que el ID del paciente está en el contexto
                date: selectedDate,
                time: selectedTimeSlot,
                status: 'Pendiente', 
                // Añadir otros datos necesarios como el servicio, etc.
            };

            // 🛑 Llama a la API real de reserva:
            // const response = await axiosAuth.post(`/user/appointment/${doctorId}`, bookingData);
            
            // --- SIMULACIÓN DE RESERVA ---
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockAppointmentId = Math.random().toString(36).substring(2, 15);
            
            setMessage(`¡Cita con ${doctorName} agendada con éxito!`);
            
            // Redirigir al checkout/pago o a los detalles de la cita
            navigate(`/checkout?appointmentId=${mockAppointmentId}`, { state: { booking: bookingData } });

        } catch (err) {
            console.error("Error al agendar la cita:", err);
             // 💡 NOTA IMPORTANTE: El error original de 'net::ERR_CONNECTION_REFUSED'
             // es una falla de conexión (URL base incorrecta o backend apagado).
             // Aquí mostramos un mensaje de error genérico.
            setError("Error al procesar la reserva. Por favor, verifica la conexión con el servidor (puerto 8080) e inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };
    
    // Obtener la fecha mínima (hoy) para el input date
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2">
                    Agendar Cita
                </h1>
                <p className="text-xl font-semibold text-gray-700 mb-8 border-b pb-4">
                    Con: <span className="text-indigo-600">{doctorName}</span>
                </p>

                {/* Paso 1: Selección de Fecha */}
                <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                        <CalendarIcon className="h-6 w-6 mr-2 text-blue-500"/>
                        1. Selecciona la Fecha
                    </h2>
                    <input
                        type="date"
                        min={today}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
                    />
                </div>

                {selectedDate && (
                    <div className="mb-8 p-6 border border-gray-200 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                            <ClockIcon className="h-6 w-6 mr-2 text-blue-500"/>
                            2. Selecciona la Hora
                        </h2>

                        {isLoading ? (
                            <p className="text-blue-500 flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando franjas horarias...
                            </p>
                        ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                {availableSlots.map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                        className={`p-3 text-center rounded-lg font-medium transition-all duration-200 border-2 
                                            ${selectedTimeSlot === slot 
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-400/50 transform scale-105' 
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-red-500 font-medium">No hay franjas horarias disponibles para la fecha seleccionada.</p>
                        )}
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 font-semibold text-sm">
                        {error}
                    </div>
                )}
                 {message && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 font-semibold text-sm">
                        {message}
                    </div>
                )}

                <button
                    onClick={handleBooking}
                    disabled={isLoading || !selectedDate || !selectedTimeSlot}
                    className={`w-full py-4 mt-6 bg-green-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-green-400/40 transition-all duration-300 flex items-center justify-center 
                        ${(isLoading || !selectedDate || !selectedTimeSlot)
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-green-600 hover:shadow-green-500/60 transform hover:-translate-y-1'
                        }`}
                >
                    {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        `Confirmar Reserva con ${selectedTimeSlot ? selectedTimeSlot : 'la Hora'} (${selectedDate ? new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long' }) : 'Fecha'})`
                    )}
                </button>
                
            </div>
        </div>
    );
};

export default BookingPage;