import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";

const BookingPage = () => {
  // 1. Asegúrate de que el parámetro coincida con tu App.jsx (/:doctorId)
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

  // 2. Función de fetch corregida
  const getDoctor = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      // Simplificamos la URL y dejamos que React Query maneje el estado
      const res = await axios.get(`${apiUrl}/doctors/${doctorId}`);
      
      // LOG CRÍTICO para depuración:
      console.log("Datos recibidos del doctor:", res.data);
      
      // IMPORTANTE: Ajusta esta línea según la estructura REAL de tu backend
      // Si tu backend hace: res.json(doctor) -> usa res.data
      // Si tu backend hace: res.json({ doctor }) -> usa res.data.doctor
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
    enabled: !!doctorId, // Solo corre si hay ID
  });

  // 3. Prefill optimizado
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
      navigate("/my-appointments"); // Cambiado a una ruta lógica de éxito
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al procesar la reserva");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center py-20 font-bold">Cargando detalles...</div>;
  
  if (error || !doctor) return (
    <div className="text-center py-20">
      <h1 className="text-red-500 font-bold">No se pudo cargar la información del servicio.</h1>
      <button onClick={() => navigate("/doctors")} className="mt-4 bg-gray-200 p-2 rounded">Volver</button>
    </div>
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-8">Confirmar Cita</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info del Doctor/Servicio */}
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-amber-500">
            <h2 className="text-2xl font-bold text-amber-700 mb-2">{doctor.name}</h2>
            <p className="text-gray-600 font-medium mb-4">{doctor.specialization}</p>
            <hr className="mb-4" />
            <p className="text-gray-700 leading-relaxed mb-6">{doctor.bio || "Sin descripción disponible."}</p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm font-bold text-amber-800">Calificación: ⭐ {doctor.totalRating || '5.0'}</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Tu Nombre</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border p-2 rounded focus:ring-2 focus:ring-amber-500 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Fecha</label>
                  <input type="date" name="appointmentDate" min={today} value={formData.appointmentDate} onChange={handleInputChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Hora</label>
                  <input type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleInputChange} required className="w-full border p-2 rounded" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Motivo / Notas</label>
                <textarea name="reason" value={formData.reason} onChange={handleInputChange} required minLength={10} className="w-full border p-2 rounded h-24" placeholder="¿En qué podemos ayudarte?" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className={`w-full py-3 rounded-lg font-bold text-white transition-all ${isSubmitting ? 'bg-gray-400' : 'bg-amber-600 hover:bg-amber-700 shadow-md'}`}
              >
                {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;