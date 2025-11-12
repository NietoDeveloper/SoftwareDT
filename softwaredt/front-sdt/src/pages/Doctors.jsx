import { axiosPublic } from "../API/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const res = await axiosPublic.get("/doctors");
      return res.data.doctors || res.data || [];
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
  });

  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold">Cargando....</h1>;
  if (error) return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos: {error.message}</h1>;

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-gray-700">¡Vaya! No se encontraron profesionales disponibles.</h1>
        <p className="text-gray-500 mt-2">Por favor, inténtalo de nuevo más tarde o verifica la base de datos.</p>
      </div>
    );
  }

  // Esta función navega a la página de detalles del doctor (ruta: /doctors/:doctorId)
  const handleDoctorDetailsClick = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  // Esta función navega a la página de reserva de citas (ruta: /book-appointment/:doctorId)
  const handleBookAppointmentClick = (e, doctorId) => {
    // Esto es crucial: evita que el evento de clic se propague a la tarjeta contenedora
    e.stopPropagation();
    
    // NOTA: Esta ruta coincide ahora con la definida en App.jsx.
    navigate(`/book-appointment/${doctorId}`);
  };

  // 1. Determina la clase del contenedor principal
  const containerClasses =
    doctors.length === 1
      ? "flex items-center justify-center min-h-screen" // Centra la lista si hay un solo doctor
      : "min-h-screen"; // Asegura que la lista tenga al menos una altura de pantalla si hay varios

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
            onClick={() => handleDoctorDetailsClick(doctor._id)} // Click en la tarjeta -> detalles
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
            <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
            <p className="text-yellow-500 mb-4">
              Puntaje: {doctor.totalRating}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2 flex-grow overflow-hidden">{doctor.bio}</p> 
            
            {/* 3. Aplicamos handleBookAppointmentClick al botón/icono */}
            <div
              className="w-10 h-10 rounded-full border border-solid border-gray-900 flex items-center justify-center bg-transparent group-hover:bg-blue-600 transition-colors mt-auto cursor-pointer"
              onClick={(e) => handleBookAppointmentClick(e, doctor._id)} // Click en el botón -> CITA
            >
              <BsArrowRight className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;