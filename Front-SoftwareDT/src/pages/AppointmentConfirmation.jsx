/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, DollarSign, ArrowRight, Download, User, Briefcase, ShieldCheck } from "lucide-react";

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#DCDCDC] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="font-black uppercase tracking-widest text-black/40 text-xs">Sin sesión activa</p>
          <button 
            onClick={() => navigate("/products")} 
            className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#FFD700] hover:text-black transition-all active:scale-95"
          >
            Volver a Productos
          </button>
        </div>
      </div>
    );
  }

  // 🛰️ LECTURA CRÍTICA DE PROPIEDADES PLANAS Y ANIDADAS DEL BACKEND
  const solutionName = appointment.solutionName || "Consultoría Software DT";
  const specialization = appointment.specialization || "Arquitectura MERN / Cloud";
  
  const date = appointment.appointmentDetails?.date || appointment.slotDate || appointment.appointmentDate || "Pendiente";
  const time = appointment.appointmentDetails?.time || appointment.slotTime || appointment.appointmentTime || "Pendiente";
  const status = appointment.appointmentDetails?.status || appointment.status || "pending";

  // Aquí capturamos los datos que no se estaban pintando (Nombre y Teléfono Planos o Anidados)
  const clientName = appointment.userInfo?.fullName || appointment.fullName || "Cliente Software DT";
  const clientEmail = appointment.userInfo?.email || appointment.email || "usuario@softwaredt.com";
  const clientPhone = appointment.userInfo?.phone || appointment.phone || "No especificado";
  const clientReason = appointment.appointmentDetails?.reason || appointment.reason || "Sin especificaciones técnicas adicionales.";

  const price = appointment.paymentInfo?.price ?? appointment.price ?? appointment.amount ?? 0;

  return (
    <div className="min-h-screen bg-[#DCDCDC] font-sans text-black antialiased flex flex-col justify-between overflow-x-hidden">
      
      <main className="flex-grow max-w-[1900px] mx-auto w-full px-4 sm:px-8 md:px-12 py-8 md:py-16 flex flex-col items-center justify-center">
        
        {/* Icono de Éxito SpaceX Cyber-Glow */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 md:w-24 md:h-24 bg-[#FFD700] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,215,0,0.4)] mb-8 md:mb-12 cursor-pointer group"
        >
          <CheckCircle size={40} className="md:w-12 md:h-12 text-black group-hover:scale-110 transition-transform" strokeWidth={3} />
        </motion.div>

        <header className="text-center mb-10 md:mb-16 space-y-4 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none break-words max-w-[300px] sm:max-w-none mx-auto">
            Sincronización <span className="text-[#FEB60D]">Exitosa</span>
          </h1>
          <p className="text-black/50 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] max-w-[400px] mx-auto leading-relaxed">
            Requerimiento real integrado en el backlog global de Software DT.
          </p>
        </header>

        {/* Ticket Industrial Unificado - Responsive 310px a 1900px */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[1100px] bg-white border border-black rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row"
        >
          {/* Lado Izquierdo: Ficha Técnica */}
          <div className="flex-grow p-6 sm:p-8 md:p-12 space-y-8 md:space-y-10 border-b lg:border-b-0 lg:border-r border-black/10">
            
            {/* Header del Ticket */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <p className="text-[9px] font-black text-[#FEB60D] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#FEB60D] rounded-full animate-pulse"/> Módulo Industrial
                </p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight break-words max-w-[280px] sm:max-w-md">
                  {solutionName}
                </h2>
                <p className="text-[10px] font-bold text-black/40 uppercase mt-1">{specialization}</p>
              </div>
              <div className="bg-[#DCDCDC] border border-black/10 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 h-fit">
                <ShieldCheck size={14} className="text-[#FEB60D]" /> Status: {status}
              </div>
            </div>

            {/* Grid de Horarios e Información del Cliente */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-8 border-t border-black/5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-[#FFD700] flex-shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-black/40 uppercase tracking-wider">Fecha de Sesión</p>
                  <p className="font-bold text-sm sm:text-base">{date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-[#FFD700] flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-black/40 uppercase tracking-wider">Hora Programada (COT)</p>
                  <p className="font-bold text-sm sm:text-base">{time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-[#FFD700] flex-shrink-0">
                  <User size={20} />
                </div>
                <div className="truncate max-w-[150px] sm:max-w-[200px]">
                  <p className="text-[9px] font-black text-black/40 uppercase tracking-wider">Titular</p>
                  <p className="font-bold text-sm truncate">{clientName}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-[#FFD700] flex-shrink-0">
                  <Briefcase size={20} />
                </div>
                <div className="truncate max-w-[150px] sm:max-w-[200px]">
                  <p className="text-[9px] font-black text-black/40 uppercase tracking-wider">Contacto</p>
                  <p className="font-bold text-sm truncate">{clientPhone}</p>
                </div>
              </div>
            </div>

            {/* Detalles Adicionales y Requerimientos Guardados */}
            <div className="p-5 bg-[#DCDCDC]/30 rounded-xl border border-black/10 flex flex-col justify-between items-start gap-4">
              <div>
                <p className="text-[9px] font-black text-black/40 uppercase mb-1">Requerimientos Registrados</p>
                <p className="text-xs font-bold text-black/80">{clientReason}</p>
              </div>
              <div className="w-full pt-3 border-t border-black/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="text-[9px] font-black text-black/40 uppercase mb-1">Hash Transaccional (SDT-Core)</p>
                  <code className="text-[10px] font-bold text-black/80 break-all">{appointment._id}</code>
                </div>
                <div>
                  <p className="text-[9px] font-black text-black/40 uppercase mb-1">Email Registrado</p>
                  <p className="text-[11px] font-bold text-black/80">{clientEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Checkout SpaceX */}
          <div className="bg-black text-white p-6 sm:p-8 md:p-12 w-full lg:w-[380px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 md:space-y-8 text-center lg:text-left z-10">
              <div className="flex justify-center lg:justify-start">
                <DollarSign className="text-[#FEB60D]" size={36} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Inversión Estimada</p>
                <p className="text-4xl md:text-5xl font-black text-[#FFD700] tracking-tighter mt-2">
                  ${Number(price).toLocaleString()}
                </p>
              </div>
              <p className="text-[8px] text-white/30 font-bold uppercase leading-relaxed tracking-wider">
                * El valor puede ajustarse según los alcances técnicos finales evaluados en el sprint cero.
              </p>
            </div>

            <div className="mt-12 lg:mt-0 space-y-4 z-10">
               <button className="w-full py-4 bg-white/5 border border-white/10 hover:bg-[#FFD700] hover:text-black rounded-xl flex items-center justify-center gap-2 transition-all group active:scale-95">
                <Download size={16} className="text-[#FFD700] group-hover:text-black" />
                <span className="text-[10px] font-black uppercase tracking-widest">Descargar Resumen</span>
               </button>
            </div>
          </div>
        </motion.div>

        {/* Acciones Finales Responsivas */}
        <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-[650px] px-2">
          <button 
            onClick={() => navigate("/client/dashboard")} 
            className="flex-1 bg-black text-white py-5 md:py-6 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl group"
          >
            Ver mis Proyectos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate("/")} 
            className="flex-1 bg-white border border-black text-black py-5 md:py-6 rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Volver al Inicio
          </button>
        </div>

        <p className="mt-12 text-[9px] font-black text-black/30 uppercase tracking-[0.4em] md:tracking-[0.5em] text-center">
          Software DT — Bogotá, Colombia — 2026
        </p>
      </main>
    </div>
  );
};

export default AppointmentConfirmation;