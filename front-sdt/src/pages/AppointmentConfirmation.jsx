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
  <div className="p-3 sm:p-4 rounded-full bg-black text-amber-500 flex-shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black shadow-xl">
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white font-sans text-black p-4 sm:p-12 overflow-x-hidden">
      
      {/* Contenedor Principal - Optimizado para centrado y padding */}
      <div className="w-full max-w-[100%] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white p-8 sm:p-14 lg:p-20 rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-500 flex flex-col items-center">
        
        {/* Encabezado de Éxito */}
        <div className="w-full text-center mb-10">
          <div className="mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 bg-black text-amber-500 rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.2)] animate-bounce-slow border-4 border-white">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={2.5} />
          </div>
          {/* Título Ajustado (Tamaño reducido para mejor balance) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-4 uppercase tracking-tighter leading-tight">
            Servicio <span className="text-amber-500">Confirmado</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-black font-bold bg-gray-50 py-2.5 px-6 rounded-full w-fit mx-auto border border-gray-200 shadow-sm">
            <Mail size={16} className="text-amber-600" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em]">
              Detalles enviados por e-mail
            </p>
          </div>
        </div>

        {/* Card del Especialista - Centrado y con Hover Gold */}
        <div className="w-full group relative flex flex-col sm:flex-row items-center justify-center sm:justify-start p-8 sm:p-10 bg-white rounded-3xl border-2 border-black transition-all duration-500 hover:shadow-[0_30px_60px_rgba(217,119,6,0.25)] hover:-translate-y-2 cursor-pointer overflow-hidden mb-10">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-500 transition-all duration-500 group-hover:w-full group-hover:opacity-5 -z-10"></div>
          
          <IconWrapper>
            <Briefcase className="h-8 w-8 sm:h-10 sm:w-10" />
          </IconWrapper>
          
          <div className="mt-6 sm:mt-0 sm:ml-8 text-center sm:text-left">
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] mb-1 group-hover:text-black transition-colors">
              Especialista Senior
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black transition-colors uppercase leading-none">
              {doctorName || "Profesional SDT"}
            </h2>
          </div>
        </div>

        {/* Grid de Detalles - Espaciado uniforme */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <DetailItem 
            icon={<Calendar className="h-6 w-6 sm:h-7 sm:w-7" />} 
            title="Fecha Programada" 
            value={data.appointmentDate} 
          />
          <DetailItem 
            icon={<Clock className="h-6 w-6 sm:h-7 sm:w-7" />} 
            title="Hora del Servicio" 
            value={data.appointmentTime} 
          />
          <DetailItem 
            icon={<User className="h-6 w-6 sm:h-7 sm:w-7" />} 
            title="Usuario Solicitante" 
            value={data.fullName} 
          />
          <DetailItem 
            icon={<ExternalLink className="h-6 w-6 sm:h-7 sm:w-7" />} 
            title="ID de Operación" 
            value={data._id?.substring(0, 15).toUpperCase()} 
          />
        </div>

        {/* Motivo del Servicio - Gran Padding y Estilo Limpio */}
        <div className="w-full mt-10 p-8 sm:p-10 bg-gray-50 rounded-[2rem] border-l-[10px] border-black shadow-inner transition-all duration-500 hover:bg-amber-50 group">
          <p className="text-[10px] font-black text-black uppercase tracking-[0.3em] mb-4 opacity-40 group-hover:text-amber-600 transition-colors">
            Concepto registrado
          </p>
          <p className="text-black font-bold text-lg sm:text-xl lg:text-2xl leading-relaxed italic">
            "{data.reason}"
          </p>
        </div>

        {/* Botones de Acción - Centrados y Adaptables */}
        <div className="w-full mt-12 flex flex-col sm:flex-row justify-center gap-5 sm:gap-6">
          <Link
            to="/client-appointments"
            className="group flex items-center justify-center gap-4 py-5 px-10 bg-black text-white font-black rounded-2xl shadow-xl transition-all duration-500 hover:bg-amber-500 hover:text-black hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(217,119,6,0.3)] text-center uppercase text-xs tracking-[0.2em] w-full sm:w-auto min-w-[220px]"
          >
            Mis Servicios
            <ArrowRight className="transition-transform duration-500 group-hover:translate-x-2" size={18} />
          </Link>
          
          <Link
            to="/doctors"
            className="py-5 px-10 bg-white text-black border-[3px] border-black font-black rounded-2xl transition-all duration-500 hover:border-amber-500 hover:text-amber-600 hover:-translate-y-1.5 hover:shadow-lg text-center uppercase text-xs tracking-[0.2em] w-full sm:w-auto min-w-[220px]"
          >
            Nuevo Requerimiento
          </Link>
        </div>
      </div>
      
      {/* Footer minimalista SoftwareDT */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-black uppercase tracking-[0.5em] opacity-30">
          SoftwareDT • Bogotá • 2025
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-6 sm:p-8 bg-white border-2 border-gray-100 rounded-[1.5rem] transition-all duration-500 hover:border-amber-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1">
    <div className="text-black group-hover:text-amber-500 transition-all duration-500 mr-5 sm:mr-6 bg-gray-50 p-4 rounded-2xl group-hover:bg-black group-hover:rotate-[360deg]">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-[9px] sm:text-[10px] font-black text-black uppercase tracking-[0.2em] opacity-40 mb-1 group-hover:text-amber-600 transition-all">
        {title}
      </p>
      <p className="text-base sm:text-lg lg:text-xl font-black text-black uppercase leading-tight">
        {value}
      </p>
    </div>
  </div>
);

export default AppointmentConfirmation;