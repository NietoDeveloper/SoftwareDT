/* eslint-disable react/no-unescaped-entities */
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
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${apiUrl}/doctors`);
      return res.data.doctors || res.data;
    } catch (error) {
      toast.error("Error al conectar con el servidor");
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
  });

  const navigateToBooking = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, {
      state: { doctorData: doctor },
    });
  };

  if (isLoading)
    return (
      <h1 className="text-center py-20 text-xl font-black text-black animate-pulse uppercase tracking-widest">
        Cargando Servicios...
      </h1>
    );

  if (error)
    return (
      <h1 className="text-center py-20 text-red-600 text-xl font-black uppercase">
        Error en la red.
      </h1>
    );

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans antialiased">
      <div className="mx-auto px-4 py-16 max-w-[1800px]">
        {/* Encabezado */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
              Fabrica De Software
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">
            Escoje Un <span className="text-amber-500">Servicio</span>
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-white border-[4px] border-black rounded-[30px] p-6 transition-all duration-300 ease-out cursor-pointer 
                         flex flex-col items-center justify-between text-center 
                         w-full sm:max-w-[340px] h-[400px] overflow-hidden
                         shadow-[0_10px_20px_rgba(0,0,0,0.05)] 
                         hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] 
                         hover:-translate-y-2 hover:border-amber-500"
              onClick={() => navigateToBooking(doctor)}
            >
              <div className="w-full flex flex-col items-center flex-shrink-0">
                {/* h3 con 35px de margin top */}
                <h3 className="mt-[35px] text-xl font-black text-black uppercase tracking-tight group-hover:text-amber-600 transition-colors duration-300 truncate w-full">
                  {doctor.name}
                </h3>

                {/* Span con 35px de margin top respecto al h3 */}
                <span className="mt-[35px] text-[12px] font-black text-black group-hover:text-amber-500 uppercase tracking-[0.2em] transition-colors duration-300">
                  {doctor.specialization || "Soporte"}
                </span>
              </div>

              {/* Contenedor Medio (Bio) */}
              <div className="flex-1 flex items-center justify-center py-4 w-full">
                <p className="text-gray-800 text-base md:text-lg font-bold leading-snug italic line-clamp-4">
                  "{doctor.bio}"
                </p>
              </div>

              {/* Contenedor Inferior */}
              <div className="w-full flex flex-col items-center mt-auto flex-shrink-0">
                <div className="w-12 h-[2px] bg-amber-500 mb-4 shadow-[0_0_4px_#f59e0b]"></div>

                <div className="flex items-center justify-between w-full px-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Puntaje:{" "}
                    <span className="text-black">
                      {doctor.totalRating || "5.0"}
                    </span>
                  </p>
                  <div
                    className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center 
                bg-transparent transition-all duration-300 ease-in-out
                shadow-[0_8px_15px_rgba(0,0,0,0.15)] 
                group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:shadow-[0_10px_25px_rgba(245,158,11,0.5)] 
                group-hover:scale-110 active:scale-95"
                  >
                    <ArrowRightIcon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default DoctorList;
