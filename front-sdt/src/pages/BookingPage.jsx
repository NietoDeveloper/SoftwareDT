import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  if (isLoading) return <div className="text-center py-20 font-bold text-black">Cargando detalles...</div>;

  if (error || !doctor) return (
    <div className="text-center py-20">
      <h1 className="text-red-500 font-bold">Error al cargar el servicio.</h1>
      <button onClick={() => navigate("/doctors")} className="mt-4 bg-gray-200 px-4 py-2 rounded">Volver</button>
    </div>
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <main className="flex-grow">
        <div className="mx-auto px-4 py-12 max-w-screen-xl">
          <h1 className="text-4xl font-extrabold text-center mb-2 text-black">Hacer Cita</h1>
          <p className="text-center text-black mb-12">Completa la información para agendar tu servicio</p>

          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
            
            <div className="group bg-white p-8 rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:translate-y-[-10px] hover:bg-yellow-50 flex flex-col justify-between w-full lg:max-w-[400px]">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2 group-hover:text-amber-700">{doctor.name}</h2>
                <p className="text-xl font-medium text-black mb-6">{doctor.specialization}</p>
                <div className="h-px bg-black opacity-10 w-full mb-8"></div>
                
                <h3 className="font-bold text-xs uppercase tracking-widest text-black mb-4">Acerca del servicio</h3>
                <p className="text-black leading-relaxed mb-8 italic">
                  "{doctor.bio || "Sin descripción disponible."}"
                </p>
              </div>
              
              <div className="bg-transparent border border-black p-5 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-black font-bold uppercase mb-1">Reputación</p>
                  <p className="text-2xl font-black text-black">⭐ {doctor.totalRating || '5.0'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 w-full lg:max-w-[600px]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Nombre Completo</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none transition-all bg-white text-black" placeholder="Ej: Juan Pérez" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Fecha</label>
                    <input type="date" name="appointmentDate" min={today} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white text-black" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Hora</label>
                    <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full border border-black p-4 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white text-black" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2 uppercase tracking-wide">Motivo de la Cita</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full border border-black p-4 rounded-lg h-32 focus:ring-2 focus:ring-amber-500 outline-none resize-none bg-white text-black" placeholder="Cuéntanos brevemente el motivo..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`group relative w-full py-5 rounded-lg font-black text-black text-xl uppercase tracking-widest border-2 border-black transition-all duration-300 hover:bg-amber-500 hover:text-white hover:shadow-[0_10px_20px_rgba(245,158,11,0.3)] active:scale-95 ${isSubmitting ? 'bg-gray-200 border-gray-200 cursor-not-allowed' : 'bg-transparent'}`}
                >
                  {isSubmitting ? "Procesando..." : "Crear Cita"}
                </button>
                
                <p className="text-center text-[10px] font-bold text-black uppercase tracking-tighter opacity-50 mt-6">
                  Notificación inmediata al confirmar
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