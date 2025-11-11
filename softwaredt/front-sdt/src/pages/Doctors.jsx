import { axiosAuth } from "../API/api"; // Asumo que `axiosAuth` usa el baseURL correcto
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";
// 💡 IMPORTANTE: Si la lista es PÚBLICA, deberías usar un 'axios' normal sin token. 
// Para este ejemplo, mantendré axiosAuth, pero el cambio de ruta es CRUCIAL.

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      // 🛑 CORRECCIÓN CLAVE: Añadir el prefijo '/api' al endpoint
      const res = await axiosAuth.get("/api/doctors"); 
      
      // 🛑 CORRECCIÓN LIGERA: Asegúrate de que el backend devuelve un array directamente
      // La mayoría de las APIs devuelven el array de datos directamente, 
      // pero si tu backend usa { success: true, doctors: [...] }, 
      // el código original (`res.data.doctors`) estaba bien. 
      // Asumiré que devuelve el array directamente o un objeto con la propiedad `data`.
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
  
  // Mensaje más amigable cuando no hay doctores
  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-gray-700">¡Vaya! No hay doctores registrados aún.</h1>
        <p className="text-gray-500 mt-2">Usa Postman en `POST http://localhost:5000/api/doctor/register` para añadir el primero. ¡Manos a la obra! </p>
      </div>
    );
  }

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  return (
    <div className=" mx-auto px-4 py-8">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
            onClick={() => handleDoctorClick(doctor._id)} // Hago el div clickeable
          >
            <div className="flex flex-col items-center">
              <img
                src={doctor.photo || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
              <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
              <p className="text-yellow-500 mb-4">
                Puntaje: {doctor.totalRating}
              </p>
              <p className="text-gray-700 mb-4 line-clamp-2">{doctor.bio}</p>
              {/* Botón de flecha ya no es necesario si todo el div es clickeable, pero lo dejo si lo quieres mantener */}
              <div
                className="w-10 h-10 rounded-full border border-solid border-gray-900 flex items-center justify-center bg-transparent group-hover:bg-blue-600 transition-colors"
              >
                <BsArrowRight className="text-gray-900 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;