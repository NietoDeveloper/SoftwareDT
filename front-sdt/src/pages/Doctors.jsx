/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosPublic } from "../API/api"; 
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import { ArrowRight, Briefcase, Star, Cpu } from "lucide-react"; 

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const res = await axiosPublic.get("/doctors");
      return res.data.doctors || res.data.data || res.data || [];
    } catch (error) {
      toast.error("Error de conexión con el Datacenter SDT");
      throw error;
    }
  };

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    retry: 1, 
  });

  const navigateToBooking = (doctor) => {
    const rawPrice = doctor.precio || "0";
    const formattedPrice = `$ ${Number(rawPrice).toLocaleString()}`;

    const fullAppointmentData = {
      doctorData: doctor,
      serviceData: {
        title: doctor.name, 
        price: formattedPrice
      }
    };

    localStorage.setItem('sdt_pending_appointment', JSON.stringify(fullAppointmentData));
    navigate(`/book-appointment/${doctor._id}`, { 
      state: fullAppointmentData 
    });
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-main text-headingColor">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-[2px] border-headingColor/10 border-t-gold rounded-full animate-spin"></div>
        <p className="font-black uppercase tracking-[0.4em] text-[10px]">Sincronizando Datacenter...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-main font-sans antialiased overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-8 py-12 sm:py-20 max-w-[1900px]">
        
        {/* ENCABEZADO SOFTWARE DT */}
        <div className="text-center mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-gold"></div>
            <Cpu className="w-4 h-4 text-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-textColor/40">Especialidades Technologicas</span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>
          <h1 className="text-4xl min-[310px]:text-5xl sm:text-7xl lg:text-8xl font-black text-headingColor uppercase tracking-tighter leading-none">
            Escoje Un <span className="text-gold">Servicio</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-12 justify-items-center">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => navigateToBooking(doctor)}
              className="group bg-card border-[1px] border-headingColor/10 rounded-[2.5rem] p-8 transition-all duration-500 
                         flex flex-col justify-between w-full max-w-[400px] h-[620px] relative
                         shadow-none hover:shadow-[0_20px_60px_rgba(255,215,0,0.25)]
                         hover:border-gold/40 hover:-translate-y-4 cursor-pointer"
            >
              {/* Rating superior */}
              <div className="absolute top-8 right-8 z-10">
                <div className="flex items-center gap-1.5 bg-headingColor text-gold px-3 py-1 rounded-full shadow-lg shadow-gold/10">
                  <Star size={10} fill="currentColor" />
                  <span className="text-[11px] font-black">{doctor.totalRating || "5.0"}</span>
                </div>
              </div>

              {/* Contenido principal e Imagen Relacionada */}
              <div className="w-full flex flex-col items-center mt-4">
                <div className="w-full h-44 bg-main rounded-[1.5rem] mb-8 border-[1px] border-headingColor/5 flex items-center justify-center overflow-hidden transition-all duration-700 group-hover:scale-[1.02]">
                   {/* Imagen relacionada al servicio/especialidad */}
                   <img 
                    src={`https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop`} 
                    alt="SDT Tech" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                   />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-headingColor uppercase tracking-tighter text-center leading-tight min-h-[70px] flex items-center group-hover:text-gold transition-colors duration-300">
                  {doctor.name}
                </h3>
                
                <div className="mt-4 bg-gold/10 border border-gold/30 px-6 py-2 rounded-full">
                  <span className="text-[11px] font-black text-headingColor uppercase tracking-[0.2em]">
                    {doctor.specialization?.split(',')[0] || "Consultor Senior"}
                  </span>
                </div>
              </div>

              {/* Bio descriptiva - FUENTE AUMENTADA */}
              <div className="px-2 my-6">
                <p className="text-textColor/60 text-[16px] font-bold leading-relaxed text-center line-clamp-3 italic">
                  "{doctor.bio || "Solución tecnológica de alto nivel con estándares internacionales de escalabilidad."}"
                </p>
              </div>

              {/* Footer de tarjeta - BOTÓN GOLD INTENSO */}
              <div className="w-full pt-6 border-t border-headingColor/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-textColor/30 uppercase tracking-widest mb-1">Fee Inicial</span>
                  <span className="text-2xl font-black text-headingColor tracking-tighter">
                    $ {doctor.precio ? Number(doctor.precio).toLocaleString() : "---"}
                  </span>
                </div>
                
                {/* Botón Gold con Hover en Movimiento y Fuente Aumentada */}
                <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center transition-all duration-500 
                                group-hover:bg-yellowColor group-hover:scale-110 group-hover:rotate-[360deg] shadow-lg shadow-gold/20">
                  <ArrowRight className="w-7 h-7 text-headingColor transition-transform group-hover:scale-125" />
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