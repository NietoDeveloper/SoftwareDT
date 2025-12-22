/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { ArrowRight } from "lucide-react";

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

  const {
    data: doctors = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  // FLUJO: Navega a la ruta de agendamiento pasando la data del servicio
  const navigateToBooking = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, {
      state: { doctorData: doctor },
    });
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC]">
        <h1 className="text-xl font-black text-black animate-pulse uppercase tracking-widest">
          Sincronizando Servicios...
        </h1>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC]">
        <h1 className="text-red-600 text-xl font-black uppercase tracking-tighter">
          Error de Conexión
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#DCDCDC] font-sans antialiased">
      <div className="mx-auto px-6 py-20 max-w-[1800px]">
        
        {/* ENCABEZADO ESTILO DT */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-1 bg-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.6)]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
              Software DT Factory
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-black uppercase tracking-tighter leading-none">
            Selecciona un <span className="text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">Servicio</span>
          </h1>
        </div>

        {/* GRID DE SERVICIOS */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => navigateToBooking(doctor)}
              className="group bg-white border-2 border-black/5 rounded-[2.5rem] p-8 transition-all duration-500 
                         flex flex-col items-center justify-between text-center 
                         w-full sm:max-w-[360px] h-[450px] relative overflow-hidden
                         shadow-[0_10px_40px_rgba(0,0,0,0.03)] 
                         hover:shadow-[0_20px_60px_rgba(255,215,0,0.15)] 
                         hover:-translate-y-3 cursor-pointer"
            >
              {/* Badge de Categoría */}
              <div className="absolute top-8 left-8">
                <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-ping"></div>
              </div>

              <div className="w-full flex flex-col items-center">
                <h3 className="mt-6 text-2xl font-black text-black uppercase tracking-tighter group-hover:text-[#FFD700] transition-colors duration-300">
                  {doctor.name}
                </h3>
                <span className="mt-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  {doctor.specialization || "Technical Support"}
                </span>
              </div>

              {/* Bio / Descripción */}
              <div className="flex-1 flex items-center justify-center px-4">
                <p className="text-gray-600 text-lg font-bold leading-relaxed italic">
                  "{doctor.bio || "Especialista en soluciones escalables para entornos corporativos."}"
                </p>
              </div>

              {/* Footer de la Card */}
              <div className="w-full pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                  <p className="text-lg font-black text-black">
                    {doctor.totalRating || "5.0"}
                  </p>
                </div>
                
                {/* Botón de Acción Circular */}
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center 
                                transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.2)]
                                group-hover:bg-[#FFD700] group-hover:shadow-[0_10px_25px_rgba(255,215,0,0.4)]
                                group-hover:rotate-12">
                  <ArrowRight className="w-6 h-6 text-white group-hover:text-black" />
                </div>
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