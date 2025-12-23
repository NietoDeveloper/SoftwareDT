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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-main font-sans text-black p-4 sm:p-12 overflow-x-hidden">
      
      <div className="w-full max-w-[100%] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white p-8 sm:p-14 lg:p-20 rounded-[2.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-500 flex flex-col items-center">
        
        <div className="w-full text-center mb-10">
          <div className="mx-auto mb-6 w-20 h-20 bg-black text-gold rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.2)] border-4 border-white">
            <CheckCircle className="w-10 h-10" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-black mb-4 uppercase tracking-tighter leading-tight">
            Servicio <span className="text-gold">Confirmado</span>
          </h1>
        </div>

        {/* Detalles de la Cita */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <DetailItem 
            icon={<Calendar className="h-6 w-6" />} 
            title="Fecha" 
            value={formatDate(displayData.date)} 
          />
          <DetailItem 
            icon={<Clock className="h-6 w-6" />} 
            title="Hora" 
            value={displayData.time} 
          />
        </div>

        {/* Botones de Navegación Corregidos */}
        <div className="w-full mt-12 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/client-appointments" 
            className="group flex items-center justify-center gap-4 py-5 px-10 bg-black text-white font-black rounded-2xl transition-all hover:bg-gold hover:text-black uppercase text-xs tracking-widest w-full sm:w-auto shadow-xl"
          >
            Mis Citas
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
          
          <Link
            to="/services"
            className="py-5 px-10 bg-white text-black border-[3px] border-black font-black rounded-2xl transition-all hover:border-gold hover:text-gold uppercase text-xs tracking-widest w-full sm:w-auto text-center"
          >
            Nuevo Requerimiento
          </Link>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-6 bg-white border-2 border-gray-100 rounded-[1.5rem] transition-all hover:border-gold">
    <div className="text-black group-hover:text-gold transition-all mr-5 bg-gray-50 p-4 rounded-2xl group-hover:bg-black group-hover:rotate-[360deg] duration-700">
      {icon}
    </div>
    <div className="flex flex-col">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-base font-black text-black uppercase leading-tight">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;