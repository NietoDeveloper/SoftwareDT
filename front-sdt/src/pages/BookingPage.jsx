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

  // Generar opciones de tiempo de 9:00 AM a 6:00 PM cada 30 min
  const timeOptions = useMemo(() => {
    const times = [];
    let start = 9 * 60; // 9:00 AM en minutos
    const end = 18 * 60; // 6:00 PM en minutos

    while (start <= end) {
      const h = Math.floor(start / 60);
      const m = start % 60;
      const displayTime = `${h < 10 ? "0" + h : h}:${m === 0 ? "00" : m}`;
      times.push(displayTime);
      start += 30;
    }
    return times;
  }, []);

  const getDoctor = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${apiUrl}/doctors/${doctorId}`);
      return res.data.doctor || res.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Error al obtener datos";
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
    
    // Validación de Domingo (0)
    if (name === "appointmentDate") {
      const selectedDate = new Date(value + "T00:00:00");
      if (selectedDate.getDay() === 0) {
        toast.warning("Atención: No hay citas disponibles los domingos. Por favor elija de Lunes a Sábado.");
        return;
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentTime) {
      toast.error("Por favor seleccione una hora válida.");
      return;
    }
    setIsSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      await axios.post(`${apiUrl}/appointments`, {
        doctorId: doctor._id,
        ...formData,
      });
      toast.success("¡Cita reservada con éxito!");
      navigate("/my-appointments");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error en la reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen font-bold text-black uppercase tracking-widest">Cargando detalles...</div>;

  if (error || !doctor) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-red-500 font-bold text-xl uppercase">Error al cargar el servicio.</h1>
      <button onClick={() => navigate("/doctors")} className="mt-4 border-2 border-black px-6 py-2 rounded-lg hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all font-bold uppercase text-xs">Volver</button>
    </div>
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main className="flex-grow">
        <div className="mx-auto px-4 py-12 max-w-screen-xl">
          <h1 className="text-4xl font-extrabold text-center mb-2 text-black">Hacer Cita</h1>
          <p className="text-center text-black mb-12 uppercase tracking-widest text-xs font-bold opacity-60">Agenda tu servicio profesional</p>

          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
            {/* Tarjeta de Información - SIN CAMBIOS */}
            <div className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.2)] hover:translate-y-[-10px] hover:bg-amber-50 flex flex-col justify-between w-full lg:max-w-[400px]">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2 transition-colors group-hover:text-amber-700">{doctor.name}</h2>
                <p className="text-xl font-medium text-black mb-6">{doctor.specialization}</p>
                <div className="h-px bg-black opacity-10 w-full mb-8 group-hover:bg-amber-300 transition-colors"></div>
                
                <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-4">Detalles</h3>
                <p className="text-black leading-relaxed mb-8 italic">
                  "{doctor.bio || "Servicio especializado de alta calidad."}"
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-center font-black text-amber-600 uppercase tracking-[0.2em] text-sm animate-pulse">
                  Cita Virtual
                </p>
                <div className="bg-transparent border border-black p-5 rounded-lg flex items-center justify-center transition-all group-hover:border-amber-500 group-hover:bg-white">
                  <div className="text-center">
                    <p className="text-xs text-black font-bold uppercase mb-1">Valoración</p>
                    <p className="text-2xl font-black text-black group-hover:text-amber-600 transition-colors">⭐ {doctor.totalRating || '5.0'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Reserva - AJUSTADO */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 w-full lg:max-w-[600px] transition-all hover:shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Nombre Completo</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white text-black" placeholder="Ej: Juan Pérez" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Fecha (Lun - Sáb)</label>
                    <input type="date" name="appointmentDate" min={today} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white text-black transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Hora Disponible</label>
                    <select name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white text-black transition-all appearance-none cursor-pointer hover:border-amber-500">
                      <option value="">Seleccione hora</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Comentarios o Motivo</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full border border-black p-4 rounded-lg h-32 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none bg-white text-black transition-all" placeholder="Indica brevemente el motivo de tu cita..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`group relative w-full py-5 rounded-lg font-black text-black text-xl uppercase tracking-widest border-2 border-black transition-all duration-300 hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:shadow-[0_15px_30px_rgba(245,158,11,0.4)] active:scale-95 ${isSubmitting ? 'bg-gray-200 border-gray-200 cursor-not-allowed' : 'bg-transparent'}`}
                >
                  {isSubmitting ? "Procesando..." : "Confirmar Ahora"}
                </button>
                
                <p className="text-center text-[10px] font-bold text-black uppercase tracking-tighter opacity-50 mt-6 group-hover:opacity-100 transition-opacity">
                  Horario de atención: Lun a Sáb - 9:00 AM a 6:00 PM
                </p>
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