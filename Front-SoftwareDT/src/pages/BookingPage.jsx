/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivate } from "../API/api"; 
import { UserContext } from "../context/UserContext";
import { ChevronLeft, Briefcase, ArrowRight, ShieldCheck } from "lucide-react"; 

const BookingPage = () => {
  const { serviceId: paramId } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  // 1. RECUPERACIÓN DE DATOS UNIFICADA (State > LocalStorage)
  const flowData = useMemo(() => {
    const saved = localStorage.getItem('sdt_pending_appointment');
    const parsedSaved = saved ? JSON.parse(saved) : null;
    return location.state || parsedSaved;
  }, [location.state]);

  const serviceFromFlow = flowData?.serviceData; 
  const productData = flowData?.productData; 
  const activeServiceId = paramId || flowData?.productId;

  const productTitle = serviceFromFlow?.title || productData?.title || "Consulta General Software DT";
  const productPrice = serviceFromFlow?.price || (productData?.price ? `$ ${Number(productData.price).toLocaleString()}` : "$ 0");

  // 2. GUARDIA DE ENTRADA ESTRICTA
  useEffect(() => {
    if (!flowData && !paramId) {
      console.warn("🔒 Acceso no autorizado a BookingPage sin contexto de producto.");
      navigate("/products");
    }
  }, [flowData, paramId, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. AUTO-LLENADO DEL PERFIL LOGUEADO
  useEffect(() => {
    const activeUser = user || JSON.parse(localStorage.getItem('user'));
    
    if (activeUser) {
      setFormData(prev => ({
        ...prev,
        fullName: activeUser.name || activeUser.fullName || prev.fullName,
        email: activeUser.email || prev.email,
        phone: activeUser.phone || prev.phone,
        reason: prev.reason || (productTitle !== "Consulta General Software DT" 
          ? `Consulta técnica para el producto: ${productTitle}.` 
          : "")
      }));
    }
  }, [user, productTitle]);

  const validateDateTime = (date, time) => {
    const appointmentDate = new Date(`${date}T${time}`);
    const now = new Date();
    const diffInHours = (appointmentDate - now) / (1000 * 60 * 60);
    
    if (diffInHours < 8) {
      toast.error("Protocolo: Las sesiones requieren 8h de antelación.");
      return false;
    }
    const day = appointmentDate.getDay();
    if (day === 0) {
      toast.error("Operaciones disponibles de Lunes a Sábado.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientName = formData.fullName;
    const clientEmail = formData.email;
    const clientPhone = formData.phone;
    const selectedDate = formData.appointmentDate;
    const selectedTime = formData.appointmentTime;
    const clientReason = formData.reason;

    if (!clientName || !clientPhone || !selectedDate || !selectedTime) {
      return toast.warning("Por favor, rellene todos los campos obligatorios.");
    }

    if (!validateDateTime(selectedDate, selectedTime)) return;

    setIsSubmitting(true);
    
    try {
      // 🛰️ PAYLOAD PLANO EXACTO COMO LO ESPERA TU CONTROLADOR req.body DEL BACKEND
      const payload = {
        productId: activeServiceId, 
        userId: user?._id || user?.id || null, 
        fullName: clientName,
        email: clientEmail || "usuario@softwaredt.com",
        phone: clientPhone,
        slotDate: selectedDate,
        slotTime: selectedTime,
        reason: clientReason || `Implementación de Módulo: ${productTitle}`,
        solutionName: productTitle,
        price: 0 // Las citas informativas son GRATIS
      };

      const response = await axiosPrivate.post(`/appointments`, payload);
      
      toast.success("¡Sincronización de reserva completada!");
      localStorage.removeItem('sdt_pending_appointment');

      navigate("/appointment-confirmation", { 
        state: { 
          appointment: response.data.appointment 
        } 
      });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error en el enlace de datos (E-05).";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DCDCDC] font-sans text-black antialiased flex flex-col">
      <header className="bg-white border-b border-black pt-4 pb-8 px-4 sm:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="text-center sm:text-left">
            <button 
              onClick={() => navigate("/products")} 
              className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-[#FEB60D] mb-4 transition-all"
            >
              <ChevronLeft size={14} /> Volver a Productos
            </button>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
              Reserva <span className="text-[#FEB60D]">Técnica</span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-2xl border border-[#FEB60D]/30 h-fit">
            <ShieldCheck className="text-[#FEB60D]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">Cita Informativa: GRATIS</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto w-full px-4 sm:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow">
        
        <div className="lg:col-span-8">
          <div className="bg-white border border-black rounded-[2rem] p-6 sm:p-12 shadow-sm hover:shadow-xl transition-shadow">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Tu Nombre</label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl focus:border-[#FEB60D] outline-none font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Línea Móvil</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl focus:border-[#FEB60D] outline-none font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Fecha de Cita</label>
                  <input type="date" value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl outline-none font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Franja Horaria (Local)</label>
                  <select value={formData.appointmentTime} onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl outline-none font-bold">
                    <option value="">Seleccionar Hora</option>
                    {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Requerimientos Adicionales</label>
                <textarea value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl focus:border-[#FEB60D] outline-none font-bold h-32 resize-none" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-6 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#FEB60D] hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                {isSubmitting ? "Sincronizando..." : "Finalizar Reserva de Solución"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-black rounded-[2rem] p-8">
            <Briefcase className="text-[#FEB60D] mb-4" size={24} />
            <p className="text-[9px] font-black text-[#FEB60D] uppercase tracking-widest mb-1">Especialista</p>
            <h2 className="text-2xl font-black uppercase tracking-tight">Ingeniero Software DT</h2>
            <p className="text-[10px] text-black/40 font-black uppercase tracking-widest">Sistemas Escalables</p>
          </div>

          <div className="bg-black text-white rounded-[2rem] p-10 relative overflow-hidden border border-black">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FEB60D] block mb-6">Cotización Estimada</span>
              <h3 className="text-2xl font-black uppercase mb-2">
                {productTitle}
              </h3>
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col">
                <p className="text-5xl font-black text-[#FEB60D] tracking-tighter mt-2">
                  {productPrice}
                </p>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-2">Validez Industrial</p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default BookingPage;