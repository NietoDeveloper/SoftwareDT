import { useState, useEffect } from 'react';
import { Truck, Clock, Calendar, CheckCircle, User, PlusCircle, Bell, Settings, LogOut } from 'lucide-react';

const mockAppointments = [
  {
    id: 1,
    service: 'Instalación de Software ERP',
    date: '2025-11-20',
    time: '14:30',
    status: 'Pendiente',
    doctor: 'Ing. Software; Laura Vélez',
  },
  {
    id: 2,
    service: 'Migración a Servidor Nuevo',
    date: '2025-11-10',
    time: '09:00',
    status: 'Completada',
    doctor: 'Ing. Software; Manuel Nieto',
  },
];

const HeaderButton = ({ Icon, label, className = '', onClick }) => (
  <button
    className={`p-3 rounded-full text-gray-700 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150 ${className}`}
    aria-label={label}
    title={label}
    onClick={onClick}
  >
    <Icon className="w-5 h-5" />
  </button>
);

const ClientPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Simular un retraso de red
    const timer = setTimeout(() => {
      try {
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
        return 'text-green-800 bg-green-100 ring-green-300';
      case 'Pendiente':
        return 'text-yellow-800 bg-yellow-100 ring-yellow-300';
      case 'Completada':
        return 'text-indigo-800 bg-indigo-100 ring-indigo-300';
      default:
        return 'text-gray-800 bg-gray-100 ring-gray-300';
    }
  };
  
  // Manejador de clic para Ver Detalles (ahora con log en consola)
  const handleViewDetails = (apptId) => {
    console.log(`Cita ${apptId}: Se simuló la acción 'Ver Detalles'.`);
    // Aquí se ejecutaría la lógica de navegación o mostrar un modal
    // Ejemplo: alert(`Ver detalles de la cita ${apptId}`);
  };

  // Botón primario para agendar nuevo servicio
  const ScheduleNewServiceButton = () => (
    <button 
      className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl text-base transition duration-200 shadow-lg hover:shadow-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50"
      onClick={() => console.log('Navegar a la página de agendamiento.')}
    >
      <PlusCircle className="w-5 h-5 mr-2" />
      Agendar nuevo servicio
    </button>
  );


  // Componente de la Tarjeta de Cita con espaciado mejorado
  const AppointmentCard = ({ appt }) => (
    // Margen y sombra mejorados: Mayor padding (p-6), sombra más suave y transición pulida
    <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-200 transform hover:scale-[1.01]">
      
      {/* Sección Principal y Status: Espacio claro entre título y badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3 pr-2"> {/* Espacio a la derecha para no chocar con el status */}
          <Truck className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
          <h3 className="text-xl font-bold text-gray-900 leading-snug">{appt.service}</h3>
        </div>
        {/* Etiqueta de Status: Mejor contraste y mayor padding (px-4 py-1.5) */}
        <span className={`flex-shrink-0 px-4 py-1.5 text-sm font-semibold rounded-full ring-1 ring-inset ${getStatusClasses(appt.status)}`}>
          {appt.status}
        </span>
      </div>

      {/* Detalles: Separación clara y espaciado (gap-y-3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm text-gray-700 border-t border-gray-200 pt-4 mt-4">
        
        {/* Fecha, Hora y Técnico: Iconos alineados y espaciados */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span className="font-medium text-gray-900">Fecha:</span>
          <span>{appt.date}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span className="font-medium text-gray-900">Hora:</span>
          <span>{appt.time}</span>
        </div>
        
        {/* Técnico: Ocupa toda la fila para mayor prominencia */}
        <div className="md:col-span-2 flex items-center space-x-2 pt-1">
          <User className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span className="font-medium text-gray-900">Ingeniero Asignado:</span>
          <span>{appt.doctor}</span>
        </div>

        {/* Botón de Ver Detalles (Ahora con acción de log) */}
        <div className="md:col-span-2 flex justify-end mt-4 pt-4 border-t border-gray-100">
            <button 
                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150 p-2 rounded-lg hover:bg-indigo-50"
                onClick={() => handleViewDetails(appt.id)}
            >
                Ver Detalles <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
        </div>
      </div>
    </div>
  );

  return (
    // Contenedor principal: Mayor padding en general y fondo más claro
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera Principal y Barra de Perfil: Margin top de 80px (mt-20) */}
        <div className="mt-20 flex justify-between items-center mb-6">
            
            {/* Logo o Nombre de la Empresa */}
            <div className="flex items-center space-x-2">
                <CheckCircle className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-extrabold text-gray-900">TechServicios</h2>
            </div>
            
            {/* Botones de Perfil y Acciones Rápidas */}
            <div className="flex space-x-3">
                {/* Botones de perfil con onClick simulado */}
                <HeaderButton Icon={Bell} label="Notificaciones" onClick={() => console.log('Notificaciones clicadas')} />
                <HeaderButton Icon={Settings} label="Configuración" onClick={() => console.log('Configuración clicada')} />
                <HeaderButton Icon={LogOut} label="Cerrar Sesión" className="text-red-700 hover:bg-red-50 hover:text-red-700" onClick={() => console.log('Cerrar Sesión clicado')} />
            </div>
        </div>

        {/* Sección de Bienvenida y Botón de Agendar */}
        <header className="mb-10 p-6 bg-white rounded-2xl shadow-lg border-t-4 border-indigo-600 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Servicios</h1>
            <p className="text-lg text-gray-600">
              Revisa el estado de tus citas de servicio y soporte de tecnología.
            </p>
          </div>
          <ScheduleNewServiceButton />
        </header>

        {/* Contenido Dinámico: Loading, Error o Citas */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-48 bg-white rounded-xl shadow-md">
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-indigo-600 border-t-4 border-transparent"></div>
            <p className="ml-4 mt-4 text-lg text-gray-600">Cargando citas...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-100 text-red-700 rounded-xl border border-red-300 shadow-md">
            <p className="font-semibold text-lg">{error}</p>
          </div>
        ) : (
          <div>
            {appointments.length > 0 ? (
              // Contenedor de Citas: Margen y espaciado consistente (gap-8)
              <div className="grid gap-8 md:grid-cols-2">
                {appointments.map((appt) => (
                  <AppointmentCard key={appt.id} appt={appt} />
                ))}
              </div>
            ) : (
              // Mensaje de Citas Vacías
              <div className="text-center p-12 bg-white rounded-2xl shadow-xl border border-gray-100">
                <p className="text-xl text-gray-600 mb-6">Parece que no tienes servicios agendados actualmente.</p>
                <ScheduleNewServiceButton /> 
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPanel;