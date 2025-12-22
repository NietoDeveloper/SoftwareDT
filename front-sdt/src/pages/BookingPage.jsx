import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { Calendar, Clock, User, Phone, Mail, FileText, ChevronLeft } from "lucide-react";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  // PRIORIDAD AL FLUJO: Capturamos la data enviada desde Services.jsx
  const serviceFromFlow = location.state?.doctorData;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica de horarios (Software DT Business Hours)
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
        if (appointmentDateTime > minTimeForToday) {
          times.push(timeStr);
        }
      }
    }
    return times;
  }, [formData.appointmentDate]);

  // Si no viene del flujo, hacemos fetch (Fallback)
  const getDoctor = async () => {
    if (serviceFromFlow) return serviceFromFlow;
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const res = await axios.get(`${apiUrl}/doctors/${doctorId}`);
    return res.data.doctor || res.data;
  };

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: getDoctor,
    enabled: !!doctorId,
    initialData: serviceFromFlow, // Usamos la data del flujo inmediatamente
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
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
    if (!formData.appointmentTime || !formData.appointmentDate) {
      return toast.error("Selecciona fecha y hora.");
    }

    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        doctorId: doctor._id,
        userId: user?._id || null,
        serviceName: doctor.name, // Importante para el Roadmap del cliente
        ...formData,
      };

      const res = await axios.post(`${apiUrl}/appointments`, payload);
      toast.success("Cita agendada correctamente");

      navigate("/appointment-confirmation", { 
        state: { appointment: res.data, doctorName: doctor.name } 
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al procesar la cita");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] font-black uppercase tracking-[0.3em] animate-pulse">Sincronizando Entorno...</div>;

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      {/* HEADER DE LA PÁGINA */}
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-6 sm:px-12 shadow-[0_4px_30px_rgba(255,215,0,0.05)]">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FFD700] transition-colors mb-6">
            <ChevronLeft size={14} /> Volver
          </button>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-[#FFD700]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Booking System</span>
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                Agendar <span className="text-[#FFD700]">Cita</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* RESUMEN DEL SERVICIO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 shadow-sm">
            <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(255,215,0,0.2)]">
               <User size={30} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{doctor?.name}</h2>
            <p className="text-[10px] font-black text-[#FEB60D] uppercase tracking-[0.2em] mt-1 mb-6">{doctor?.specialization}</p>
            <div className="h-[2px] bg-[#DCDCDC] w-12 mb-6"></div>
            <p className="text-sm font-medium leading-relaxed italic text-gray-600">
              "{doctor?.bio || "Especialista disponible para tu proyecto."}"
            </p>
          </div>
        </div>

        {/* FORMULARIO DE AGENDAMIENTO */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <User size={12} className="text-[#FFD700]"/> Nombre Completo
                  </label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Mail size={12} className="text-[#FFD700]"/> Correo Electrónico
                  </label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none transition-all font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Phone size={12} className="text-[#FFD700]"/> Teléfono
                  </label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Calendar size={12} className="text-[#FFD700]"/> Fecha
                  </label>
                  <input type="date" name="appointmentDate" min={todayStr} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Clock size={12} className="text-[#FFD700]"/> Hora
                  </label>
                  <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none transition-all font-bold appearance-none">
                    <option value="">{formData.appointmentDate ? "Seleccionar..." : "Primero elige fecha"}</option>
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <FileText size={12} className="text-[#FFD700]"/> Motivo del Requerimiento
                </label>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full bg-[#DCDCDC]/20 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none transition-all font-bold h-32 resize-none" placeholder="Describe brevemente el servicio solicitado..." />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFD700] hover:text-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(255,215,0,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? "Sincronizando..." : "Confirmar y Agendar"}
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