/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivate } from "../API/api"; 
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { ChevronLeft, Briefcase, ArrowRight, ShieldCheck } from "lucide-react"; 

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const flowData = useMemo(() => {
    const saved = localStorage.getItem('sdt_pending_appointment');
    const parsedSaved = saved ? JSON.parse(saved) : null;
    return location.state || parsedSaved;
  }, [location.state]);

  const doctorFromFlow = flowData?.doctorData;
  const serviceFromFlow = flowData?.serviceData; 
  const activeDoctorId = paramId || doctorFromFlow?._id;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const activeUser = user || JSON.parse(localStorage.getItem('user'));
    if (activeUser) {
      setFormData(prev => ({
        ...prev,
        fullName: activeUser.name || activeUser.fullName || prev.fullName,
        email: activeUser.email || prev.email,
        phone: activeUser.phone || prev.phone,
        reason: serviceFromFlow 
          ? `Solicitud de servicio: ${serviceFromFlow.title}.` 
          : prev.reason
      }));
    }
  }, [user, serviceFromFlow]);

  const validateDateTime = (date, time) => {
    const appointmentDate = new Date(`${date}T${time}`);
    const now = new Date();
    const diffInHours = (appointmentDate - now) / (1000 * 60 * 60);
    if (diffInHours < 8) {
      toast.error("La cita debe programarse con al menos 8 horas de antelación.");
      return false;
    }
    const day = appointmentDate.getDay();
    if (day === 0) {
      toast.error("Solo atendemos de Lunes a Sábado.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentTime) return toast.warning("Seleccione una hora.");
    if (!validateDateTime(formData.appointmentDate, formData.appointmentTime)) return;

    setIsSubmitting(true);
    
    try {
      // Cálculo del precio numérico para el backend y la confirmación
      const numericPrice = serviceFromFlow?.price 
        ? Number(serviceFromFlow.price.replace(/[^0-9.-]+/g, "")) 
        : (doctorFromFlow?.ticketPrice || 0);

      const payload = {
        doctorId: activeDoctorId,
        serviceName: serviceFromFlow?.title || "Servicio SDT",
        slotDate: formData.appointmentDate,
        slotTime: formData.appointmentTime,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        amount: numericPrice
      };

      const response = await axiosPrivate.post(`/appointments`, payload);
      
      toast.success("Cita Sincronizada.");
      localStorage.removeItem('sdt_pending_appointment');

      // AJUSTE: Redirigir a confirmación enviando el objeto de la cita y el precio
      navigate("/appointment-confirmation", { 
        state: { 
          appointment: {
            ...response.data.appointment, // Datos del backend
            amount: numericPrice,        // Aseguramos el envío del valor
            serviceName: payload.serviceName,
            specialization: doctorFromFlow?.specialization
          } 
        } 
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Error de conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DCDCDC] font-sans text-black antialiased flex flex-col">
      <header className="bg-white border-b border-black pt-12 pb-8 px-4 sm:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="text-center sm:text-left">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-[#FFD700] mb-4 transition-all hover:scale-105"
            >
              <ChevronLeft size={14} /> Consulta con Especialista
            </button>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
              Crear <span className="text-[#FEB60D] drop-shadow-[0_0_15px_rgba(254,182,13,0.4)]"> Cita</span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-2xl border border-[#FFD700]/30 shadow-[0_10px_20px_rgba(254,182,13,0.2)]">
            <ShieldCheck className="text-[#FFD700]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest">Pagina Segura Y Privada</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto w-full px-4 sm:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-grow">
        
        {/* TARJETA FORMULARIO */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-black rounded-[2rem] p-6 sm:p-12 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(254,182,13,0.25)] hover:-translate-y-2">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Cliente</label>
                  <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm transition-all focus:bg-white" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Teléfono</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm transition-all focus:bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Fecha (Lunes a Sábado)</label>
                  <input type="date" value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl outline-none font-bold text-sm focus:border-[#FEB60D] transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Hora (9:00 AM - 6:00 PM)</label>
                  <select value={formData.appointmentTime} onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl outline-none font-bold text-sm focus:border-[#FEB60D] transition-all">
                    <option value="">Seleccionar Franja</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/50 ml-1">Detalles del Proyecto</label>
                <textarea value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} required className="w-full bg-[#DCDCDC]/30 border border-black/10 p-5 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm h-32 resize-none transition-all focus:bg-white" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-6 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(254,182,13,0.4)]">
                {isSubmitting ? "Sincronizando..." : "Finalizar Agendamiento"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          {/* TARJETA ESPECIALISTA */}
          <div className="bg-white border border-black rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(254,182,13,0.2)]">
            <Briefcase className="text-[#FEB60D] mb-4" size={24} />
            <p className="text-[9px] font-black text-[#FEB60D] uppercase tracking-widest mb-1">Especialista</p>
            <h2 className="text-2xl font-black uppercase tracking-tight">{doctorFromFlow?.name || "Arquitecto SDT"}</h2>
            <p className="text-[10px] text-black/40 font-black uppercase tracking-widest">{doctorFromFlow?.specialization || "Senior Staff"}</p>
          </div>

          {/* TARJETA COSTO */}
          <div className="bg-black text-white rounded-[2rem] p-10 relative overflow-hidden border border-black transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(254,182,13,0.3)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEB60D]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="relative z-10 text-center lg:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD700] block mb-6">Costo del Servicio</span>
              <h3 className="text-2xl font-black uppercase mb-2 leading-none">
                {serviceFromFlow?.title || "Desarrollo a Medida"}
              </h3>
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col">
                <span className="text-[9px] font-black uppercase text-white/40 tracking-widest">Desde</span>
                <p className="text-5xl font-black text-[#FFD700] tracking-tighter mt-2 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                  {serviceFromFlow?.price || (doctorFromFlow?.ticketPrice ? `$ ${doctorFromFlow.ticketPrice}` : "$ 0")}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;