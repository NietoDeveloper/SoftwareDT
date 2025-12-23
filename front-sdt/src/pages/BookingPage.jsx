// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { User, ChevronLeft, CreditCard, ShieldCheck, Briefcase, Info } from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

  // DATA UNIFICADA DEL FLUJO (Servicio + Doctor)
  const doctorFromFlow = location.state?.doctorData;
  const serviceFromFlow = location.state?.selectedService; 
  
  const activeDoctorId = paramId || doctorFromFlow?._id;

  // Redirección de seguridad: Si no hay sesión iniciada
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

  // Lógica de horarios Software DT (Lun-Vie, 9am-6pm)
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

  // Autocompletar datos del cliente desde el contexto
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
          <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="font-black uppercase tracking-widest text-[10px]">Sincronizando Entorno Seguro...</p>
        </div>
      </div>
    );
  }

  if (!user || !token) return null;

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      {/* Header unificado */}
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-6 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FFD700] transition-colors mb-6">
            <ChevronLeft size={14} /> Regresar
          </button>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FFD700]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Checkout de Servicio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
              Configura tu <span className="text-[#FFD700]">Cita Técnica</span>
            </h1>
          </div>
        </div>
      </div>

      <main className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Resumen del Servicio e Ingeniero */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Info del Profesional */}
          <div className="bg-white border-2 border-black rounded-[2rem] p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-14 h-14 bg-black text-[#FFD700] rounded-xl flex items-center justify-center shadow-md">
                 <Briefcase size={24} />
               </div>
               <div>
                 <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Ingeniero Asignado</p>
                 <h2 className="text-xl font-black uppercase leading-tight">{doctor?.name}</h2>
               </div>
            </div>
            <p className="text-xs font-bold text-gray-500 leading-relaxed italic">
              "{doctor?.bio || "Especialista senior en soluciones tecnológicas."}"
            </p>
          </div>

          {/* Factura Visual / Resumen de Inversión */}
          <div className="bg-black text-white rounded-[2rem] p-8 shadow-2xl border-t-8 border-[#FFD700]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD700]">Detalle de Inversión</span>
              <ShieldCheck className="text-green-500" size={20} />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[9px] uppercase text-gray-400 font-black">Servicio seleccionado</p>
                <h3 className="text-lg font-black uppercase">{serviceFromFlow?.title || "Consultoría General"}</h3>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-[9px] uppercase text-gray-400 font-black">Inversión base</p>
                <p className="text-3xl font-black text-[#FFD700] tracking-tighter">
                  {serviceFromFlow?.price || "A convenir"}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
              <Info size={14} className="text-[#FFD700] mt-0.5 shrink-0" />
              <p className="text-[9px] leading-tight text-gray-300 font-medium">
                Al agendar, el ingeniero reservará su agenda exclusivamente para su proyecto.
              </p>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Datos del Cliente y Formulario de Cita */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-black rounded-[2.5rem] p-8 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Sección 1: Datos del Solicitante */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={18} className="text-[#FEB60D]" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Datos del Solicitante</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Nombre Completo</label>
                    <input type="text" name="fullName" value={formData.fullName} readOnly className="w-full bg-[#DCDCDC]/40 border-2 border-black/5 p-4 rounded-xl font-black text-xs uppercase cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Email de Registro</label>
                    <input type="email" name="email" value={formData.email} readOnly className="w-full bg-[#DCDCDC]/40 border-2 border-black/5 p-4 rounded-xl font-bold text-xs cursor-not-allowed" />
                  </div>
                </div>
              </div>

              <hr className="border-black/5" />

              {/* Sección 2: Logística de la Cita */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard size={18} className="text-[#FEB60D]" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Agenda y Contacto</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Teléfono Móvil</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold text-sm" placeholder="Ej: 300..." />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Fecha Preferente</label>
                    <input type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Bloque Horario</label>
                    <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full bg-[#DCDCDC]/20 border-2 border-black p-4 rounded-xl focus:border-[#FFD700] outline-none font-bold text-sm appearance-none">
                      <option value="">{formData.appointmentDate ? "Seleccionar..." : "Pendiente fecha"}</option>
                      {availableTimes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Sección 3: Requerimientos */}
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Resumen del Requerimiento / Proyecto</label>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full bg-[#DCDCDC]/20 border-2 border-black p-4 rounded-xl focus:border-[#FFD700] outline-none font-medium text-sm h-28 resize-none" placeholder="Cuéntanos un poco más sobre lo que necesitas implementar..." />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || !formData.appointmentTime} 
                className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#FFD700] hover:text-black transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSubmitting ? "Sincronizando..." : "Confirmar y Agendar Ahora"}
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