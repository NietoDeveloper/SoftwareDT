import { useParams, useNavigate, useLocation } from "react-router-dom"; // Añadido useLocation
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Capturamos el estado enviado desde Services.jsx
  const { user } = useContext(UserContext);

  // Extraemos el servicio seleccionado si existe
  const selectedService = location.state?.selectedService;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: selectedService ? `Interés en: ${selectedService.name}` : "", // Pre-rellenado con el servicio
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica de generación de horarios (Sin cambios)
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
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${apiUrl}/doctors/${doctorId}`);
      return res.data.doctor || res.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Error al obtener datos del consultor";
      toast.error(msg);
      throw error;
    }
  };

  const { data: doctor, error, isLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: getDoctor,
    enabled: !!doctorId,
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

  const handleSendEmails = async (appointmentData) => {
    console.log("📧 Preparando envío de correos con servicio:", selectedService?.name);
    return true;
  };

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
      toast.error("Por favor selecciona una fecha y hora válida.");
      return;
    }
    if (formData.reason.length < 10) {
      toast.error("El motivo debe tener al menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const payload = {
        doctorId: doctor._id,
        userId: user?._id || null,
        serviceId: selectedService?.id, // Enviamos el ID del servicio de Software DT
        ...formData,
      };

      const res = await axios.post(`${apiUrl}/appointments`, payload);
      const appointmentCreated = res.data;

      await handleSendEmails(payload);
      toast.success("¡Cita agendada con éxito!");

      navigate("/appointment-confirmation", { 
        state: { 
          appointment: appointmentCreated,
          doctorName: doctor.name,
          serviceName: selectedService?.name // Pasamos el nombre a la confirmación
        } 
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Error en la reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen font-bold text-black uppercase tracking-widest">Cargando detalles del consultor...</div>;

  if (error || !doctor) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-red-500 font-bold text-xl uppercase">Error al cargar el consultor.</h1>
      <button onClick={() => navigate("/services")} className="mt-4 border-2 border-black px-6 py-2 rounded-lg hover:bg-gold transition-all font-bold uppercase text-xs">Volver a Servicios</button>
    </div>
  );

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col bg-main text-black">
      <main className="flex-grow">
        <div className="mx-auto px-4 py-12 max-w-screen-xl">
          <h1 className="text-4xl font-extrabold text-center mb-2 uppercase tracking-tighter">
            Reservar <span className="text-gold">Consultoría</span>
          </h1>
          <p className="text-center text-black mb-12 uppercase tracking-widest text-xs font-bold opacity-60">Software DT - Bogotá</p>

          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
            {/* Info Card - Ajustada para mostrar el servicio seleccionado */}
            <div className="group bg-card p-8 rounded-lg shadow-lg border border-gray-100 transition-all hover:border-gold w-full lg:max-w-[400px]">
                <h2 className="text-3xl font-bold mb-2 text-headingColor">Experto: {doctor.name}</h2>
                <p className="text-gold font-black uppercase text-sm mb-6">{doctor.specialization}</p>
                
                {selectedService && (
                  <div className="mb-6 p-4 bg-main rounded-lg border-l-4 border-gold">
                    <p className="text-xs font-bold uppercase opacity-50">Servicio de interés:</p>
                    <p className="font-bold text-lg leading-tight">{selectedService.name}</p>
                  </div>
                )}

                <div className="h-px bg-black opacity-10 w-full mb-8"></div>
                <p className="italic mb-8 text-textColor">"{doctor.bio || "Consultoría técnica para el desarrollo de tu proyecto digital."}"</p>
                <div className="text-center">
                    <p className="text-2xl font-black text-black">⭐ {doctor.totalRating || '5.0'}</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg border border-gray-100 w-full lg:max-w-[600px]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase">Nombre Completo</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border-2 border-main p-4 rounded-lg focus:border-gold outline-none transition-colors" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase">Correo</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border-2 border-main p-4 rounded-lg focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase">Teléfono</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border-2 border-main p-4 rounded-lg focus:border-gold outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase">Fecha</label>
                    <input type="date" name="appointmentDate" min={todayStr} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full border-2 border-main p-4 rounded-lg focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase">Hora</label>
                    <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required disabled={!formData.appointmentDate || availableTimes.length === 0} className="w-full border-2 border-main p-4 rounded-lg focus:border-gold outline-none disabled:opacity-30">
                      <option value="">{formData.appointmentDate ? "Selecciona hora" : "Elige fecha"}</option>
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 uppercase">Cuéntanos más de tu proyecto</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full border-2 border-main p-4 rounded-lg h-32 resize-none focus:border-gold outline-none" placeholder="Describe brevemente qué necesitas..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.appointmentTime} 
                  className={`w-full py-5 rounded-lg font-black text-xl uppercase tracking-widest border-2 border-black transition-all ${isSubmitting ? 'bg-gray-200' : 'bg-gold hover:bg-yellowColor'}`}
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Cita Técnica"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;