import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Mail,
  User,
  Clock,
  CheckCircle,
  Briefcase,
  ExternalLink
} from "lucide-react";

const IconWrapper = ({ children, className }) => (
  <div className={`p-3 rounded-full bg-amber-100 text-amber-600 flex-shrink-0 ${className}`}>
    {children}
  </div>
);

const AppointmentConfirmation = () => {
  const { appointmentId } = useParams();

  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulación de fetch a la API (Próximamente axios.get(`/appointments/${appointmentId}`))
        await new Promise((resolve) => setTimeout(resolve, 1500)); 

        // Estructura idéntica a la que guardamos en Atlas
        const realData = {
          _id: appointmentId,
          serviceName: "Ing. Manuel Nieto", // Denormalizado
          specialization: "Arquitectura de Software",
          userInfo: {
            fullName: "Usuario de Prueba",
            email: "usuario@ejemplo.com",
          },
          appointmentDetails: {
            date: "2025-12-25",
            time: "10:30",
            reason: "Consultoría técnica sobre despliegue en la nube.",
            status: "confirmado"
          }
        };

        setAppointmentData(realData);
      } catch (err) {
        setError("No fue posible cargar los detalles del servicio reservado.");
      } finally {
        setIsLoading(false);
      }
    };

    if (appointmentId) fetchAppointmentData();
  }, [appointmentId]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-amber-600 font-black uppercase tracking-widest">Generando Confirmación...</div>
    </div>
  );

  if (error || !appointmentData) return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-red-500">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error en la Reserva</h1>
        <p className="text-gray-600 mb-6">{error || "Datos no encontrados."}</p>
        <Link to="/doctors" className="bg-black text-white px-6 py-3 rounded-lg font-bold uppercase text-xs">Volver a Servicios</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-sans">
      <div className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
        
        {/* Encabezado de Éxito */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">
            Servicio Confirmado
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            Tu reserva ha sido procesada con éxito en nuestra plataforma.
          </p>
        </div>

        <div className="space-y-6">
          {/* Tarjeta del Servicio Asignado */}
          <div className="flex items-center p-6 bg-amber-50 rounded-2xl border border-amber-100 transition-hover hover:bg-amber-100/50">
            <IconWrapper>
              <Briefcase className="h-7 w-7" />
            </IconWrapper>
            <div className="ml-5">
              <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-1">
                Servicio Especializado
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {appointmentData.serviceName}
              </h2>
              <p className="text-sm font-bold text-gray-500 uppercase">
                {appointmentData.specialization}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem 
              icon={<Calendar className="h-5 w-5" />} 
              title="Fecha Programada" 
              value={appointmentData.appointmentDetails.date} 
            />
            <DetailItem 
              icon={<Clock className="h-5 w-5" />} 
              title="Hora del Servicio" 
              value={appointmentData.appointmentDetails.time} 
            />
            <DetailItem 
              icon={<User className="h-5 w-5" />} 
              title="Usuario Solicitante" 
              value={appointmentData.userInfo.fullName} 
            />
            <DetailItem 
              icon={<ExternalLink className="h-5 w-5" />} 
              title="Referencia Atlas" 
              value={appointmentData._id.substring(0, 12) + "..."} 
            />
          </div>

          {/* Motivo del Servicio */}
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
              Requerimientos del Servicio
            </p>
            <p className="text-gray-700 italic leading-relaxed">
              "{appointmentData.appointmentDetails.reason}"
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/my-appointments"
            className="py-4 px-8 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 transition-all duration-300 text-center uppercase text-sm tracking-widest"
          >
            Mis Servicios Reservados
          </Link>
          <Link
            to="/doctors"
            className="py-4 px-8 bg-white text-black border-2 border-black font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 text-center uppercase text-sm tracking-widest"
          >
            Nuevo Servicio
          </Link>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
    <div className="text-amber-500 mr-4 bg-amber-50 p-2 rounded-lg">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{title}</p>
      <p className="text-sm font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;