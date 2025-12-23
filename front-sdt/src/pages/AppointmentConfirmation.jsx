/* eslint-disable react/no-unescaped-entities */
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Calendar,
  User,
  Clock,
  CheckCircle,
  Briefcase,
  ArrowRight,
  Mail,
  ShieldCheck,
  CreditCard
} from "lucide-react";

const IconWrapper = ({ children }) => (
  <div className="p-3 sm:p-4 rounded-full bg-black text-gold flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-black shadow-xl">
    {children}
  </div>
);

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const appointment = location.state?.appointment;

  // Redirigir si no hay datos (evita crash por acceso directo a la URL)
  useEffect(() => {
    if (!location.state) {
      navigate("/client-appointments");
    }
  }, [location.state, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "FECHA POR DEFINIR";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('es-CO', options).toUpperCase();
    } catch {
      return dateString;
    }
  };

  // Normalización de datos para que coincida con el esquema de la API
  const displayData = {
    _id: appointment?._id || "ID-SYNC-PENDING",
    fullName: appointment?.fullName || appointment?.userInfo?.fullName || "CLIENTE SDT",
    // Priorizamos slotDate/Time que viene del backend de Booking
    date: appointment?.slotDate || appointment?.appointmentDate || "PENDIENTE",
    time: appointment?.slotTime || appointment?.appointmentTime || "PENDIENTE",
    reason: appointment?.reason || "Implementación técnica solicitada.",
    serviceName: appointment?.serviceName || "Consultoría Especializada",
    price: appointment?.price || "Cotización en proceso",
    specialization: appointment?.doctorData?.specialization || appointment?.specialization || "INGENIERÍA SENIOR"
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-main font-sans text-black p-4 sm:p-8 lg:p-12 overflow-x-hidden">
      
      {/* Contenedor Principal Estilo SoftwareDT */}
      <div className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white p-6 sm:p-10 lg:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col items-center relative overflow-hidden">
        
        {/* Decoración de fondo sutil */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

        {/* Header de Éxito */}
        <div className="w-full text-center mb-10 sm:mb-14 relative z-10">
          <div className="mx-auto mb-6 w-16 h-16 sm:w-24 sm:h-24 bg-black text-gold rounded-full flex items-center justify-center shadow-2xl border-4 border-white animate-bounce-short">
            <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black mb-4 uppercase tracking-tighter leading-none italic">
            Sincronización <span className="text-gold">Exitosa</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-black font-bold bg-main/50 py-3 px-6 rounded-2xl w-fit mx-auto border border-black/5">
            <Mail size={16} className="text-yellowColor flex-shrink-0" />
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em]">Confirmación enviada al Datacenter y a Tu Correo Electronico</p>
          </div>
        </div>

        {/* Sección Grid Principal */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-10">
          <div className="group flex items-center p-6 sm:p-8 bg-main/30 rounded-3xl border-2 border-transparent hover:border-black transition-all">
             <IconWrapper><Briefcase className="h-6 w-6 sm:h-8 sm:w-8" /></IconWrapper>
             <div className="ml-5 min-w-0">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Servicio</p>
                <h2 className="text-lg sm:text-xl font-black uppercase truncate">{displayData.specialization}</h2>
             </div>
          </div>

          <div className="group flex items-center p-6 sm:p-8 bg-black text-white rounded-3xl border-2 border-black transition-all hover:shadow-2xl">
             <div className="p-3 rounded-2xl bg-gold text-black transition-all group-hover:rotate-12 flex-shrink-0">
               <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
             </div>
             <div className="ml-5 min-w-0">
                <p className="text-[9px] font-black text-gold uppercase tracking-widest">Protocolo Activo</p>
                <h2 className="text-lg sm:text-xl font-black uppercase truncate">{displayData.serviceName}</h2>
                <p className="text-gold font-bold text-xs sm:text-sm mt-1">{displayData.price}</p>
             </div>
          </div>
        </div>

        {/* Detalles Técnicos */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <DetailItem 
            icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Fecha en Cronograma" 
            value={formatDate(displayData.date)} 
          />
          <DetailItem 
            icon={<Clock className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Slot Asignado" 
            value={displayData.time} 
          />
          <DetailItem 
            icon={<User className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Líder de Proyecto" 
            value={displayData.fullName} 
          />
          <DetailItem 
            icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Hash de Operación" 
            value={displayData._id.toString().substring(0, 16).toUpperCase()} 
          />
        </div>

        {/* Bloque de Requerimiento */}
        <div className="w-full mt-10 p-6 sm:p-10 bg-black text-white rounded-[2rem] relative group">
          <div className="absolute top-4 right-6 text-gold/20 font-black text-4xl opacity-20">"</div>
          <p className="text-[9px] font-black text-gold uppercase tracking-[0.3em] mb-4">Especificaciones del Cliente</p>
          <p className="text-white font-bold text-base sm:text-xl leading-relaxed italic pr-4">
            {displayData.reason}
          </p>
        </div>

        {/* Call to Action */}
        <div className="w-full mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            to="/client-appointments" 
            className="group flex items-center justify-center gap-4 py-5 px-10 bg-black text-white font-black rounded-2xl transition-all hover:bg-gold hover:text-black hover:-translate-y-1 uppercase text-[11px] tracking-widest w-full sm:w-auto shadow-2xl"
          >
            Panel de Control
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
          
          <Link
            to="/services"
            className="py-5 px-10 bg-white text-black border-4 border-black font-black rounded-2xl transition-all hover:bg-main uppercase text-[11px] tracking-widest w-full sm:w-auto text-center"
          >
            Nuevo Servicio
          </Link>
        </div>
      </div>
      
      {/* Footer System */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-black uppercase tracking-[0.4em] opacity-40">
          SDT-SYSTEM-CONFIRMATION • 2025 • BOGOTÁ D.C.
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-5 sm:p-6 bg-white border-2 border-black/5 rounded-3xl transition-all hover:bg-main/20 hover:border-black/10">
    <div className="text-black group-hover:text-gold transition-all mr-5 bg-main p-4 rounded-2xl group-hover:bg-black group-hover:rotate-[360deg] duration-700 flex-shrink-0">
      {icon}
    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-sm sm:text-base font-black text-black uppercase leading-tight truncate">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;