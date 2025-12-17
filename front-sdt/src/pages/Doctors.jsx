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
        <h1 className="text-4xl font-extrabold text-center mb-2 text-black">
          Servicios
        </h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">
          Escoje Uno
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="
                group bg-white shadow-lg rounded-lg p-6 min-w-[280px] h-[80vh]
                hover:shadow-2xl hover:bg-yellow-100 hover:translate-y-[-10px]
                transition-all duration-300 ease-in-out
                cursor-pointer flex flex-col items-center text-center
                text-black border-2 border-transparent hover:border-amber-400
                flex-grow
              "
              onClick={() => navigateToBooking(doctor._id)}
              style={{
                flexBasis: 'calc(25% - 1.5rem)', 
                maxWidth: 'calc(100%/1 - 1.5rem)', // Base: 1 en móviles
                '@media (min-width: 640px)': { maxWidth: 'calc(100%/2 - 1.5rem)' }, // sm: 2 tarjetas
                '@media (min-width: 768px)': { maxWidth: 'calc(100%/3 - 1.5rem)' }, // md: 3 tarjetas
                '@media (min-width: 1024px)': { maxWidth: 'calc(100%/4 - 1.5rem)' }, // lg: 4 tarjetas
                '@media (min-width: 1280px)': { maxWidth: 'calc(100%/4 - 1.5rem)' }, // xl: 4 tarjetas
              }}
            >
              <h1 className="text-2xl font-bold mb-4 text-black group-hover:text-amber-700">
                {doctor.name}
              </h1>
              <h2 className="text-lg font-medium text-black mb-4 group-hover:text-amber-600">
                {doctor.specialization}



          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorList;