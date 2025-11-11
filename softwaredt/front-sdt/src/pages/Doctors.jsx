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

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  // 1. Determina la clase del contenedor principal
  // Si solo hay un doctor, usa flexbox para centrar en la altura (h-screen/h-[100vh] + items-center + justify-center)
  // Si hay más, la altura será calculada por el número de doctores (h-[X00vh]) y el 'grid' se encarga del resto.
  const containerClasses =
    doctors.length === 1
      ? "flex items-center justify-center min-h-screen" // Usamos min-h-screen para asegurar altura y centrado en caso de 1
      : `min-h-[${doctors.length * 100}vh]`; // Altura dinámica para que cada doctor tenga 100vh de espacio

  return (
    <div className={`mx-auto px-4 py-8 ${containerClasses}`}>
      <div
        className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
          doctors.length === 1 ? 'w-full max-w-lg' : '' // Aseguramos que el contenedor interno no sea demasiado ancho si solo hay uno
        }`}
        style={doctors.length === 1 ? { minHeight: '100vh' } : {}} // Opcional: aseguramos la altura mínima para el centrado
      >
        {doctors.map((doctor) => (
          // 2. Define la altura de cada elemento de la lista (100vh)
          <div
            key={doctor._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center **h-[100vh]**" 
            onClick={() => handleDoctorClick(doctor._id)}
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
            <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
            <p className="text-yellow-500 mb-4">
              Puntaje: {doctor.totalRating}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2 flex-grow">{doctor.bio}</p>
            <div
              className="w-10 h-10 rounded-full border border-solid border-gray-900 flex items-center justify-center bg-transparent group-hover:bg-blue-600 transition-colors mt-auto"
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