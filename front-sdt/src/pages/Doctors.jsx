import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";

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
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${apiUrl}/doctors`);
      return res.data.doctors || res.data; 
    } catch (error) {
      toast.error("Error al conectar con el servidor");
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const navigateToBooking = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, { state: { doctorData: doctor } });
  };

  if (isLoading) return <h1 className="text-center py-20 text-xl font-black text-black animate-pulse uppercase tracking-widest">Cargando Servicios...</h1>;

  if (error) return <h1 className="text-center py-20 text-red-600 text-xl font-black uppercase">Error en la red.</h1>;

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans antialiased">
      <div className="mx-auto px-4 py-16 max-w-[1800px]">
        
        {/* Encabezado */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Engineering Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">
            Nuestros <span className="text-amber-500">Servicios</span>
          </h1>
        </div>

        {/* Grid Ajustado */}
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
                <h3 className="text-xl font-black text-black uppercase tracking-tight group-hover:text-amber-600 transition-colors duration-300 truncate w-full">
                  {doctor.name}
                </h3>
                
                <span className="mt-2 text-[11px] font-black text-white bg-black group-hover:bg-amber-500 px-4 py-1 rounded-md uppercase tracking-[0.15em] transition-colors duration-300">
                  {doctor.specialization || "Soporte"}
                </span>
              </div>

              {/* Contenedor Medio: Bio con Flex-Grow para centrar dinámicamente */}
              <div className="flex-1 flex items-center justify-center py-4 w-full">
                <p className="text-gray-800 text-base md:text-lg font-bold leading-snug italic line-clamp-4">
                  "{doctor.bio}"
                </p>
              </div>

              {/* Contenedor Inferior: Rating y Acción */}
              <div className="w-full flex flex-col items-center mt-auto flex-shrink-0">
                <div className="w-12 h-[2px] bg-amber-500 mb-4 shadow-[0_0_4px_#f59e0b]"></div>
                
                <div className="flex items-center justify-between w-full px-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Puntaje: <span className="text-black">{doctor.totalRating || "5.0"}</span>
                  </p>
                  
                  <div className="w-10 h-10 rounded-full border-[3px] border-black flex items-center justify-center 
                                  group-hover:bg-black group-hover:border-black transition-all duration-300
                                  shadow-[3px_3px_0px_#f59e0b] group-hover:shadow-none">
                    <ArrowRightIcon className="w-5 h-5 text-black group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default DoctorList;