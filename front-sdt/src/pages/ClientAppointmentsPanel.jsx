import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  LayoutDashboard, 
  Bell 
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        // Nota: Usamos el ID del contexto de usuario
        const response = await fetch(`${apiUrl}/appointments/user/${user._id || user.id}`);
        if (!response.ok) throw new Error("No se pudieron obtener los servicios.");
        const data = await response.json();
        setAppointments(data.appointments || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAppointments();
  }, [user]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-bounce text-amber-600 font-black uppercase tracking-tighter">Sincronizando con Atlas...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header del Panel */}
      <div className="bg-black text-white py-10 px-4 shadow-xl">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500 rounded-lg text-black">
              <LayoutDashboard size={30} />
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">Panel de Servicios</h1>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">Gestión de usuario: {user?.name || "Cliente"}</p>
            </div>
          </div>
          <Link to="/doctors" className="bg-white text-black px-6 py-2 rounded-full font-black text-xs uppercase hover:bg-amber-500 transition-colors">
            Contratar Nuevo Servicio
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-black uppercase border-b-2 border-amber-500 inline-block mb-4">
            Servicios Contratados
          </h2>
          
          {error && <div className="p-4 bg-red-100 text-red-700 rounded-lg font-bold">{error}</div>}
          
          {appointments.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center">
              <p className="text-gray-400 font-medium italic">Aún no has solicitado servicios especializados.</p>
            </div>
          ) : (
            appointments.map((appt) => (
              <div key={appt._id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${appt.appointmentDetails?.status === 'pending' ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Ref: {appt._id.substring(0, 8)}
                      </p>
                    </div>
                    <h3 className="text-xl font-bold text-black group-hover:text-amber-600 transition-colors">
                      {appt.serviceName}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center text-gray-500 text-xs font-bold">
                        <Calendar size={14} className="mr-1 text-amber-500" />
                        {appt.appointmentDetails?.date}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs font-bold">
                        <Clock size={14} className="mr-1 text-amber-500" />
                        {appt.appointmentDetails?.time}
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/appointment-confirmation/${appt._id}`}
                    className="flex items-center gap-2 bg-gray-50 text-black px-4 py-2 rounded-xl text-xs font-black uppercase hover:bg-black hover:text-white transition-all"
                  >
                    Detalles <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 sticky top-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="text-amber-600 animate-swing" />
              <h2 className="text-lg font-black text-amber-900 uppercase tracking-tighter">
                Mensajes del Desarrollador
              </h2>
            </div>

            {/* Este es el espacio para el contenido dinámico del Administrador */}
            <div className="space-y-4">
              {user?.adminMessage ? (
                <div className="bg-white p-4 rounded-xl border-l-4 border-amber-500 shadow-sm">
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "{user.adminMessage}"
                  </p>
                  <p className="text-[10px] font-black text-amber-600 uppercase mt-3 tracking-widest">
                    — NietoDeveloper
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <MessageSquare className="mx-auto text-amber-200 mb-2" size={40} />
                  <p className="text-xs font-bold text-amber-800/50 uppercase tracking-tighter">
                    No hay contenido exclusivo <br /> para tu perfil hoy.
                  </p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-amber-200">
                <p className="text-[10px] font-black text-amber-700 uppercase mb-4 tracking-widest">Recursos Directos</p>
                <a href="#" className="block py-2 text-sm font-bold text-black hover:text-amber-600 transition-colors flex items-center justify-between">
                  Guía de Implementación <ChevronRight size={14}/>
                </a>
                <a href="#" className="block py-2 text-sm font-bold text-black hover:text-amber-600 transition-colors flex items-center justify-between">
                  Soporte Técnico Especializado <ChevronRight size={14}/>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientAppointmentsPanel;