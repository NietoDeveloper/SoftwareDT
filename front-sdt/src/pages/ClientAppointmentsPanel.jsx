import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  ChevronRight, 
  LayoutDashboard, 
  Bell,
  User,
  PlusCircle,
  ExternalLink
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
        const userId = user?._id || user?.id;
        if (!userId) return;

        const response = await fetch(`${apiUrl}/appointments/user/${userId}`);
        if (!response.ok) throw new Error("No se pudieron sincronizar los servicios.");
        const data = await response.json();
        const appointmentsList = Array.isArray(data) ? data : (data.appointments || []);
        setAppointments(appointmentsList);
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
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-black border-t-amber-500 rounded-full animate-spin"></div>
        <div className="text-black font-black uppercase tracking-widest text-[10px]">Cargando Sistema...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20 font-sans text-black antialiased">
      
      {/* HEADER: TAMAÑO REDUCIDO */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-6 px-4">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-0.5 bg-amber-500"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Workspace</span>
              </div>
              {/* Reducción de H1 */}
              <h1 className="text-3xl font-black text-black uppercase tracking-tighter sm:text-4xl">Panel Cliente</h1>
            </div>
            
            <Link 
              to="/doctors" 
              className="group flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all duration-300 hover:shadow-lg"
            >
              <PlusCircle size={16} />
              Nueva Cita
            </Link>
          </div>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL: RESPONSIVE 320px - 1800px */}
      <div className="max-w-[1800px] mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* COLUMNA IZQUIERDA: 70% en Desktop */}
        <div className="w-full lg:w-[70%] space-y-6">
          
          {/* Info Card con fuente de contenido ajustada */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-amber-500">
                <User size={24} />
             </div>
             <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Usuario Activo</p>
                <h3 className="text-lg font-bold text-black break-all">{user?.email}</h3>
             </div>
          </div>

          <div className="flex items-center justify-between border-b border-black pb-2">
            <h2 className="text-lg font-black text-black uppercase tracking-tight">Citas y Seguimiento</h2>
            <span className="bg-black text-white text-[9px] px-2 py-0.5 rounded-full font-bold">{appointments.length} ITEMS</span>
          </div>
          
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold">{error}</div>}
          
          <div className="grid gap-3">
            {appointments.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Sin registros activos</p>
              </div>
            ) : (
              appointments.map((appt) => (
                <div key={appt._id} className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-amber-400 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <div className="hidden xs:flex w-12 h-12 bg-gray-50 rounded-xl items-center justify-center group-hover:bg-black group-hover:text-amber-500 transition-colors">
                      <Calendar size={20} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black uppercase rounded tracking-tighter">
                          {appt.appointmentDetails?.status || 'Active'}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-black uppercase group-hover:text-amber-600 transition-colors leading-tight">
                        {appt.serviceName || "Consultoría Técnica"}
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <div className="flex items-center text-gray-600 font-bold text-xs uppercase">
                          <Calendar size={14} className="mr-1.5 text-black" />
                          {appt.appointmentDetails?.date}
                        </div>
                        <div className="flex items-center text-gray-600 font-bold text-xs uppercase">
                          <Clock size={14} className="mr-1.5 text-black" />
                          {appt.appointmentDetails?.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/appointment-confirmation`}
                    state={{ appointment: appt, doctorName: appt.serviceName }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all"
                  >
                    Detalles <ExternalLink size={12} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: 30% Fijo al costado en Desktop */}
        <aside className="w-full lg:w-[30%]">
          <div className="bg-white border-[1.5px] border-black rounded-[2rem] p-6 lg:sticky lg:top-24 shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-amber-500 rounded-md">
                <Bell size={16} className="text-black animate-pulse" />
              </div>
              <h2 className="text-base font-black text-black uppercase tracking-tighter">
                NietoDev Direct
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative border-l-2 border-amber-500 pl-4 py-1">
                <p className="text-base text-black leading-snug font-medium italic">
                  "{user?.adminMessage || "Tu proyecto está en fase de Despliegue. Mantente atento."}"
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-black rounded-full border border-amber-500 overflow-hidden">
                      <img src="https://softwaredt.vercel.app/favicon.ico" alt="Dev" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[9px] font-black text-black uppercase tracking-widest">Software Engineer Manuel Nieto</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                <p className="text-[9px] font-black text-gray-400 uppercase mb-3 tracking-widest">Soporte</p>
                
                <button className="w-full group flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-black transition-all">
                   <span className="text-[10px] font-black uppercase group-hover:text-amber-500">Chat Directo</span>
                   <MessageSquare size={14} className="group-hover:text-amber-500" />
                </button>

                <Link to="/contact" className="w-full group flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-black transition-all">
                   <span className="text-[10px] font-black uppercase group-hover:text-amber-500">Ticket</span>
                   <ChevronRight size={14} className="group-hover:text-amber-500" />
                </Link>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default ClientAppointmentsPanel;