import { axiosPublic } from "../API/api";
import { useNavigate } from "react-router-dom";
// ... (otras importaciones)

const DoctorList = () => {
  const navigate = useNavigate();
  // ... (getDoctors y useQuery remain unchanged)
  
    // ... (isLoading, error, doctors.length checks remain unchanged)

  // ➡️ FUNCIÓN UNIFICADA: Redirige a la página de reservación de citas
  const handleDoctorDetailsClick = (doctorId) => {
    // CORRECCIÓN: Apuntar a la ruta de reserva para agendar la cita.
    navigate(`/book-appointment/${doctorId}`);
  };

  // Mantenemos la función para el botón, apuntando al mismo destino.
  const handleBookAppointmentClick = (e, doctorId) => {
    // Esto es crucial: evita que el evento de clic se propague a la tarjeta contenedora
    e.stopPropagation();
    
    // Apunta a la ruta de reserva.
    navigate(`/book-appointment/${doctorId}`);
  };

  // ... (containerClasses remain unchanged)

  return (
    <div className={`mx-auto px-4 py-8 ${containerClasses}`}>
      <div
        className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
          doctors.length === 1 ? 'w-full max-w-lg' : '' 
        }`}
      >
        {doctors.map((doctor) => (
          // 2. Aplicamos handleDoctorDetailsClick al contenedor de la tarjeta
          <div
            key={doctor._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center mt-[60px] h-[300px]" 
            onClick={() => handleDoctorDetailsClick(doctor._id)} // Click en la tarjeta -> CITA
          >
            {/* ... (Card content remains unchanged) ... */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;