import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Briefcase, 
  Info, 
  ArrowRight,
  Clock
} from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

  const doctorFromFlow = location.state?.doctorData;
  const serviceFromFlow = location.state?.selectedService; 
  const activeDoctorId = paramId || doctorFromFlow?._id;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    reason: `Requerimiento para: ${serviceFromFlow?.title || "Consultoría Técnica"}. `,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userLoading && (!user || !token)) {
      toast.error("Acceso denegado. Por favor inicia sesión.");
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, token, userLoading, navigate, location]);

  const availableTimes = useMemo(() => {
    if (!formData.appointmentDate) return [];
    const times = [];
    const [year, month, day] = formData.appointmentDate.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    
    if (selectedDate.getDay() === 0) return [];

    const now = new Date();
    const minTimeAllowed = new Date(now.getTime() + 8 * 60 * 60 * 1000); 

    for (let hour = 9; hour <= 18; hour++) {
      for (let min of ["00", "30"]) {
        if (hour === 18 && min === "30") break;
        const timeStr = `${hour.toString().padStart(2, "0")}:${min}`;
        const appointmentDateTime = new Date(year, month - 1, day, hour, parseInt(min));

        if (appointmentDateTime > minTimeAllowed) times.push(timeStr);
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

  // CORRECCIÓN: Solo autocompletar si los campos están vacíos para permitir escritura
  useEffect(() => {
    if (user && !formData.fullName) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || user.fullName || "",
        email: user.email || "",
        phone: prev.phone || user.phone || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (availableTimes.length > 0 && !formData.appointmentTime) {
      setFormData(prev => ({ ...prev, appointmentTime: availableTimes[0] }));
    }
  }, [availableTimes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "appointmentDate") {
      const selected = new Date(value + "T00:00:00");
      if (selected.getDay() === 0) {
        toast.warning("Software DT no opera los domingos.");
        return;
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Sesión expirada.");
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        doctorId: doctor?._id || activeDoctorId,
        userId: user?._id || user?.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
        serviceName: serviceFromFlow?.title || doctor?.specialization || "Consultoría DT",
        price: serviceFromFlow?.price || doctor?.ticketPrice || "Cotización pendiente"
      };

      const res = await axios.post(`${apiUrl}/appointments`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        toast.success("Cita Sincronizada Correctamente.");
        navigate("/appointment-confirmation", { 
          state: { 
            appointment: res.data.appointment, 
            doctor, 
            service: serviceFromFlow, 
            userName: formData.fullName 
          } 
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error en el servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || (doctorLoading && !doctor)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-black border-t-gold rounded-full animate-spin"></div>
          <p className="font-black uppercase tracking-widest text-[10px]">Cifrando Conexión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main font-sans text-black antialiased flex flex-col">
      <header className="bg-white border-b-2 border-black/10 pt-8 pb-6 px-4 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-all mb-6">
            <ChevronLeft size={14} /> Regresar al listado
          </button>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-gold"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Protocolo de Reserva v2.1</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              Agendar <span className="text-gold">Servicio Técnico</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto w-full px-4 sm:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <div className="bg-white border-2 border-black rounded-[2rem] p-6 sm:p-8 shadow-sm">
            <div className="w-10 h-10 bg-black text-gold rounded-lg flex items-center justify-center mb-4">
              <Briefcase size={20} />
            </div>
            <p className="text-[8px] font-black text-gold uppercase tracking-widest mb-1">Ingeniero Asignado</p>
            <h2 className="text-xl font-black uppercase tracking-tight mb-2">{doctor?.name}</h2>
            <p className="text-xs font-bold leading-relaxed italic text-gray-500 line-clamp-3">
              "{doctor?.bio || "Consultor verificado para despliegues de Software DT."}"
            </p>
          </div>

          <div className="bg-black text-white rounded-[2rem] p-6 sm:p-8 border-t-8 border-gold shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-gold">Producto Seleccionado</span>
              <ShieldCheck className="text-green-500" size={16} />
            </div>
            <h3 className="text-lg font-black uppercase text-white mb-1 truncate">
              {serviceFromFlow?.title || "Consultoría General"}
            </h3>
            <p className="text-[10px] text-gray-400 uppercase mb-4 tracking-widest">
              {serviceFromFlow?.subtitle || "Software a medida"}
            </p>
            <div className="w-full h-[1px] bg-white/10 mb-4"></div>
            <p className="text-2xl font-black tracking-tighter text-gold">
              {serviceFromFlow?.price || doctor?.ticketPrice || "Pendiente"}
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2">
          <div className="bg-white border-2 border-black rounded-[2rem] p-6 sm:p-10 shadow-sm h-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Nombre del Solicitante</label>
                  <input type="text" value={formData.fullName} readOnly className="w-full bg-gray-50 border-2 border-black/10 p-3 rounded-xl font-bold text-xs cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Teléfono Directo</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    required 
                    placeholder="Ej: +57 300..." 
                    className="w-full bg-white border-2 border-black p-3 rounded-xl focus:border-gold outline-none font-bold text-xs" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Fecha de Implementación (L-S)</label>
                  <input 
                    type="date" 
                    name="appointmentDate" 
                    min={new Date().toISOString().split("T")[0]} 
                    value={formData.appointmentDate} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full bg-white border-2 border-black p-3 rounded-xl focus:border-gold outline-none font-bold text-xs" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Bloque Horario (Anticipación 8h)</label>
                  <div className="relative">
                    <select 
                      name="appointmentTime" 
                      value={formData.appointmentTime} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full bg-white border-2 border-black p-3 rounded-xl focus:border-gold outline-none font-bold text-xs appearance-none"
                    >
                      {availableTimes.length === 0 ? (
                        <option value="">No hay slots disponibles</option>
                      ) : (
                        availableTimes.map(t => <option key={t} value={t}>{t}</option>)
                      )}
                    </select>
                    <Clock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Info size={14} className="text-gold" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Especificaciones del Proyecto</h3>
                </div>
                <textarea 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleInputChange} 
                  required 
                  placeholder="Describa su necesidad..."
                  className="w-full bg-white border-2 border-black p-4 rounded-xl focus:border-gold outline-none font-medium text-xs h-32 resize-none" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || availableTimes.length === 0} 
                className="w-full bg-black text-white py-4 sm:py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all shadow-lg disabled:opacity-40 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? "Procesando..." : "Confirmar y Agendar"}
                <ArrowRight size={14} />
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