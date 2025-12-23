// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { 
  ChevronLeft, 
  CreditCard, 
  ShieldCheck, 
  Briefcase, 
  Info, 
  ArrowRight 
} from "lucide-react"; // CORREGIDO: de lucide-round a lucide-react

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

  // Recuperamos la data del flujo: Services -> Doctors -> Booking
  const doctorFromFlow = location.state?.doctorData;
  const serviceFromFlow = location.state?.selectedService; 
  
  const activeDoctorId = paramId || doctorFromFlow?._id;

  // Redirección de seguridad
  useEffect(() => {
    if (!userLoading && (!user || !token)) {
      toast.error("Debes iniciar sesión para agendar una cita.");
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, token, userLoading, navigate, location]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    reason: `Requerimiento para: ${serviceFromFlow?.title || "Consultoría Técnica"}.`,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica de horarios disponibles
  const availableTimes = useMemo(() => {
    if (!formData.appointmentDate) return [];
    const times = [];
    const [year, month, day] = formData.appointmentDate.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return []; 

    const now = new Date();
    const minTimeForToday = new Date(now.getTime() + 6 * 60 * 60 * 1000); 

    for (let hour = 9; hour <= 18; hour++) {
      for (let min of ["00", "30"]) {
        if (hour === 18 && min === "30") break;
        const timeStr = `${hour.toString().padStart(2, "0")}:${min}`;
        const appointmentDateTime = new Date(year, month - 1, day, hour, parseInt(min));
        if (appointmentDateTime > minTimeForToday) times.push(timeStr);
      }
    }
    return times;
  }, [formData.appointmentDate]);

  const getDoctor = async () => {
    if (doctorFromFlow) return doctorFromFlow;
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const res = await axios.get(`${apiUrl}/doctors/${activeDoctorId}`);
    return res.data.doctor || res.data;
  };

  const { data: doctor, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctor", activeDoctorId],
    queryFn: getDoctor,
    enabled: !!activeDoctorId && !!user,
  });

  // Sincronizar datos del usuario logueado
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || user.fullName || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone || "",
      }));
    }
  }, [user]);

  // Auto-seleccionar primer horario disponible
  useEffect(() => {
    if (availableTimes.length > 0 && !formData.appointmentTime) {
      setFormData(prev => ({ ...prev, appointmentTime: availableTimes[0] }));
    }
  }, [availableTimes, formData.appointmentTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Sesión expirada.");
    
    const finalDoctorId = doctor?._id || activeDoctorId;
    if (!finalDoctorId) return toast.error("Error: Especialista no identificado.");

    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      
      const payload = {
        doctorId: finalDoctorId,
        userId: user?._id || user?.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
        // Datos del servicio seleccionado en Services.jsx
        serviceName: serviceFromFlow?.title || doctor?.specialization || "Consultoría Software DT",
        price: serviceFromFlow?.price || doctor?.ticketPrice || "Cotización pendiente"
      };

      const res = await axios.post(`${apiUrl}/appointments`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success("¡Cita agendada con éxito!");
        navigate("/appointment-confirmation", { 
          state: { 
            appointment: res.data.appointment, 
            doctor: doctor,
            service: serviceFromFlow,
            userName: formData.fullName
          } 
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al procesar la reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || (doctorLoading && !doctor)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-[#FEB60D] rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="font-black uppercase tracking-widest text-[10px]">Iniciando Protocolo Seguro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DCDCDC] font-sans text-black antialiased flex flex-col">
      <header className="bg-white border-b-2 border-black/10 pt-6 pb-6 md:pt-10 md:pb-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FEB60D] transition-colors mb-4">
            <ChevronLeft size={14} /> Regresar
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FEB60D]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Software DT Secure Flow</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Reserva de <span className="text-[#FEB60D]">Servicio</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto w-full px-4 sm:px-6 lg:px-12 mt-6 mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-black rounded-[1.5rem] p-8 shadow-sm">
            <div className="w-12 h-12 bg-black text-[#FEB60D] rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={24} />
            </div>
            <p className="text-[9px] font-black text-[#FEB60D] uppercase tracking-widest mb-1">Ingeniero Asignado</p>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-3">{doctor?.name}</h2>
            <p className="text-sm font-bold leading-relaxed italic text-gray-500">
              "{doctor?.bio || "Especialista verificado para la implementación de soluciones Software DT."}"
            </p>
          </div>

          <div className="bg-black text-white rounded-[1.5rem] p-8 shadow-2xl border-t-8 border-[#FEB60D]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FEB60D]">Servicio Seleccionado</span>
              <ShieldCheck className="text-green-500" size={18} />
            </div>
            <h3 className="text-xl font-black uppercase text-[#FEB60D] mb-2">
              {serviceFromFlow?.title || "Consultoría General"}
            </h3>
            <p className="text-3xl font-black tracking-tighter text-[#FEB60D]">
              {serviceFromFlow?.price || doctor?.ticketPrice || "A convenir"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black rounded-[2.5rem] p-8 md:p-12 shadow-sm h-full">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Nombre Completo</label>
                  <input type="text" name="fullName" value={formData.fullName} readOnly className="w-full bg-gray-50 border-2 border-black/10 p-4 rounded-xl font-bold text-sm text-gray-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Teléfono de Contacto</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-white border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Fecha de Implementación</label>
                  <input type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-white border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Bloque Horario</label>
                  <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-white border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm appearance-none">
                    <option value="" disabled>Seleccione una hora...</option>
                    {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={18} className="text-[#FEB60D]" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Breve descripción del requerimiento</h3>
                </div>
                <textarea 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full bg-white border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-medium text-sm h-32 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || availableTimes.length === 0} 
                className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#FEB60D] hover:text-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Sincronizando con Servidor..." : "Confirmar y Agendar Implementación"}
                {!isSubmitting && <ArrowRight size={16} />}
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;