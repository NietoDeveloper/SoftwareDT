/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosPrivate } from "../API/api.js"; // Inyección de instancia blindada
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { 
  ChevronLeft, 
  Briefcase, 
  ArrowRight
} from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

  const doctorFromFlow = location.state?.doctorData;
  const serviceFromFlow = location.state?.serviceData; 
  const activeDoctorId = paramId || doctorFromFlow?._id;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    reason: `Requerimiento para: ${serviceFromFlow?.name || serviceFromFlow?.title || "Consultoría Técnica"}. `,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Protección de Ruta y Flujo
  useEffect(() => {
    if (!userLoading && (!user || !token)) {
      toast.error("Acceso denegado. Por favor inicia sesión.");
      navigate("/login", { state: { from: location.pathname } });
    }
    // Si no hay doctor ni servicio, el flujo está roto
    if (!activeDoctorId && !doctorFromFlow) {
      toast.info("Por favor seleccione un especialista primero.");
      navigate("/doctors");
    }
  }, [user, token, userLoading, navigate, location, activeDoctorId, doctorFromFlow]);

  // 2. Cálculo de horarios disponibles (Lógica de Negocio DT)
  const availableTimes = useMemo(() => {
    if (!formData.appointmentDate) return [];
    const times = [];
    const [year, month, day] = formData.appointmentDate.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    
    if (selectedDate.getDay() === 0) return []; // Software DT no opera domingos

    const now = new Date();
    // Margen de 8 horas para agendamiento
    const minTimeAllowed = new Date(now.getTime() + 8 * 60 * 60 * 1000); 

    for (let hour = 9; hour <= 18; hour++) {
      for (let min of ["00", "30"]) {
        if (hour === 18 && min === "30") break;
        const timeStr = `${hour.toString().padStart(2, "0")}:${min}`;
        const apptDT = new Date(year, month - 1, day, hour, parseInt(min));

        if (apptDT > minTimeAllowed) times.push(timeStr);
      }
    }
    return times;
  }, [formData.appointmentDate]);

  // 3. Obtención de datos del especialista
  const { data: doctor, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctor", activeDoctorId],
    queryFn: async () => {
      if (doctorFromFlow) return doctorFromFlow;
      const res = await axiosPrivate.get(`/doctors/${activeDoctorId}`);
      return res.data.doctor || res.data;
    },
    enabled: !!activeDoctorId && !!user,
  });

  // 4. Auto-completado de perfil (Hydration)
  useEffect(() => {
    if (user && !formData.fullName) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || user.fullName || "",
        email: user.email || "",
        phone: user.phone || prev.phone || "",
      }));
    }
  }, [user]);

  // 5. Manejo de Envío (Sincronización con Datacenter)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Error de sesión. Reintente.");
    if (!formData.appointmentTime) return toast.warning("Seleccione una hora válida.");
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        doctorId: doctor?._id || activeDoctorId,
        serviceName: serviceFromFlow?.name || serviceFromFlow?.title || "Servicio General",
        slotDate: formData.appointmentDate,
        slotTime: formData.appointmentTime,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        price: serviceFromFlow?.price || doctor?.ticketPrice || "Cotización pendiente"
      };

      // USAMOS axiosPrivate: Esto maneja el token malformado o expirado automáticamente
      const res = await axiosPrivate.post(`/appointments`, payload);

      if (res.data.success) {
        toast.success("Cita Sincronizada en Datacenter.");
        navigate("/client-appointments"); 
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Error al conectar con el servidor de citas.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading || (doctorLoading && !doctor)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main">
        <div className="w-10 h-10 border-4 border-black border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main font-sans text-black antialiased flex flex-col">
      <header className="bg-white border-b border-black/5 pt-10 pb-6 px-4 sm:px-12">
        <div className="max-w-[1800px] mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-all mb-4">
            <ChevronLeft size={14} /> Volver a selección
          </button>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            Confirmar <span className="text-gold">Cita</span>
          </h1>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto w-full px-4 sm:px-12 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Formulario de Reserva */}
        <div className="lg:col-span-8 order-1">
          <div className="bg-white border border-black/5 rounded-[2rem] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Nombre del Solicitante</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required className="w-full bg-main/30 border border-black/10 p-4 rounded-xl focus:border-gold outline-none font-bold text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Teléfono</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="w-full bg-main/30 border border-black/10 p-4 rounded-xl focus:border-gold outline-none font-bold text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Fecha de Cita</label>
                  <input type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})} required className="w-full bg-main/30 border border-black/10 p-4 rounded-xl focus:border-gold outline-none font-bold text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Hora Disponible</label>
                  <select name="appointmentTime" value={formData.appointmentTime} onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})} required className="w-full bg-main/30 border border-black/10 p-4 rounded-xl focus:border-gold outline-none font-bold text-sm appearance-none">
                    <option value="">Seleccione hora</option>
                    {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Notas del Proyecto / Requerimiento</label>
                <textarea name="reason" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} required className="w-full bg-main/30 border border-black/10 p-4 rounded-xl focus:border-gold outline-none font-medium text-sm h-32 resize-none" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-black text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sincronizando Datacenter..." : "Finalizar Agendamiento"}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
-[9px] font-black uppercase tracking-widest text-gold block mb-4">Servicio Digital</span>
            <h3 className="text-xl font-black uppercase mb-2">
              {serviceFromFlow?.name || serviceFromFlow?.title || "Consultoría Técnica"}
            </h3>
            <div className="h-1 w-12 bg-gold mb-4"></div>
            <p className="text-3xl font-black text-gold tracking-tighter">
              {serviceFromFlow?.price || (doctor?.ticketPrice ? `$${doctor.ticketPrice}` : "Bajo Cotización")}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};

export default BookingPage;