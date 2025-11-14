import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const CheckCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const AppointmentConfirmation = () => {
  // Hooks de navegación y datos
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.booking;

  // Estados para simular la notificación por correo
  const [emailStatus, setEmailStatus] = useState({
    user: "Pendiente",
    doctor: "Pendiente",
  });

  useEffect(() => {
    // Ejecutamos la simulación de envío solo si tenemos datos de la reserva
    if (bookingData) {
      // SIMULACIÓN DE ENVÍO DE CORREOS
      // En una aplicación real, esta sería una llamada asíncrona a un servicio de backend/email.
      setTimeout(() => {
        // Simulación de éxito después de 2 segundos
        setEmailStatus({
          user: "Enviado con éxito",
          doctor: "Enviado con éxito",
        });

        // Notificación por consola para fines de depuración/simulación de backend
        console.log("-----------------------------------------");
        console.log(
          `[Email Mock] 📨 Correo de confirmación enviado a: ${bookingData.doctorName}`
        );
        console.log(
          `[Email Mock] 📧 Correo de confirmación enviado al paciente: ${bookingData.patientId}`
        );
        console.log(
          `[Email Mock] Cita confirmada: ${bookingData.date} a las ${bookingData.time}`
        );
        console.log("-----------------------------------------");
      }, 2000);
    }
  }, [bookingData]);

  if (!bookingData) {
    // Caso de manejo si el usuario refresca la página (se pierden los datos del state)
    return (
      <div className="max-w-xl mx-auto p-10 mt-20 bg-red-50 rounded-xl shadow-lg border border-red-300">
        <h1 className="text-3xl font-bold text-red-700">
          ⚠️ Error: Datos de Cita Perdidos
        </h1>
        <p className="mt-4 text-red-600">
          No se encontraron los detalles de la cita. Esto puede pasar si se
          refresca la página. Por favor, verifica el estado en la sección de
          "Mis Citas".
        </p>
        <button
          onClick={() => navigate("/doctors")}
          className="mt-6 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Volver a Doctores
        </button>
      </div>
    );
  }

  const { doctorName, date, time, specialization } = bookingData;

  return (
    <div className="min-h-screen bg-green-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mt-10 text-center flex flex-col sm:flex-row justify-center gap-4">
                           {" "}
        <button
          onClick={() => navigate("/client/dashboard")}
          className="py-3 px-8 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105 order-first sm:order-last" // Se añade estilo y orden
        >
                                  Ver Mis Citas                    {" "}
        </button>
        <button
          onClick={() => navigate("/doctors")}
          className="py-3 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
                                  Volver a la Lista de Servicios                
             {" "}
        </button>
                       {" "}
      </div>

      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-8 sm:p-12 transition-all duration-300">
        <CheckCircleIcon className="h-20 w-20 text-green-600 mx-auto mb-6" />

        <h1 className="text-4xl font-extrabold text-green-700 text-center mb-2">
          ¡Cita Confirmada!
        </h1>
        <p className="text-xl text-gray-600 text-center mb-10">
          Tu reserva ha sido procesada con éxito.
        </p>

        {/* Detalles de la Cita */}
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm font-semibold text-gray-500">
              Ingeniero De Software:
            </p>
            <p className="text-2xl font-bold text-blue-800">{doctorName}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <DetailCard title="ID de Reserva" value={appointmentId} />
            <DetailCard
              title="Especialidad"
              value={specialization || "General"}
            />
            <DetailCard
              title="Fecha"
              value={new Date(date).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <DetailCard title="Hora" value={time} />
            <DetailCard title="ID Paciente" value={bookingData.patientId} />
            <DetailCard
              title="Estado"
              value={bookingData.status}
              className="text-green-600"
            />
          </div>
        </div>

        {/* Estado de las Notificaciones (Mails) */}
        <div className="mt-10 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Estado de Notificaciones
          </h3>
          <div className="space-y-3">
            <EmailStatusItem recipient="Paciente" status={emailStatus.user} />
            <EmailStatusItem
              recipient="Doctor/Programador"
              status={emailStatus.doctor}
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/doctors")}
            className="py-3 px-8 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Volver a la Lista de Servicios
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las tarjetas de detalle
const DetailCard = ({ title, value, className = "" }) => (
  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </p>
    <p className={`text-lg font-semibold text-gray-900 truncate ${className}`}>
      {value}
    </p>
  </div>
);

// Componente auxiliar para el estado del correo
const EmailStatusItem = ({ recipient, status }) => {
  const color =
    status === "Enviado con éxito" ? "text-green-600" : "text-yellow-600";
  const text =
    status === "Enviado con éxito" ? "Enviado con éxito" : "Enviando...";

  const icon =
    status === "Enviado con éxito" ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
    ) : (
      <svg
        className="animate-spin -ml-1 mr-2 h-5 w-5 text-yellow-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <span className="text-gray-700 font-medium flex items-center">
        {icon} Notificación a {recipient}
      </span>
      <span className={`text-sm font-bold ${color}`}>{text}</span>
    </div>
  );
};

export default AppointmentConfirmation;
