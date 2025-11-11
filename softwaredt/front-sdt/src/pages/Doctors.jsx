import { axiosAuth } from "../API/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const res = await axiosAuth.get("/api/doctors"); 
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
            onClick={() => handleDoctorClick(doctor._id)} 
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