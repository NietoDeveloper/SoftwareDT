import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";

const ArrowRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(
        `${apiUrl}/doctors?_cache=${Date.now()}&random=${Math.random()}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
            "If-None-Match": "",
            "If-Modified-Since": "",
          },
        }
      );
      console.log("API response (debe ser 200 con datos):", res.status, res.data);
      return res.data.doctors || res.data || [];
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error ${error.response.status}: ${
            error.response.data.message || "Fallo desconocido."
          }`
        );
      } else {
        toast.error("Fallo de red. Verifica backend.");
      }
      throw error;
    }
  };

  const {
    data: doctors = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading)
    return (
      <h1 className="text-center py-10 text-xl font-bold text-black">
        Cargando Doctores....
      </h1>
    );

  if (error) {
    const errorMessage = error.response
      ? `HTTP ${error.response.status}: ${
          error.response.data.message || "Error desconocido."
        }`
      : error.message;
    return (
      <h1 className="text-center py-10 text-red-600 text-xl font-bold">
        Error cargando los Datos. {errorMessage}
      </h1>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-black">
          ¡Vaya! No se encontraron Servicios disponibles.
        </h1>
        <p className="text-black mt-2">
          Por favor, inténtalo de nuevo más tarde o verifica la DB.
        </p>
      </div>
    );
  }

  const navigateToBooking = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-2 -mt-[10px] text-black">
          Servicios
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">
          Escoje Un Servicio
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="
                group bg-white rounded-lg p-6 transition-all duration-300
                cursor-pointer flex flex-col items-center justify-between text-center
                w-full min-w-[280px] max-w-[280px] h-[600px]
                shadow-lg hover:shadow-2xl hover:translate-y-[-10px]
                hover:bg-yellow-50
                text-black
              "
              onClick={() => navigateToBooking(doctor._id)}
            >
              <h1 className="text-xl font-semibold mt-12 text-black group-hover:text-amber-700">
                {doctor.name}
              </h1>
              <h2 className="text-lg text-black mt-8 group-hover:text-amber-600">
                {doctor.specialization}
              </h2>
              <p className="text-lg text-black mt-8">Puntaje: {doctor.totalRating}</p>
              <p className="text-lg text-black mt-12 mb-4 line-clamp-3 overflow-hidden flex-grow">
                {doctor.bio}
              </p>

              <div className="w-10 h-10 rounded-full border border-solid border-black flex items-center justify-center bg-transparent group-hover:bg-amber-500 transition-colors mt-auto cursor-pointer">
                <ArrowRightIcon className="text-black group-hover:text-white transition-colors" />
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