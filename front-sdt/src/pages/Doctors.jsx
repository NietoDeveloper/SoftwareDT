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
        <line x1="5" y1="12" x2="19" y2="12"></line>   {" "}
    <polyline points="12 5 19 12 12 19"></polyline> {" "}
  </svg>
);

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const baseApiUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000/api"
      ).replace(/\/$/, "");
      const fullUrl = `${baseApiUrl}/doctors`;

      const res = await axios.get(fullUrl);

      if (Array.isArray(res.data.doctors)) {
        return res.data.doctors;
      }
      if (Array.isArray(res.data)) {
        return res.data;
      }
      return [];
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error ${error.response.status}: ${
            error.response.data.message || "Fallo desconocido del servidor."
          }`
        );
      } else {
        toast.error(
          "Fallo de red o servidor no disponible. Verifique la conexión del backend."
        );
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
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
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
               {" "}
        <h1 className="text-2xl font-semibold text-black">
          ¡Vaya! No se encontraron Servicios disponibles.
        </h1>
               {" "}
        <p className="text-black mt-2">
          Por favor, inténtalo de nuevo más tarde.
        </p>
             {" "}
      </div>
    );
  }

  const navigateToBooking = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  return (
    <div className="min-h-screen">
           {" "}
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
               {" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                   {" "}
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:bg-yellow-100 transition-all duration-300 cursor-pointer flex flex-col items-center text-center w-full max-w-xs"

                             {" "}
              </div>
                         {" "}
            </div>
          ))}
                 {" "}
        </div>
             {" "}
      </div>
            <Footer />   {" "}
    </div>
  );
};

export default DoctorList;
