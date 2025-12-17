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


  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDoctor = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(`${apiUrl}/doctors/${doctorId}`);
      console.log("Datos del doctor:", res.data);
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
    /* 1. min-h-screen y flex-col son clave para el Sticky Footer */
    <div className="min-h-screen flex flex-col bg-gray-50 text-black">
      
      {/* 2. flex-grow empuja al Footer siempre hacia abajo */}
      <main className="flex-grow">
        <div className="mx-auto px-4 py-12 max-w-5xl">
          <h1 className="text-4xl font-extrabold text-center mb-2">Hacer Cita</h1>
          <p className="text-center text-gray-600 mb-10">Completa la información para agendar tu servicio</p>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            
            {/* Info del Doctor/Servicio */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-amber-500 transition-all hover:shadow-2xl">
              <h2 className="text-3xl font-bold text-amber-700 mb-2">{doctor.name}</h2>
              <p className="text-xl font-medium text-gray-700 mb-4">{doctor.specialization}</p>
              <div className="h-px bg-gray-100 w-full mb-6"></div>
              
              <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">Acerca del servicio</h3>
              <p className="text-gray-700 leading-relaxed mb-8 italic">
                "{doctor.bio || "Sin descripción disponible."}"
              </p>
              
              <div className="bg-amber-50 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-600 font-bold uppercase">Reputación</p>
                  <p className="text-xl font-black text-amber-900">⭐ {doctor.totalRating || '5.0'}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-amber-600 font-bold uppercase">Precio sugerido</p>
                    <p className="text-xl font-black text-amber-900">$ {doctor.ticketPrice || 'Consultar'}</p>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nombre Completo</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-amber-500 focus:ring-0 outline-none transition-colors" placeholder="Ej: Juan Pérez" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Fecha</label>
                    <input type="date" name="appointmentDate" min={today} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-amber-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Hora</label>
                    <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-amber-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Motivo de la Cita</label>
                  <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full border-2 border-gray-100 p-3 rounded-xl h-32 focus:border-amber-500 outline-none resize-none" placeholder="Cuéntanos brevemente el motivo..." />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className={`w-full py-4 rounded-xl font-black text-white text-lg shadow-lg transform transition-all active:scale-95 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-200'}`}
                >
                  {isSubmitting ? "Procesando Reserva..." : "Confirmar Cita Ahora"}
                </button>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Al confirmar, se enviará una notificación al especialista.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer al final, siempre visible u oculto al final del scroll */}
      <Footer />
    </div>
  );
};

export default BookingPage;