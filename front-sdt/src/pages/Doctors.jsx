/* eslint-disable react/no-unescaped-entities */
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import { ArrowRight } from "lucide-react";

const DoctorList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. Prioridad: State (viniendo directo). Fallback: LocalStorage (viniendo de un refresh/login)
  const selectedServiceInfo = location.state?.selectedService || 
                              JSON.parse(localStorage.getItem('selectedService')) || 
                              null;

  const getDoctors = async () => {
   .data.data || res.data.doctors || res.data;
    } catch (error) {
      toast.error("Error al conectar con el Datacenter");
      throw error;
    }
  };

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  // 2. FUNCIÓN DE PERSISTENCIA Y NAVEGACIÓN
  const navigateToBooking = (doctor) => {
    const fullAppointmentData = {
      doctorData: doctor,
      serviceData: selectedServiceInfo
    };

    // GUARDAR PARA EL FLUJO DE BOOKING (Persistencia física)
    localStorage.setItem('sdt_pending_appointment', JSON.stringify(fullAppointmentData));

    // Navegación programática
    navigate(`/book-appointment/${doctor._id}`, {
      state: fullAppointmentData,
    });
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-main">
      <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-main font-sans antialiased overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-[1800px]">
        
        {/* ENCABEZADO RESPONSIVE */}
        <div className="text-center mb-12 sm:mb-20 space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-headingColor uppercase tracking-tighter leading-none">
            Asignar <span className="text-gold">Servicio</span>
          </h1>
          {selectedServiceInfo && (
            <div className="inline-block bg-white/50 backdrop-blur-sm border border-gold/30 px-4 py-1.5 rounded-full mx-2">
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-black">
                PROYECTO: <span className="text-gold">{selectedServiceInfo.name || selectedServiceInfo.title}</span>
              </p>
            </div>
          )}
        </div>

        {/* GRID RESPONSIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-10 justify-items-center">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => navigateToBooking(doctor)}
              className="group bg-card border border-black/5 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 transition-all duration-500 
                         flex flex-col justify-between text-center 
                         w-full max-w-[400px] min-w-[280px] h-[400px] sm:h-[450px] relative
                         shadow-sm hover:shadow-[0_20px_40px_rgba(255,215,0,0.12)] 
                         hover:-translate-y-2 cursor-pointer"
            >
              {/* STATUS INDICATOR */}
              <div className="absolute top-6 right-6">
                <div className="w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_rgba(255,215,0,0.6)]"></div>
              </div>

              {/* INFO PRINCIPAL */}
              <div className="w-full flex flex-col items-center pt-4">
                <h3 className="text-2xl sm:text-3xl font-black text-headingColor uppercase tracking-tighter group-hover:text-gold transition-colors duration-300">
                  {doctor.name}
                </h3>
                <div className="h-1 w-12 bg-gold/30 mt-2 group-hover:w-24 transition-all duration-500"></div>
                <span className="text-[10px] font-black text-textColor/40 uppercase tracking-[0.2em] mt-4">
                  {doctor.specialization || "Senior Software Engineer"}
                </span>
              </div>

              {/* BIO CENTRAL */}
              <div className="px-2 sm:px-4">
                <p className="text-textColor/70 text-base sm:text-lg font-medium leading-relaxed italic line-clamp-4">
                  "{doctor.bio || "Especialista en arquitecturas escalables y optimización de procesos."}"
                </p>
              </div>

              {/* FOOTER */}
              <div className="w-full pt-6 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-gold/20 flex items-center justify-center bg-gold/5 group-hover:bg-gold/20 transition-colors">
                    <span className="text-[11px] sm:text-xs font-black text-gold">
                      {doctor.totalRating || "5.0"}
                    </span>
                  </div>
                  <span className="text-[9px] font-black text-textColor/30 uppercase tracking-widest hidden sm:block">
                    Confianza 
                  </span>
                </div>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center 
                                transition-all duration-500 group-hover:bg-gold shadow-lg shadow-black/10">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;