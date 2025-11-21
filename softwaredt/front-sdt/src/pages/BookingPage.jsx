import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const MOCK_USER = { id: 'patient-789', name: 'Usuario Ejemplo', email: 'usuario.ejemplo@example.com' }; 
const MOCK_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

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


const BookingPage = () => {
    
    const { doctorId } = useParams(); 
    const navigate = useNavigate();
    const location = useLocation(); 
    
    // Simulación de los datos del doctor (usando datos de ejemplo si no vienen por state)
    const doctor = useMemo(() => {
        const defaultDoc = { name: "Dr. Default", specialization: "General", email: "default.doctor@clinic.com" };
        return location.state?.doctorData || defaultDoc;
    }, [location.state]);


    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchAvailableSlots = (date) => {
        setIsLoading(true);
        setError(null);
        setSelectedTimeSlot(null);
        setAvailableSlots([]);

        setTimeout(() => {
            if (date) {
                setAvailableSlots(MOCK_SLOTS);
            }
            setIsLoading(false);
        }, 800);
    };

    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate]); 

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
                doctorName: doctor.name, 
                doctorEmail: doctor.email || `${doctor.name.toLowerCase().replace(/[^a-z]/g, '')}@clinic.com`,
                patientId: MOCK_USER.id,
                patientName: MOCK_USER.name,
                patientEmail: MOCK_USER.email,
                date: selectedDate,
                time: selectedTimeSlot,
                specialization: doctor.specialization,
                status: 'Confirmada',
            };

            // Simulación de la llamada a la API de registro de cita
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockAppointmentId = Math.random().toString(36).substring(2, 15);
            
            setMessage(`Redirigiendo a la confirmación...`);
            
            navigate(`/appointment-confirmation/${mockAppointmentId}`, { 
                state: { booking: bookingData }
            });

        } catch (err) {
            console.error("Error al agendar la cita:", err);
            setError("Error al procesar la reserva. Por favor, inténtalo de nuevo.");
        } finally {
            setTimeout(() => setIsLoading(false), 2000); 
        }
    };
    
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 transition-all duration-300">
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2">
                    Agendar Cita
                </h1>
                <p className="text-xl font-semibold text-gray-700 mb-8 border-b pb-4">
                    Con: <span className="text-indigo-600">{doctor.name} ({doctor.specialization})</span>
                </p>
                
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
                            <p className="text-blue-500 flex items-center">Cargando...</p>
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
                            <p className="text-red-500 font-medium">No hay franjas horarias disponibles.</p>
                        )}
                    </div>
                )}
                
                {error && (<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 font-semibold text-sm">{error}</div>)}
                {message && (<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 font-semibold text-sm">{message}</div>)}

                <button
                    onClick={handleBooking}
                    disabled={isLoading || !selectedDate || !selectedTimeSlot}
                    className={`w-full py-4 mt-6 bg-green-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-green-400/40 transition-all duration-300 flex items-center justify-center 
                        ${(isLoading || !selectedDate || !selectedTimeSlot)
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:bg-green-600 hover:shadow-green-500/60 transform hover:-translate-y-1'
                        }`}
                >
                    Confirmar Reserva
                </button>
                
            </div>
        </div>
    );
};

export default BookingPage;