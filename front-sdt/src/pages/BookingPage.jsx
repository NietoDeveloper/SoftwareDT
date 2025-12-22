import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { Calendar, Clock, User, Phone, Mail, FileText, ChevronLeft } from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext); // Agregamos token y loading del contexto

  // PRIORIDAD 1: SEGURIDAD DE ACCESO
  // Si no hay usuario ni token tras cargar el contexto, redirigimos a login
  useEffect(() => {
    if (!userLoading && (!user || !token)) {
      toast.error("Debes iniciar sesión para agendar una cita.");
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, token, userLoading, navigate, location]);

  const serviceFromFlow = location.state?.doctorData;
  const activeDoctorId = paramId || serviceFromFlow?._id;

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

  const getDoctor = async () => {
    if (serviceFromFlow) return serviceFromFlow;
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const res = await axios.get(`${apiUrl}/doctors/${activeDoctorId}`);
    return res.data.doctor || res.data;
  };

  const { data: doctor, isLoading: doctorLoading, error } = useQuery({
    queryKey: ["doctor", activeDoctorId],
    queryFn: getDoctor,
    enabled: !!activeDoctorId && !!user, // Solo corre si hay usuario
    initialData: serviceFromFlow,
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
    
    // PRIORIDAD 2: SEGURIDAD DE ENVÍO
    if (!token) {
      return toast.error("Sesión expirada. Por favor ingresa de nuevo.");
    }

    if (!doctor?._id) {
      return toast.error("Error: Información del servicio incompleta.");
    }

    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        doctorId: doctor._id,
        userId: user?._id,
        serviceName: doctor.name,
        ...formData,
      };

      // Incluimos el token en las cabeceras para el backend
      const res = await axios.post(`${apiUrl}/appointments`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("¡Cita agendada con éxito!");
      navigate("/appointment-confirmation", { 
        state: { 
          appointment: res.data.appointment || res.data, 
          doctorName: doctor.name 
        } 
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "No se pudo procesar la reserva.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pantalla de carga unificada
  if (userLoading || (doctorLoading && !serviceFromFlow)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="font-black uppercase tracking-widest text-xs">Sincronizando Entorno Seguro...</p>
        </div>
      </div>
    );
  }

  // Si no hay sesión, no renderizamos el formulario (el useEffect hará el redirect)
  if (!user || !token) return null;

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-6 sm:px-12 shadow-sm">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FFD700] transition-colors mb-6">
            <ChevronLeft size={14} /> Regresar
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FFD700]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Software DT Secure Booking</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              Configurar <span className="text-[#FFD700]">Cita</span>
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 sticky top-12 shadow-sm">
            <div className="w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center mb-6 shadow-md">
               <User size={30} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{doctor?.name}</h2>
            <p className="text-[10px] font-black text-[#FEB60D] uppercase tracking-[0.2em] mt-1 mb-6">{doctor?.specialization}</p>
            <div className="h-[2px] bg-[#DCDCDC] w-12 mb-6"></div>
            <p className="text-sm font-bold leading-relaxed italic text-gray-500">
              "{doctor?.bio || "Especialista verificado por Software DT."}"
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tu Nombre de Usuario</label>
                  <input type="text" name="fullName" value={formData.fullName} readOnly className="w-full bg-[#DCDCDC]/50 border-2 border-black/5 p-4 rounded-xl font-bold cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Correo Registrado</label>
                  <input type="email" name="email" value={formData.email} readOnly className="w-full bg-[#DCDCDC]/50 border-2 border-black/5 p-4 rounded-xl font-bold cursor-not-allowed" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Teléfono</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha</label>
                  <input type="date" name="appointmentDate" min={todayStr} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Hora</label>
                  <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold appearance-none">
                    <option value="">{formData.appointmentDate ? "Elegir..." : "Primero fecha"}</option>
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Motivo de la Cita</label>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold h-32 resize-none" placeholder="Describe tu requerimiento..." />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !formData.appointmentTime} 
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFD700] hover:text-black transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? "Sincronizando Cita..." : "Confirmar y Agendar"}
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