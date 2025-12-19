import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lógica de generación de horarios (mejorada para claridad)
  const availableTimes = useMemo(() => {
    if (!formData.appointmentDate) return [];
    const times = [];
    const [year, month, day] = formData.appointmentDate.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) return []; // Agregué sábado también, asumiendo no trabajan fines de semana

    const now = new Date();
    const minTimeForToday = new Date(now.getTime() + 6 * 60 * 60 * 1000); // 6 horas antelación

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
      const msg = error.response?.data?.message || "Error al obtener datos del doctor";
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
        userId: user?._id || null, // Agregado: userId si logueado, sino null para guest
        ...formData,
      };
      const res = await axios.post(`${apiUrl}/appointments`, payload);
      toast.success("¡Servicio reservado con éxito! ID de cita: " + res.data._id);
      navigate("/my-appointments");
    } catch (error) {
      const status = error.response?.status;
      let msg = error.response?.data?.message || "Error en la reserva";
      if (status === 404) msg = "Ruta /appointments no encontrada en backend. Revisa server.js.";
      if (status === 500) msg = "Error en servidor: posiblemente DB o modelo. Chequea logs.";
      toast.error(msg);
      console.error("Error details:", error); // Para depurar en consola
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen font-bold text-black uppercase tracking-widest">Cargando detalles del servicio...</div>;

  if (error || !doctor) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-red-500 font-bold text-xl uppercase">Error al cargar el servicio.</h1>
      <button onClick={() => navigate("/doctors")} className="mt-4 border-2 border-black px-6 py-2 rounded-lg hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all font-bold uppercase text-xs">Volver a Servicios</button>
    </div>
  );

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main className="flex-grow">
        <div className="mx-auto px-4 py-12 max-w-screen-xl">
          <h1 className="text-4xl font-extrabold text-center mb-2 text-black">Reservar Servicio</h1>
          <p className="text-center text-black mb-12 uppercase tracking-widest text-xs font-bold opacity-60">Agenda tu atención especializada</p>

          {!user && (
            <p className="text-center text-amber-600 mb-4 font-bold">Estás reservando como invitado. Inicia sesión para guardar en tu perfil.</p>
          )}

          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
            {/* Tarjeta de Información del Servicio - Sin cambios */}
            <div className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] hover:translate-y-[-10px] hover:bg-amber-50 flex flex-col justify-between w-full lg:max-w-[400px]">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2 transition-colors group-hover:text-amber-700">{doctor.name}</h2>
                <p className="text-xl font-medium text-black mb-6">{doctor.specialization}</p>
                <div className="h-px bg-black opacity-10 w-full mb-8 group-hover:bg-amber-300 transition-colors"></div>
                
                <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-4">Descripción del Servicio</h3>
                <p className="text-black leading-relaxed mb-8 italic">
                  "{doctor.bio || "Servicio especializado de alta calidad disponible para ti."}"
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-center font-black text-amber-600 uppercase tracking-[0.2em] text-sm animate-pulse">
                  Modalidad Virtual
                </p>
                <div className="bg-transparent border border-black p-5 rounded-lg flex items-center justify-center transition-all group-hover:border-amber-500 group-hover:bg-white">
                  <div className="text-center">
                    <p className="text-xs text-black font-bold uppercase mb-1">Valoración del Servicio</p>
                    <p className="text-2xl font-black text-black group-hover:text-amber-600 transition-colors">⭐ {doctor.totalRating || '5.0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Datos del Usuario - Agregada validación extra en button */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 w-full lg:max-w-[600px] transition-all hover:shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Nombre del Usuario</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white text-black" placeholder="Ej: Juan Pérez" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Correo Electrónico</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white text-black" placeholder="Ej: juan@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Teléfono</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white text-black" placeholder="Ej: +56 9 1234 5678" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Fecha del Servicio</label>
                    <input 
                      type="date" 
                      name="appointmentDate" 
                      min={todayStr} 
                      value={formData.appointmentDate} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white text-black transition-all cursor-pointer" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Horario Disponible</label>
                    <select 
                      name="appointmentTime" 
                      value={formData.appointmentTime} 
                      onChange={handleInputChange} 
                      required 
                      disabled={!formData.appointmentDate || availableTimes.length === 0}
                      className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white text-black transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <option value="">{formData.appointmentDate ? "Selecciona hora" : "Elige una fecha primero"}</option>
                      {availableTimes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.appointmentDate && availableTimes.length === 0 && (
                  <p className="text-xs font-bold text-amber-700 uppercase">Sin horarios para esta fecha (Requiere 6h de antelación o fin de semana).</p>
                )}

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Motivo del Servicio</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full border border-black p-4 rounded-lg h-32 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none bg-white text-black transition-all" placeholder="Indica brevemente el motivo o requerimiento..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.appointmentTime} 
                  className={`group relative w-full py-5 rounded-lg font-black text-black text-xl uppercase tracking-widest border-2 border-black transition-all duration-300 hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:shadow-[0_15px_30px_rgba(245,158,11,0.4)] active:scale-95 ${isSubmitting ? 'bg-gray-200 border-gray-200 cursor-not-allowed' : 'bg-transparent'}`}
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Servicio"}
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