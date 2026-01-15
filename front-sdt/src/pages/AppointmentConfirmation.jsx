/* eslint-disable react/no-unescaped-entities */
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import {
  Calendar,
  CircleUser, 
  Clock,
  CheckCircle,
  ArrowRight,
  Mail,
  ShieldCheck,
  CreditCard,
  Database
} from "lucide-react";

const AppointmentConfirmation = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const appointment = location.state?.appointment;

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
      return isNaN(date.getTime()) ? dateString.toUpperCase() : date.toLocaleDateString('es-CO', options).toUpperCase();
    } catch {
      return dateString.toUpperCase();
    }
  };

  // NORMALIZACIÓN DE DATOS SDT: Ahora incluye la captura de 'amount' o 'price'
  const displayData = {
    _id: appointment?._id || "ID-SYNC-PENDING",
    fullName: appointment?.userInfo?.fullName || appointment?.fullName || user?.name || "USUARIO SOFTWARE DT",
    date: appointment?.appointmentDate || appointment?.slotDate || "POR ASIGNAR",
    time: appointment?.appointmentTime || appointment?.slotTime || "POR ASIGNAR",
    reason: appointment?.reason || "Implementación técnica solicitada según protocolo SDT.",
    serviceName: appointment?.serviceName || "Consultoría Técnica Senior",
    // AJUSTE: Captura el valor numérico o el string del precio enviado desde BookingPage
    price: appointment?.amount || appointment?.price 
      ? `$ ${new Number(appointment?.amount || appointment?.price).toLocaleString('es-CO')} COP` 
      : "COTIZACIÓN EN PROCESO",
    specialization: appointment?.specialization || "INGENIERÍA SOFTWARE DT"
  };

  return (
    <div className="min-h-screen w-full bg-[#DCDCDC] font-sans text-black p-3 sm:p-6 md:p-12 flex items-center justify-center overflow-x-hidden">
      
      {/* CONTENEDOR PRINCIPAL RESPONSIVE (Max 1800px) */}
      <div className="w-full max-w-[1800px] bg-white border-2 border-black rounded-[2rem] md:rounded-[4rem] p-6 sm:p-10 md:p-20 shadow-[0_20px_50px_rgba(254,182,13,0.3)] relative overflow-hidden transition-all duration-500">
        
        {/* DECORACIÓN FONDO */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD700]/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FEB60D]/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>

        {/* CABECERA */}
        <div className="w-full text-center mb-8 md:mb-16 relative z-10">
          <div className="mx-auto mb-6 w-20 h-20 md:w-28 md:h-28 bg-black text-[#FFD700] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(254,182,13,0.5)] border-2 border-[#FFD700] animate-pulse">
            <CheckCircle className="w-10 h-10 md:w-14 md:h-14" strokeWidth={3} />
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-black mb-4 uppercase tracking-tighter leading-[0.85] italic">
            Sincronización <br/> <span className="text-[#FEB60D] drop-shadow-[0_0_15px_rgba(254,182,13,0.3)]">Exitosa</span>
          </h1>
          <div className="flex items-center justify-center gap-3 bg-black text-[#FFD700] py-3 px-4 md:px-8 rounded-full w-fit mx-auto border border-[#FFD700]/30">
            <Database size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
            <p className="text-[8px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em]">Registro indexado en el Datacenter SDT</p>
          </div>
        </div>

        {/* GRID DE DATOS PRINCIPALES */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          
          {/* TARJETA SERVICIO */}
          <div className="group flex items-center p-6 md:p-10 bg-black text-white rounded-3xl border border-black transition-all hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(254,182,13,0.3)]">
             <div className="p-4 rounded-2xl bg-[#FFD700] text-black group-hover:rotate-12 transition-transform duration-500">
               <ShieldCheck size={32} />
             </div>
             <div className="ml-6 min-w-0">
                <p className="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.2em]">Protocolo Activo</p>
                <h2 className="text-xl md:text-3xl font-black uppercase truncate">{displayData.serviceName}</h2>
                <p className="text-white/60 font-bold text-sm mt-1">{displayData.specialization}</p>
             </div>
          </div>

          {/* TARJETA PRECIO - VALOR AJUSTADO */}
          <div className="group flex items-center p-6 md:p-10 bg-white border border-black rounded-3xl transition-all hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(254,182,13,0.25)]">
             <div className="p-4 rounded-2xl bg-[#DCDCDC] text-black group-hover:bg-[#FFD700] transition-colors duration-500">
               <CreditCard size={32} />
             </div>
             <div className="ml-6 min-w-0">
                <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em]">Inversión Estimada</p>
                <h2 className="text-xl md:text-3xl font-black uppercase text-black">{displayData.price}</h2>
                <p className="text-black/40 font-bold text-xs mt-1">Sujeto a cambios técnicos</p>
             </div>
          </div>
        </div>

        {/* DETALLES TÉCNICOS GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <DetailItem 
            icon={<Calendar />} 
            title="Fecha en Cronograma" 
            value={formatDate(displayData.date)} 
          />
          <DetailItem 
            icon={<Clock />} 
            title="Timestamp de Ejecución" 
            value={displayData.time} 
          />
          <DetailItem 
            icon={<CircleUser />} 
            title="Titular de Operación" 
            value={displayData.fullName} 
          />
          <DetailItem 
            icon={<Mail />} 
            title="Identificador Único (UID)" 
            value={displayData._id.toString().substring(0, 14).toUpperCase()} 
          />
        </div>

        {/* SECCIÓN REASON */}
        <div className="w-full mt-8 md:mt-12 p-6 md:p-12 bg-[#DCDCDC]/20 border border-black rounded-[2rem] md:rounded-[3rem] relative group hover:bg-white transition-all duration-500 hover:shadow-[0_10px_30px_rgba(254,182,13,0.1)]">
          <div className="absolute -top-4 -left-4 bg-[#FFD700] text-black p-2 border border-black font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_#000]">Requerimientos</div>
          <p className="text-black font-bold text-lg md:text-2xl leading-tight italic">
            "{displayData.reason}"
          </p>
        </div>

        {/* ACCIONES FINALES */}
        <div className="w-full mt-10 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 md:gap-8">
          <Link
            to="/users/profile/me" 
            className="group flex items-center justify-center gap-4 py-6 px-12 bg-black text-white font-black rounded-2xl transition-all hover:bg-[#FFD700] hover:text-black hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(254,182,13,0.4)] uppercase text-[12px] md:text-[14px] tracking-widest w-full sm:w-auto border border-black"
          >
            Ver Mi Panel
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
          
          <Link
            to="/services"
            className="py-6 px-12 bg-white text-black border border-black font-black rounded-2xl transition-all hover:bg-[#DCDCDC] hover:-translate-y-2 uppercase text-[12px] md:text-[14px] tracking-widest w-full sm:w-auto text-center"
          >
            Nuevo Servicio
          </Link>
        </div>
      </div>
      
      {/* FOOTER SDT */}
      <div className="fixed bottom-6 left-0 w-full text-center pointer-events-none hidden md:block">
        <p className="text-[10px] font-black text-black uppercase tracking-[0.5em] opacity-30">
          Software DT Datacenter Confirmation Protocol v.2.0.26
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-6 bg-white border border-black/10 rounded-3xl transition-all hover:border-black hover:shadow-[0_10px_20px_rgba(254,182,13,0.1)]">
    <div className="text-black group-hover:text-[#FFD700] transition-all mr-6 bg-[#DCDCDC]/50 p-4 rounded-2xl group-hover:bg-black group-hover:scale-110 duration-300">
      {icon}
    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-base md:text-lg font-black text-black uppercase leading-tight truncate">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;