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
  // Como la altura de la tarjeta es fija (300px), ajustamos el centrado si es necesario.
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
          // 2. Aplicamos las clases para el margen superior y la altura.
          // mt-[60px] para 60px de margin-top.
          // h-[300px] para 300px de altura.
          // NOTA: Se ha quitado 'h-[100vh]' ya que el requisito es ahora 300px de alto.
          <div
            key={doctor._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center **mt-[60px] h-[300px]**" 
            onClick={() => handleDoctorClick(doctor._id)}
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
            <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
            <p className="text-yellow-500 mb-4">
              Puntaje: {doctor.totalRating}
            </p>
            {/* Usamos overflow-hidden para asegurar que el texto no desborde la altura de 300px */}
            <p className="text-gray-700 mb-4 line-clamp-2 flex-grow overflow-hidden">{doctor.bio}</p> 
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