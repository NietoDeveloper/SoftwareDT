import { axiosAuth } from "../API/api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BsArrowRight } from "react-icons/bs";

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const res = await axiosAuth.get("/doctors");
      return res.data.doctors || []; 
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error; 
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    // Opcional: Esto asegura que el valor inicial sea un array vacío si la carga falla
    initialData: [], 
  });

  if (isLoading) return <h1>Cargando....</h1>;
  if (error) return <h1>Error cargando los Datos: {error.message}</h1>;

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  return (
    <div className=" mx-auto px-4 py-8">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
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
                <p className="text-gray-700 mb-4">{doctor.bio}</p>
                <button
                  className="w-10 h-10 rounded-full border border-solid border-gray-900 flex items-center justify-center hover:bg-blue-600 transition-colors group"
                  onClick={() => handleDoctorClick(doctor._id)}
                >
                  <BsArrowRight className="text-gray-900 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontro Programador</p> 
        )}
      </div>
    </div>
  );
};

export default DoctorList;