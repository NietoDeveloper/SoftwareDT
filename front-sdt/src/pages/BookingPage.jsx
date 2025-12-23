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

  // FORMULARIO CON DATOS PRE-LLENADOS
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "3000000000", // Teléfono por defecto
    appointmentDate: new Date().toISOString().split("T")[0], // Fecha de hoy por defecto
    appointmentTime: "",
    reason: "Requerimiento técnico para implementación de soluciones Software DT.", // Motivo por defecto
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

  // Sincronizar usuario y seleccionar el primer horario disponible automáticamente
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

  // Auto-seleccionar primer horario disponible si el campo está vacío
  useEffect(() => {
    if (availableTimes.length > 0 && !formData.appointmentTime) {
      setFormData(prev => ({ ...prev, appointmentTime: availableTimes[0] }));
    }
  }, [availableTimes, formData.appointmentTime]);

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
      const appointmentData = res.data.appointment || res.data;
      toast.success("¡Cita agendada con éxito!");
      navigate("/appointment-confirmation", { 
        state: { 
          appointment: appointmentData, 
          doctor: doctor,
          service: serviceFromFlow,
          userName: formData.fullName,
          confirmedAt: new Date().toISOString()
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
    <div className="min-h-screen bg-[#DCDCDC] font-sans text-black antialiased flex flex-col">
      {/* Header - Optimizado 310px a 1800px */}
      <header className="bg-white border-b-2 border-black/10 pt-6 pb-6 md:pt-10 md:pb-8 px-4 sm:px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FEB60D] transition-colors mb-4">
            <ChevronLeft size={14} /> Regresar
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-6 md:w-8 h-1 bg-[#FEB60D]"></div>
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Software DT Secure Flow</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              Reserva de <span className="text-[#FEB60D]">Servicio</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto w-full px-4 sm:px-6 lg:px-12 mt-6 mb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-grow">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6">
          <div className="bg-white border-2 border-black rounded-[1.5rem] p-6 md:p-8 shadow-sm">
            <div className="w-12 h-12 bg-black text-[#FEB60D] rounded-xl flex items-center justify-center mb-4 shadow-md">
              <Briefcase size={24} />
            </div>
            <p className="text-[8px] md:text-[9px] font-black text-[#FEB60D] uppercase tracking-widest mb-1">Especialista SDT</p>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3">{doctor?.name}</h2>
            <div className="h-[2px] bg-[#DCDCDC] w-10 mb-3"></div>
            <p className="text-xs md:text-sm font-bold leading-relaxed italic text-gray-500">
              "{doctor?.bio || "Ingeniero verificado para implementación de soluciones DT."}"
            </p>
          </div>

          <div className="bg-black text-white rounded-[1.5rem] p-6 md:p-8 shadow-2xl border-t-4 md:border-t-8 border-[#FEB60D]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#FEB60D]">Inversión</span>
              <ShieldCheck className="text-green-500" size={18} />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-black uppercase text-[#FEB60D]">
                {serviceFromFlow?.title || serviceFromFlow?.name || "Consultoría General"}
              </h3>
              <p className="text-2xl md:text-3xl font-black tracking-tighter text-[#FEB60D]">
                {serviceFromFlow?.price || "A convenir"}
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO - PRE-LLENADO */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black rounded-[1.5rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-sm h-full">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} className="text-[#FEB60D]" />
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest">Planificación</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400">Teléfono</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/10 border-2 border-black p-3 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400">Fecha</label>
                    <input type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/10 border-2 border-black p-3 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-400">Horario</label>
                    <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/10 border-2 border-black p-3 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-sm appearance-none">
                      {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={18} className="text-[#FEB60D]" />
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest">Proyecto</h3>
                </div>
                <textarea 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleInputChange} 
                  required 
                  minLength={10} 
                  className="w-full bg-[#DCDCDC]/10 border-2 border-black p-3 rounded-xl focus:border-[#FEB60D] outline-none font-medium text-sm h-32 md:h-40 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !formData.appointmentTime} 
                className="w-full bg-black text-white py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#FEB60D] hover:text-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Sincronizando..." : "Confirmar y Agendar Cita"}
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