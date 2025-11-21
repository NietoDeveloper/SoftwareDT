import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
// Importamos la instancia de Axios ya configurada con el token
import axiosInstance from "../utils/axiosInstance"; // Asegúrate de ajustar la ruta de importación

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      // 🚀 ¡CORRECCIÓN APLICADA! Usamos axiosInstance para enviar el token
      const res = await axiosInstance.get("/doctors"); 
      return res.data.doctors || res.data || [];
    } catch (error) {
      // Manejo de errores de autenticación (401) y 403 (Forbidden)
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          // Si el token es inválido (401) o no tiene permisos (403)
          toast.error("Sesión expirada o acceso denegado. Por favor, inicia sesión.");
          localStorage.removeItem("token"); // Opcional: Limpiar el token malo
          navigate("/login"); 
        } else {
          toast.error("Fallo al cargar la lista de doctores. Error: " + error.response.status);
        }
      } else {
        toast.error("Fallo de red o servidor no disponible.");
      }
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
  });

  // ... (El resto del código de renderizado permanece igual)
  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold">Cargando....</h1>;
  if (error) return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos.</h1>;

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-gray-700">¡Vaya! No se encontraron profesionales disponibles.</h1>
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
    <div className={`mx-auto px-4 py-8 ${containerClasses}`}>
      <div
        className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
          doctors.length === 1 ? 'w-full max-w-lg' : '' 
        }`}
      >
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center h-[300px]" 
            onClick={() => navigateToBooking(doctor._id)}
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
            <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
            <p className="text-yellow-500 mb-4">
              Puntaje: {doctor.totalRating}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2 flex-grow overflow-hidden">{doctor.bio}</p> 
            
            <div
              className="w-10 h-10 rounded-full border border-solid border-gray-900 flex items-center justify-center bg-transparent group-hover:bg-blue-600 transition-colors mt-auto cursor-pointer"
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