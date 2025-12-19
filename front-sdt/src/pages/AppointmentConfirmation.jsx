import { useLocation, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  CheckCircle,
  Briefcase,
  ExternalLink,
  ArrowRight,
  Mail
} from "lucide-react";

const IconWrapper = ({ children }) => (
  <div className="p-4 rounded-full bg-black text-amber-500 flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black shadow-xl">
    {children}
  </div>
);

const AppointmentConfirmation = () => {
  const location = useLocation();
  
  const { appointment, doctorName } = location.state || {};

  const data = appointment || {
    _id: "ID-PENDIENTE",
    fullName: "Usuario",
    appointmentDate: "Fecha no disponible",
    appointmentTime: "Hora no disponible",
    reason: "Cita agendada",
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 bg-white font-sans text-black overflow-x-hidden">
      
      {/* Contenedor Principal - Responsive de 320px a 1800px */}
      <div className="w-full max-w-[100%] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl mt-8 mb-8 bg-white p-6 sm:p-16 rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-500">
        
        {/* Encabezado de Éxito */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-8 w-28 h-28 bg-black text-amber-500 rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.2)] animate-bounce-slow border-4 border-white">
            <CheckCircle size={56} strokeWidth={2} />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-black mb-6 uppercase tracking-tighter leading-none">
            Servicio <span className="text-amber-500">Confirmado</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-black font-bold bg-gray-50 py-3 px-6 rounded-2xl w-fit mx-auto border border-gray-200 shadow-sm">
            <Mail size={20} className="text-amber-600" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.15em]">
              Detalles enviados a tu correo electrónico
            </p>
          </div>
        </div>

        {/* Card del Especialista (Hover Gold con Movimiento y Sombra) */}
        <div className="group relative mt-12 flex flex-col sm:flex-row items-center p-8 sm:p-10 bg-white rounded-3xl border-2 border-black transition-all duration-500 hover:shadow-[0_30px_60px_rgba(217,119,6,0.3)] hover:-translate-y-2 cursor-pointer overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 transition-all duration-500 group-hover:w-full group-hover:opacity-5 -z-10"></div>
          
          <IconWrapper>
            <Briefcase className="h-10 w-10" />
          </IconWrapper>
          
          <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left">
            <p className="text-xs font-black text-amber-600 uppercase tracking-[0.3em] mb-2 group-hover:text-black transition-colors">
              Especialista Senior
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-black transition-colors uppercase leading-none">
              {doctorName || "Profesional SDT"}
            </h2>
          </div>
        </div>

        {/* Grid de Detalles - Fuentes agrandadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <DetailItem 
            icon={<Calendar className="h-7 w-7" />} 
            title="Fecha Programada" 
            value={data.appointmentDate} 
          />
          <DetailItem 
            icon={<Clock className="h-7 w-7" />} 
            title="Hora del Servicio" 
            value={data.appointmentTime} 
          />
          <DetailItem 
            icon={<User className="h-7 w-7" />} 
            title="Usuario" 
            value={data.fullName} 
          />
          <DetailItem 
            icon={<ExternalLink className="h-7 w-7" />} 
            title="ID de Operación" 
            value={data._id?.substring(0, 15).toUpperCase()} 
          />
        </div>

        {/* Motivo del Servicio */}
        <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border-l-[12px] border-black shadow-inner transition-all duration-500 hover:bg-amber-50">
          <p className="text-xs font-black text-black uppercase tracking-[0.2em] mb-4 opacity-40">
            Concepto del requerimiento
          </p>
          <p className="text-black font-bold text-xl sm:text-2xl leading-relaxed">
            "{data.reason}"
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="mt-16 flex flex-col lg:flex-row justify-center gap-6">
          <Link
            to="/client-appointments"
            className="group flex items-center justify-center gap-4 py-6 px-12 bg-black text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:bg-amber-500 hover:text-black hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(217,119,6,0.4)] text-center uppercase text-sm tracking-[0.2em] w-full"
          >
            Ver mis servicios
            <ArrowRight className="transition-transform duration-500 group-hover:translate-x-3" />
          </Link>
          
          <Link
            to="/doctors"
            className="py-6 px-12 bg-white text-black border-[3px] border-black font-black rounded-2xl transition-all duration-500 hover:border-amber-500 hover:text-amber-600 hover:-translate-y-2 hover:shadow-xl text-center uppercase text-sm tracking-[0.2em] w-full"
          >
            Nuevo Requerimiento
          </Link>
        </div>
      </div>
      
      {/* Footer minimalista */}
      <div className="mb-12 text-center">
        <p className="text-[12px] font-black text-black uppercase tracking-[0.4em] opacity-20">
          SoftwareDT • High End Development • 2025
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-7 bg-white border-2 border-gray-100 rounded-[1.5rem] transition-all duration-500 hover:border-amber-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1">
    <div className="text-black group-hover:text-amber-500 transition-all duration-500 mr-6 bg-gray-50 p-4 rounded-2xl group-hover:bg-black group-hover:rotate-[360deg]">
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-black text-black uppercase tracking-[0.2em] opacity-40 mb-1 group-hover:opacity-100 group-hover:text-amber-600 transition-all">
        {title}
      </p>
      <p className="text-lg sm:text-xl font-black text-black uppercase leading-tight">
        {value}
      </p>
    </div>
  </div>
);

export default AppointmentConfirmation;