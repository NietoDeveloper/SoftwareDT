import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
// 🔑 CORRECCIÓN DEL ERROR 2: Se ajusta la ruta asumiendo que el archivo de la API está dos niveles arriba.
import { axiosPublic } from "../../API/api.js"; 

// 🔑 CORRECCIÓN DEL ERROR 1: Componente SVG para reemplazar a BsArrowRight
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
      // Usamos axiosPublic si la ruta /doctors es ABIERTA
      const res = await axiosPublic.get("/doctors"); 
      
      // El backend devuelve res.data.doctors o solo res.data
      return res.data.doctors || res.data || [];
    } catch (error) {
      // Manejo de errores (Ñembohovái jejavy rehegua)
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          toast.error("Sesión expirada o acceso denegado. Por favor, inicia sesión.");
          localStorage.removeItem("accessToken"); // Asegúrate que el nombre del token sea correcto (Ejesareko mba'épa héra pe token)
          navigate("/login"); 
        } else {
          toast.error("Fallo al cargar la lista de doctores. Error: " + error.response.status);
        }
      } else {
        toast.error("Fallo de red o servidor no disponible. (Jehasapyre ñeha'ã térã servidor ndoikovéi.)");
      }
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
  });

  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold">Cargando.... (Oñembohysýiva...)</h1>;
  if (error) return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos. (Jejavy oñembohysýivo umi marandu.)</h1>;

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-gray-700">¡Vaya! No se encontraron profesionales disponibles. (¡Ndajetopái pohanohára oñembosako'íva!)</h1>
        <p className="text-gray-500 mt-2">Por favor, inténtalo de nuevo más tarde. (Eñeha'ã jey upe rire.)</p>
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
              <ArrowRightIcon className="text-gray-900 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;