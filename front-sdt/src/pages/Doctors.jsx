import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";

// Icono optimizado
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
        
        {/* Encabezado Estilizado */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Engineering Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">
            Nuestros <span className="text-amber-500">Servicios</span>
          </h1>
          <h2 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">
            Selecciona una arquitectura de trabajo
          </h2>
        </div>

        {/* Grid Responsivo (320px a 1800px) */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-white border-2 border-gray-50 rounded-[35px] p-8 transition-all duration-300 ease-out cursor-pointer 
                         flex flex-col items-center justify-between text-center 
                         w-full sm:max-w-[320px] h-[580px] 
                         shadow-[0_10px_30px_rgba(0,0,0,0.03)] 
                         hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
                         hover:-translate-y-3 hover:border-amber-500/30"



              {/* Botón Circular Gold con Movimiento */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-black transition-colors">
                  Ver Detalles
                </span>
                <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center 
                                group-hover:bg-black group-hover:border-black transition-all duration-300
                                shadow-[4px_4px_0px_#f59e0b] group-hover:shadow-none group-hover:scale-110">
                  <ArrowRightIcon className="text-black group-hover:text-amber-500 transition-colors" />
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