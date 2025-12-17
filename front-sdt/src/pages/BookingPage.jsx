import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer"; // Asumiendo que tienes este componente

const BookingPage = () => {
  const location = useLocation();
  const { id } = useParams(); // Obtiene el doctorId de la URL por si necesitas usarlo
  const doctor = location.state?.doctor; // Recibe los datos del doctor desde el state

  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!doctor) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-red-600">Error: No se encontraron datos del servicio seleccionado.</h1>
        <p className="text-black mt-2">Por favor, regresa y selecciona un servicio nuevamente.</p>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const appointmentData = {
        ...data,
        doctorId: doctor._id,
        doctorName: doctor.name,
        specialization: doctor.specialization,
      };
      const res = await axios.post(`${apiUrl}/appointments`, appointmentData); // Ajusta la endpoint según tu backend
      toast.success("Cita reservada exitosamente!");
      // Opcional: redirigir a otra página después del éxito
    } catch (error) {
      toast.error("Error al reservar la cita. Verifica los datos o el servidor.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-screen-md">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-black">Reservar Cita</h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">Servicio Seleccionado: {doctor.name}</h2>

        {/* Información prellenada del doctor (solo lectura) */}
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-black">Detalles del Servicio</h3>
          <p className="text-black mt-2"><strong>Nombre:</strong> {doctor.name}</p>
          <p className="text-black mt-2"><strong>Especialización:</strong> {doctor.specialization}</p>
          <p className="text-black mt-2"><strong>Puntaje:</strong> {doctor.totalRating}</p>
          <p className="text-black mt-2"><strong>Bio:</strong> {doctor.bio}</p>
        </div>

        {/* Formulario para completar la cita */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="patientName" className="block text-black font-medium mb-2">Nombre del Paciente</label>
            <input
              id="patientName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("patientName", { required: "Este campo es requerido" })}
            />
            {errors.patientName && <p className="text-red-600 mt-1">{errors.patientName.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-black font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("email", { required: "Este campo es requerido", pattern: { value: /^\S+@\S+$/i, message: "Email inválido" } })}
            />
            {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-black font-medium mb-2">Fecha de la Cita</label>
            <input
              id="date"
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("date", { required: "Este campo es requerido" })}
            />
            {errors.date && <p className="text-red-600 mt-1">{errors.date.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-black font-medium mb-2">Hora de la Cita</label>
            <input
              id="time"
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("time", { required: "Este campo es requerido" })}
            />
            {errors.time && <p className="text-red-600 mt-1">{errors.time.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="notes" className="block text-black font-medium mb-2">Notas Adicionales</label>
            <textarea
              id="notes"
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              {...register("notes")}
            />
          </div>

          <button type="submit" className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition-colors">
            Confirmar Cita
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;