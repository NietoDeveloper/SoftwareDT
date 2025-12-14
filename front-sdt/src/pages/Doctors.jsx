import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios"; 
import Footer from "../components/Footer/Footer"; 

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
         } catch (error) {
      if (error.response) {
        // Error HTTP, ej: 404, 500
        toast.error(`Error ${error.response.status}: ${error.response.data.message || 'Fallo desconocido del servidor.'}`);
      } else {
        // CORRECCIÓN: Mensaje de error de red más claro
        toast.error("Fallo de red o servidor no disponible. Verifique la conexión del backend.");
      }
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
    staleTime: 5 * 60 * 1000, 
    // 🔥 CORRECCIÓN CLAVE PARA LA INTERMITENCIA: Evita recargar automáticamente al cambiar de pestaña.
    refetchOnWindowFocus: false, 
  });

  // CORRECCIÓN: Mensaje de carga
  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold">Cargando Doctores....</h1>;
  
  if (error) {
    const errorMessage = error.response ? `HTTP ${error.response.status}: ${error.response.data.message || 'Error desconocido.'}` : error.message;
    return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos. {errorMessage}</h1>;
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        {/* CORRECCIÓN: Mensaje de lista vacía */}
        <h1 className="text-2xl font-semibold text-gray-700">¡Vaya! No se encontraron Doctores disponibles.</h1>
        <p className="text-gray-500 mt-2">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  const navigateToBooking = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  const containerClasses =
    doctors.length === 1
      ? "flex items-center justify-center min-h-screen"
      : "min-h-screen";

  return (
    <div>
    <div className={`mx-auto px-4 py-8 ${containerClasses}`}>
      <div
        className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
          doctors.length === 1 ? 'w-full max-w-lg' : ''
        }`}
      >
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="group bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center h-[300px]"
            onClick={() => navigateToBooking(doctor._id)}
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
            <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
            <p className="text-yellow-500 mb-4">
              Puntaje: {doctor.totalRating}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2 flex-grow overflow-hidden">{doctor.bio}</p>
            
            <div className="w-10 h-10 rounded-full border border-solid border-gray-900 flex items-center justify-center bg-transparent group-hover:bg-blue-600 transition-colors mt-auto cursor-pointer">
              <ArrowRightIcon className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default DoctorList;