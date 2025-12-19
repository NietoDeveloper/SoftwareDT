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
  <div className="p-3 rounded-full bg-black text-amber-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg">
    {children}
  </div>
);

const AppointmentConfirmation = () => {
  const location = useLocation();
  
  // Recibimos los datos enviados desde BookingPage via navigate state
  const { appointment, doctorName } = location.state || {};

  // Datos de respaldo si se accede directamente (Fallback)
  const data = appointment || {
    _id: "ID-PENDIENTE",
    fullName: "Usuario",
    appointmentDate: "Fecha no disponible",
    appointmentTime: "Hora no disponible",
    reason: "Cita agendada",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white font-sans text-black">
      
      {/* Contenedor Principal con Margins Top */}
      <div className="w-full max-w-3xl mt-12 mb-12 bg-white p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
        
        {/* Encabezado de Éxito */}
        <div className="text-center mb-10 mt-4">
          <div className="mx-auto mb-6 w-24 h-24 bg-black text-amber-500 rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(245,158,11,0.3)] animate-bounce-slow">
            <CheckCircle size={48} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black mb-4 uppercase tracking-tighter">
            Servicio Confirmado
          </h1>
          <div className="flex items-center justify-center gap-2 text-black opacity-80 font-bold bg-amber-100 py-2 px-4 rounded-full w-fit mx-auto border border-amber-200">
            <Mail size={18} />
            <p className="text-sm uppercase tracking-widest">
              Se ha enviado un e-mail a tu correo con los detalles
            </p>
          </div>
        </div>

        {/* Card del Servicio (Gold Hover Effect) */}
        <div className="group mt-8 flex items-center p-8 bg-white rounded-2xl border-2 border-black transition-all duration-300 hover:bg-black hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(217,119,6,0.4)] cursor-default">
          <IconWrapper>
            <Briefcase className="h-8 w-8 group-hover:text-amber-400" />
          </IconWrapper>
          <div className="ml-6">
            <p className="text-xs font-black text-black uppercase tracking-[0.2em] mb-1 group-hover:text-amber-500">
              Especialista Asignado
            </p>
            <h2 className="text-3xl font-black text-black group-hover:text-white transition-colors uppercase">
              {doctorName || "Profesional SDT"}
            </h2>
          </div>
        </div>

        {/* Grid de Detalles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <DetailItem 
            icon={<Calendar className="h-6 w-6" />} 
            title="Fecha Programada" 
            value={data.appointmentDate} 
          />
          <DetailItem 
            icon={<Clock className="h-6 w-6" />} 
            title="Hora del Servicio" 
            value={data.appointmentTime} 
          />
          <DetailItem 
            icon={<User className="h-6 w-6" />} 
            title="Usuario" 
            value={data.fullName} 
          />
          <DetailItem 
            icon={<ExternalLink className="h-6 w-6" />} 
            title="ID de Operación" 
            value={data._id?.substring(0, 15).toUpperCase()} 
          />
        </div>

        {/* Motivo del Servicio */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border-l-8 border-black shadow-inner">
          <p className="text-xs font-black text-black uppercase tracking-widest mb-3 opacity-60">
            Motivo registrado
          </p>
          <p className="text-black font-medium text-lg italic leading-relaxed">
            "{data.reason}"
          </p>
        </div>


  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-5 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:border-black hover:shadow-lg">
    <div className="text-black group-hover:text-amber-600 transition-colors mr-4 bg-gray-100 p-3 rounded-xl group-hover:bg-black">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-black uppercase tracking-widest opacity-50">{title}</p>
      <p className="text-md font-extrabold text-black uppercase">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;