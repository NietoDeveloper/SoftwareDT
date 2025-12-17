import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect, useContext } from "react"; // Agregado useEffect y useContext
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext"; // Asumiendo path correcto, ajusta si needed

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Integro UserContext para prefill

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
      const res = await axios.get(
        `${apiUrl}/doctors/${doctorId}?_cache=${Date.now()}&random=${Math.random()}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
            "If-None-Match": "",
            "If-Modified-Since": "",
          },
        }
      );
      return res.data.doctor || res.data;
    } catch (error) {
      if (error.response) {
        toast.error(`Error ${error.response.status}: ${error.response.data.message || 'Fallo desconocido del servidor.'}`);
      } else {
        toast.error("Fallo de red o servidor no disponible. Verifique la conexión del backend.");
      }
      throw error;
    }
  };

  const { data: doctor, error, isLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: getDoctor,
    staleTime: 0, // Datos frescos siempre
    refetchOnWindowFocus: true, // Refetch al focus
  });

  // Prefill form con user data si logueado (de UserContext)
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || user.name || "", // Ajusta según tu UserContext
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold text-black">Cargando Detalles del Doctor....</h1>;

  if (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido.";
    return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos. {errorMessage}</h1>;
  }

  if (!doctor || !doctor._id) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-black">¡Vaya! No se encontró el Doctor seleccionado.</h1>
        <p className="text-black mt-2">Por favor, regresa a la lista de servicios.</p>
      </div>
    );
  }

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
      toast.success("Cita reservada con éxito!");
      navigate("/doctors"); // Redirige a lista de doctores para flujo continuo
    } catch (error) {
      if (error.response) {
        toast.error(`Error ${error.response.status}: ${error.response.data.message || 'Fallo al reservar la cita.'}`);
      } else {
        toast.error("Fallo de red o servidor no disponible.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fecha mínima: hoy
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-black">Reservar Cita</h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">Detalles del Servicio Seleccionado</h2>

        {/* Sección de información del doctor */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full text-center">
            <h1 className="text-2xl font-semibold mb-4 text-black">{doctor.name}</h1>
            <h2 className="text-xl text-black mb-4">{doctor.specialization}</h2>
            <p className="text-black mb-4">Puntaje: {doctor.totalRating}</p>
            <p className="text-black">{doctor.bio}</p>
          </div>

          {/* Formulario de reserva */}
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow max-w-md w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col">
                <span className="text-black font-semibold">Nombre Completo</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  minLength={3}
                  className="border border-gray-300 rounded p-2 text-black"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-black font-semibold">Correo Electrónico</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="border border-gray-300 rounded p-2 text-black"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-black font-semibold">Teléfono</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{7,15}"
                  className="border border-gray-300 rounded p-2 text-black"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-black font-semibold">Fecha de la Cita</span>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  required
                  min={today} // No fechas pasadas
                  className="border border-gray-300 rounded p-2 text-black"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-black font-semibold">Hora de la Cita</span>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded p-2 text-black"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-black font-semibold">Motivo de la Cita</span>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  className="border border-gray-300 rounded p-2 text-black h-24"
                />
              </label>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 text-white font-semibold py-2 rounded hover:bg-amber-600 transition-colors flex-1"
                >
                  {isSubmitting ? "Reservando..." : "Reservar Cita"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/doctors")}
                  className="bg-gray-500 text-white font-semibold py-2 rounded hover:bg-gray-600 transition-colors flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;