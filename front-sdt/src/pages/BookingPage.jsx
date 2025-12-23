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
} from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

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
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica de horarios Software DT
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
    initialData: doctorFromFlow,
  });

  // Sincronizar datos del usuario silenciosamente para el payload
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || user.fullName || "",
        email: user.email || "",
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "appointmentDate") {
      setFormData((prev) => ({ ...prev, [name]: value, appointmentTime: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Sesión expirada.");
    if (!doctor?._id) return toast.error("Error: Información incompleta.");

    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        doctorId: doctor._id,
        userId: user?._id,
        serviceName: serviceFromFlow?.title || serviceFromFlow?.name || doctor.specialization,
        price: serviceFromFlow?.price || "Por definir",
        ...formData,
      };

      const res = await axios.post(`${apiUrl}/appointments`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("¡Cita agendada con éxito!");
      navigate("/appointment-confirmation", { 
        state: { 
          appointment: res.data.appointment || res.data, 
          doctorName: doctor.name,
          serviceName: payload.serviceName,
          price: payload.price
        } 
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al procesar la reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || (doctorLoading && !doctorFromFlow)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-[#FEB60D] rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="font-black uppercase tracking-widest text-[10px]">Sincronizando Entorno Seguro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      <div className="bg-white border-b-2 border-black/10 pt-12 pb-10 px-6 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FEB60D] transition-colors mb-6">
            <ChevronLeft size={14} /> Regresar
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FEB60D]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Software DT Secure Flow</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              Reserva de <span className="text-[#FEB60D]">Servicio</span>
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-black rounded-[2rem] p-8 shadow-sm">
            <div className="w-14 h-14 bg-black text-[#FEB60D] rounded-xl flex items-center justify-center mb-6 shadow-md">
              <Briefcase size={28} />
            </div>
            <p className="text-[9px] font-black text-[#FEB60D] uppercase tracking-widest mb-1">Especialista SDT</p>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">{doctor?.name}</h2>
            <div className="h-[2px] bg-[#DCDCDC] w-12 mb-4"></div>
            <p className="text-sm font-bold leading-relaxed italic text-gray-500 italic">
              "{doctor?.bio || "Ingeniero verificado para implementación de soluciones DT."}"
            </p>
          </div>

          <div className="bg-black text-white rounded-[2rem] p-8 shadow-2xl border-t-8 border-[#FEB60D]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FEB60D]">Resumen de Inversión</span>
              <ShieldCheck className="text-green-500" size={20} />
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[9px] uppercase text-gray-400 font-black">Servicio</p>
                <h3 className="text-xl font-black uppercase text-[#FEB60D]">
                  {serviceFromFlow?.title || serviceFromFlow?.name || "Consultoría"}
                </h3>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[9px] uppercase text-gray-400 font-black">Inversión Base</p>
                <p className="text-3xl font-black tracking-tighter">
                  {serviceFromFlow?.price || "A convenir"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORMULARIO SIMPLIFICADO */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Sección Logística */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} className="text-[#FEB60D]" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Planificación de la Cita</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Teléfono de Contacto</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/10 border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm" placeholder="Tu móvil..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Fecha Preferente</label>
                    <input type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/10 border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 ml-1">Bloque Horario</label>
                    <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/10 border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm appearance-none">
                      <option value="">{formData.appointmentDate ? "Elegir..." : "Pendiente"}</option>
                      {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección Motivo */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <Info size={18} className="text-[#FEB60D]" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Especificaciones Técnicas</h3>
                </div>
                <textarea 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleInputChange} 
                  required 
                  minLength={10} 
                  className="w-full bg-[#DCDCDC]/10 border-2 border-black p-4 rounded-xl focus:border-[#FEB60D] outline-none font-medium text-sm h-40 resize-none" 
                  placeholder="Describe brevemente el requerimiento o problema técnico a resolver..." 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !formData.appointmentTime} 
                className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FEB60D] hover:text-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isSubmitting ? "Sincronizando Entorno..." : "Finalizar y Agendar Servicio"}
                {!isSubmitting && <ArrowRight size={18} />}
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