import React, { useState, useEffect } from 'react';
import { Truck, Clock, Calendar, CheckCircle } from 'lucide-react'; // Usaremos Lucide para iconos

// Simulación de datos de la API
const mockAppointments = [
  {
    id: 1,
    service: 'Instalación de Software ERP',
    date: '2025-11-20',
    time: '14:30',
    status: 'Pendiente',
    doctor: 'Ing. Laura Vélez',
  },
  {
    id: 2,
    service: 'Revisión de Seguridad Cloud',
    date: '2025-11-25',
    time: '10:00',
    status: 'Confirmada',
    doctor: 'Dr. Javier Soto',
  },
  {
    id: 3,
    service: 'Migración a Servidor Nuevo',
    date: '2025-11-10',
    time: '09:00',
    status: 'Completada',
    doctor: 'Ing. Manuel Nieto',
  },
];

const ClientPanel = () => {
  // CORRECCIÓN CLAVE: Inicializar el estado como un array vacío []
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulación de la carga de datos (reemplazar con fetch real)
  useEffect(() => {
    setIsLoading(true);
    // Simular un retraso de red
    const timer = setTimeout(() => {
      try {
        // En una app real, aquí llamarías a tu API:
        // const response = await fetch('/api/appointments');
        // const data = await response.json();
        
        setAppointments(mockAppointments);
        setError(null);
      } catch (e) {
        console.error("Error fetching appointments:", e);
        setError("No pudimos cargar la lista de citas.");
        setAppointments([]);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer); // Limpieza del timer
  }, []);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Confirmada':
        return 'text-green-700 bg-green-100 ring-green-500';
      case 'Pendiente':
        return 'text-yellow-700 bg-yellow-100 ring-yellow-500';
      case 'Completada':
        return 'text-blue-700 bg-blue-100 ring-blue-500';
      default:
        return 'text-gray-700 bg-gray-100 ring-gray-400';
    }
  };

  const AppointmentCard = ({ appt }) => (
    <div className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <Truck className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-800">{appt.service}</h3>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ring-1 ${getStatusClasses(appt.status)}`}>
          {appt.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 border-t pt-3 mt-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{appt.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{appt.time}</span>
        </div>
        <div className="col-span-2 flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-gray-400" />
          <span className='font-medium'>Técnico:</span>
          <span>{appt.doctor}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 p-6 bg-white rounded-xl shadow-md border-t-4 border-indigo-600">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Panel de Clientes</h1>
          <p className="text-gray-500">
            Revisa el estado de tus citas de servicio y soporte de software.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p className="ml-3 text-gray-600">Cargando citas...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6 bg-red-100 text-red-700 rounded-lg border border-red-300">
            <p className="font-semibold">{error}</p>
          </div>
        ) : (
          <div>
            {/* CORRECCIÓN FINAL EN LA LÍNEA 113 DEL CLIENTE: Usar el operador de encadenamiento opcional (?) */}
            {appointments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {appointments.map((appt) => (
                  <AppointmentCard key={appt.id} appt={appt} />
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-white rounded-xl shadow-md">
                <p className="text-lg text-gray-500">No tienes citas agendadas actualmente.</p>
                <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm transition duration-150">
                  Agendar nuevo servicio
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPanel;