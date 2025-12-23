// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { User, ChevronLeft, CreditCard, ShieldCheck } from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

  // DATA DEL FLUJO ANTERIOR
  const doctorFromFlow = location.state?.doctorData;
  const serviceFromFlow = location.state?.serviceData; // Capturamos el servicio (nombre, precio, etc.)
  
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
    if (!token) return toast.error("Sesión expirada.");
    if (!doctor?._id) return toast.error("Error: Información incompleta.");

    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        doctorId: doctor._id,
        userId: user?._id,
        // Usamos el nombre del servicio que viene del flujo anterior o la especialidad del doctor
        serviceName: serviceFromFlow?.name || doctor.specialization,
        price: serviceFromFlow?.price || "Consultar",
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
          serviceName: payload.serviceName
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
          <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="font-black uppercase tracking-widest text-[10px]">Sincronizando Entorno Seguro...</p>
        </div>
      </div>
    );
  }

  if (!user || !token) return null;

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-6 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FFD700] transition-colors mb-6">
            <ChevronLeft size={14} /> Regresar al Staff
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FFD700]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Software DT Secure Flow</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              Reserva de <span className="text-[#FFD700]">Servicio</span>
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* SIDEBAR: INFO DEL DOCTOR Y PRECIO */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 shadow-sm">
            <div className="w-16 h-16 bg-black text-[#FFD700] rounded-2xl flex items-center justify-center mb-6 shadow-md">
               <User size={30} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{doctor?.name}</h2>
            <p className="text-[10px] font-black text-[#FEB60D] uppercase tracking-[0.2em] mt-1 mb-6">{doctor?.specialization}</p>
            <div className="h-[2px] bg-[#DCDCDC] w-12 mb-6"></div>
            <p className="text-sm font-bold leading-relaxed italic text-gray-500">
              "{doctor?.bio || "Ingeniero verificado para implementación de soluciones DT."}"
            </p>
          </div>

          {/* CARD DE PRECIO Y SERVICIO SELECCIONADO */}
          <div className="bg-black text-white rounded-[2.5rem] p-8 shadow-xl border-t-4 border-[#FFD700]">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="text-[#FFD700]" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Resumen de Inversión</span>
            </div>
            <h3 className="text-xl font-black uppercase text-[#FFD700] mb-1">
              {serviceFromFlow?.name || "Consultoría Técnica"}
            </h3>
            <p className="text-3xl font-black tracking-tighter mb-4">
              {serviceFromFlow?.price || "A convenir"}
            </p>
            <div className="flex items-center gap-2 text-[9px] text-gray-400 uppercase font-black">
              <ShieldCheck size={12} className="text-green-500" /> 
              Tarifa protegida por Software DT
            </div>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Usuario Activo</label>
                  <input type="text" name="fullName" value={formData.fullName} readOnly className="w-full bg-[#DCDCDC]/50 border-2 border-black/5 p-4 rounded-xl font-black text-xs uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Canal de Contacto</label>
                  <input type="email" name="email" value={formData.email} readOnly className="w-full bg-[#DCDCDC]/50 border-2 border-black/5 p-4 rounded-xl font-bold text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Teléfono</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha de Inicio</label>
                  <input type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Bloque Horario</label>
                  <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold appearance-none">
                    <option value="">{formData.appointmentDate ? "Elegir..." : "Elige fecha"}</option>
                    {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Especificaciones del Requerimiento</label>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full bg-[#DCDCDC]/30 border-2 border-black/5 p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold h-32 resize-none" placeholder="Indica detalles técnicos o dudas sobre el servicio..." />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !formData.appointmentTime} 
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFD700] hover:text-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] disabled:opacity-50"
              >
                {isSubmitting ? "Sincronizando con Servidor..." : "Finalizar y Agendar Cita"}
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