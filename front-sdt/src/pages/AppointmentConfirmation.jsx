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

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    try {
      return new Date(dateString).toLocaleDateString('es-CO', options);
    } catch {
      return dateString;
    }
  };

  const displayData = {
    _id: appointment?._id || "ID Pendiente",
    fullName: appointment?.userInfo?.fullName || "Cliente Software DT",
    date: appointment?.appointmentDetails?.date || "Fecha pendiente",
    time: appointment?.appointmentDetails?.time || "Hora pendiente",
    reason: appointment?.appointmentDetails?.reason || "Implementación técnica.",
    serviceName: appointment?.serviceName || "Consultoría DT",
    price: appointment?.paymentInfo?.price || "Cotización en proceso",
    specialization: appointment?.specialization || "Ingeniería Senior"
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-main font-sans text-black p-3 sm:p-8 lg:p-12 overflow-x-hidden">
      
      {/* Contenedor Principal Adaptable */}
      <div className="w-full max-w-[100%] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white p-6 sm:p-10 lg:p-16 xl:p-20 rounded-[1.8rem] sm:rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-500 flex flex-col items-center">
        
        {/* Header de Éxito - Responsive text */}
        <div className="w-full text-center mb-8 sm:mb-12">
          <div className="mx-auto mb-5 w-16 h-16 sm:w-20 sm:h-20 bg-black text-gold rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.2)] border-4 border-white">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-black mb-3 uppercase tracking-tighter leading-none">
            Servicio <span className="text-gold">Confirmado</span>
          </h1>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-black font-bold bg-gray-50 py-2 px-4 sm:px-6 rounded-full w-fit mx-auto border border-gray-200">
            <Mail size={14} className="text-yellowColor flex-shrink-0" />
            <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em]">Recibo enviado a tu e-mail</p>
          </div>
        </div>

        {/* Sección Especialista y Servicio - Grid Colapsable */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="group relative flex items-center p-5 sm:p-8 bg-white rounded-2xl sm:rounded-3xl border-2 border-black transition-all hover:shadow-lg">
             <IconWrapper><Briefcase className="h-6 w-6 sm:h-8 sm:w-8" /></IconWrapper>
             <div className="ml-4 sm:ml-6 min-w-0">
                <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest">Especialista SDT</p>
                <h2 className="text-lg sm:text-xl font-black uppercase truncate">{displayData.specialization}</h2>
             </div>
          </div>

          <div className="group relative flex items-center p-5 sm:p-8 bg-black text-white rounded-2xl sm:rounded-3xl border-2 border-black transition-all hover:shadow-lg">
             <div className="p-2 sm:p-3 rounded-full bg-gold text-black transition-all group-hover:rotate-12 flex-shrink-0"><ShieldCheck size={20} className="sm:w-6 sm:h-6" /></div>
             <div className="ml-4 sm:ml-6 min-w-0">
                <p className="text-[8px] sm:text-[9px] font-black text-gold uppercase tracking-widest">Servicio Contratado</p>
                <h2 className="text-lg sm:text-xl font-black uppercase truncate">{displayData.serviceName}</h2>
                <p className="text-gold font-bold text-xs sm:text-sm">{displayData.price}</p>
             </div>
          </div>
        </div>

        {/* Detalles de la Cita - Grid 1 col en móviles, 2 en tablets+ */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <DetailItem 
            icon={<Calendar className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Fecha Programada" 
            value={formatDate(displayData.date)} 
          />
          <DetailItem 
            icon={<Clock className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Bloque Horario" 
            value={displayData.time} 
          />
          <DetailItem 
            icon={<User className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="Titular del Proyecto" 
            value={displayData.fullName} 
          />
          <DetailItem 
            icon={<CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />} 
            title="ID Operación" 
            value={displayData._id.toString().substring(0, 12).toUpperCase()} 
          />
        </div>

        {/* Descripción Técnica - Ajuste de padding y texto */}
        <div className="w-full mt-8 sm:mt-10 p-5 sm:p-8 bg-gray-50 rounded-[1.5rem] sm:rounded-[2rem] border-l-[6px] sm:border-l-[10px] border-black group">
          <p className="text-[8px] sm:text-[10px] font-black text-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 opacity-40">Resumen del Requerimiento</p>
          <p className="text-black font-bold text-md sm:text-lg leading-relaxed italic">"{displayData.reason}"</p>
        </div>

        {/* Botones de Navegación - Columna en móviles, Fila en escritorio */}
        <div className="w-full mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
          <Link
            to="/client-appointments" 
            className="group flex items-center justify-center gap-4 py-4 sm:py-5 px-8 sm:px-10 bg-black text-white font-black rounded-xl sm:rounded-2xl transition-all hover:bg-gold hover:text-black uppercase text-[10px] sm:text-xs tracking-widest w-full sm:w-auto shadow-xl"
          >
            Mis Citas
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
          
          <Link
            to="/services"
            className="py-4 sm:py-5 px-8 sm:px-10 bg-white text-black border-[3px] border-black font-black rounded-xl sm:rounded-2xl transition-all hover:border-gold hover:text-gold uppercase text-[10px] sm:text-xs tracking-widest w-full sm:w-auto text-center"
          >
            Nuevo Requerimiento
          </Link>
        </div>
      </div>
      
      {/* Footer adaptable */}
      <div className="mt-8 sm:mt-12 text-center px-4">
        <p className="text-[8px] sm:text-[10px] font-black text-black uppercase tracking-[0.3em] sm:tracking-[0.5em] opacity-30">
          SoftwareDT Engineering • Bogotá • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

// Componente Interno Ajustado para mayor densidad en móviles
const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-4 sm:p-6 bg-white border-2 border-gray-100 rounded-[1.2rem] sm:rounded-[1.5rem] transition-all hover:border-gold">
    <div className="text-black group-hover:text-gold transition-all mr-4 sm:mr-5 bg-gray-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-black group-hover:rotate-[360deg] duration-700 flex-shrink-0">
      {icon}
    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1">{title}</p>
      <p className="text-sm sm:text-base font-black text-black uppercase leading-tight truncate">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;