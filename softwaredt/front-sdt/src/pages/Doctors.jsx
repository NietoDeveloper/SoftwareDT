import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";

// Define la URL base de tu backend (Asegúrate de que sea la correcta, incluyendo el puerto si es necesario)
const API_BASE_URL = "http://localhost:5000/api/user"; // La ruta que falló fue /api/user/doctors

// Crea una instancia de Axios que pueda incluir el token
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    // Aquí puedes configurar otros valores por defecto si es necesario
});

// Interceptor para agregar el token de autorización a cada solicitud
axiosInstance.interceptors.request.use(
    (config) => {
        // Obtén el token del almacenamiento local (ajusta esto según dónde lo guardes)
        const token = localStorage.getItem("token"); 

        if (token) {
            // Añade el encabezado de Autorización si el token existe
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      // Usa la instancia de axios configurada para enviar el token
      // La URL completa será: http://localhost:5000/api/user/doctors
      const res = await axiosInstance.get("/doctors"); 
      return res.data.doctors || res.data || [];
    } catch (error) {
      // Revisa si el error es 401 y maneja la redirección o el mensaje
      if (error.response && error.response.status === 401) {
          toast.error("No autorizado. Por favor, inicia sesión.");
          navigate("/login"); // Redirige al inicio de sesión si es 401
      } else {
          toast.error("Fallo al cargar la lista de doctores. Posible error de red o servidor.");
      }
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
  });

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