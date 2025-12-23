import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../API/api.js";
import { 
  PlusCircle, Mail, MessageCircle, ArrowUpRight, Loader2
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user, token, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    const userId = user?._id || user?.id;
    if (!userId || !token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosPrivate.get(`/appointments/user/${userId}`);
      if (response.data) {
        setAppointments(response.data.appointments || response.data.data || []);
      }
      setMessages([]); 
    } catch (err) {
      console.error("❌ Error en Datacenter SDT:", err.response?.data?.message || err.message);
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (handleLogout) handleLogout();
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, user?.id, token, navigate, handleLogout]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatDate = (dateString) => {
    if (!dateString) return "FECHA PENDIENTE";
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? "FECHA INVÁLIDA" 
      : date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  };

  const handleMensajeDirecto = () => {
    window.location.href = `mailto:admin@softwaredt.com?subject=Soporte Software DT - ${user?.name}`;
  };

  const filteredAppointments = appointments.filter(appt => {
    const status = appt.status?.toLowerCase() || 'pending';
    if (activeTab === "pending") return ["pending", "active", "scheduled"].includes(status);
    if (activeTab === "completed") return ["completed", "taken", "finished"].includes(status);
    return true;
  });

  return (
    <div className="min-h-screen bg-main pb-20 font-sans text-black antialiased overflow-x-hidden">
      {/* HEADER RESPONSIVE */}
      <div className="bg-white border-b-2 border-black/5 pt-8 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-6 md:px-12 shadow-[0_4px_30px_rgba(254,182,13,0.1)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-6 sm:w-8 h-1 bg-yellowColor shadow-[0_0_10px_rgba(254,182,13,0.5)]"></div>
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                SDT-SECURE-ID: {user?._id ? user._id.slice(-8).toUpperCase() : "INVITADO"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-headingColor uppercase tracking-tighter leading-[0.9] break-words">
              {user?.name || "USUARIO SDT"}<br/>
              <span className="text-yellowColor">Panel Cliente</span>
            </h1>
          </div>
          
          <Link 
            to="/services" 
            className="w-full md:w-auto group flex items-center justify-center gap-3 bg-yellowColor text-black border-2 border-black px-6 py-4 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,215,0,0.4)] active:scale-95 shadow-lg"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 mt-8 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-[65%] space-y-10">
          
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Historial de Citas</h2>
              <div className="flex gap-2 bg-white border-2 border-black/10 p-1 rounded-2xl shadow-sm w-full xl:w-auto">
                {["pending", "completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 xl:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                      activeTab === tab 
                        ? "bg-yellowColor text-black shadow-inner" 
                        : "text-gray-400 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {tab === "pending" ? "Pendientes" : "Cumplidas"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {isLoading ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4 bg-white/30 rounded-3xl">
                    <Loader2 className="animate-spin text-yellowColor" size={40} />
                    <div className="font-black uppercase text-[10px] tracking-widest text-gray-400">Sincronizando Datacenter...</div>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="bg-white/50 border-2 border-black/5 border-dashed p-12 sm:p-16 rounded-[1.5rem] sm:rounded-[2rem] text-center italic text-gray-400 font-bold text-xs sm:text-sm">
                  No se registran Citas en este estado.
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-[3px] border-black/5 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 hover:border-yellowColor/30 hover:shadow-2xl transition-all duration-400 group relative overflow-hidden">
                    {/* Barra lateral de estado */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellowColor opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1 space-y-3">
                        {/* TÍTULO DE SERVICIO MÁS GRANDE */}
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-headingColor leading-none">
                          {appt.serviceName || "Consultoría Técnica"}
                        </h3>
                        
                        {/* FECHA Y HORA DESTACADAS */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                           <div className="bg-main px-4 py-2 rounded-lg border border-black/5 shadow-sm">
                              <p className="text-[12px] sm:text-[14px] font-black text-black uppercase tracking-widest">
                                {formatDate(appt.slotDate || appt.appointmentDate)}
                              </p>
                           </div>
                           <div className="bg-yellowColor/10 px-4 py-2 rounded-lg border border-yellowColor/20 shadow-sm">
                              <p className="text-[12px] sm:text-[14px] font-black text-yellowColor uppercase tracking-widest">
                                {appt.slotTime || appt.appointmentTime}
                              </p>
                           </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate("/appointment-confirmation", { state: { appointment: appt } })}
                        className="w-full md:w-auto bg-black text-white px-10 py-4 rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-400 hover:bg-yellowColor hover:text-black hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* RESTO DEL CONTENIDO (HISTORIAL MENSAJERIA) IGUAL... */}
          <section>
             <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-6 sm:mb-8">Historial Mensajeria</h2>
             <div className="bg-white border-2 border-black/5 rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[500px]">
                     <thead className="bg-black text-white text-[9px] font-black uppercase tracking-[0.2em]">
                       <tr>
                           <th className="px-6 sm:px-8 py-5">Asunto / Evento</th>
                           <th className="px-6 sm:px-8 py-5">Fecha</th>
                           <th className="px-6 sm:px-8 py-5 text-right">Acción</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50 font-bold text-[10px] sm:text-[11px] uppercase">
                        {messages.length > 0 ? messages.map((msg) => (
                           <tr key={msg._id || msg.id} className="group hover:bg-yellowColor/5 transition-colors">
                              <td className="px-6 sm:px-8 py-4 text-gray-700">{msg.subject}</td>
                              <td className="px-6 sm:px-8 py-4 text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                              <td className="px-6 sm:px-8 py-4 text-right">
                                 <a href={msg.link || "#"} className="inline-flex items-center gap-2 text-black hover:text-yellowColor transition-colors">
                                    Ver <ArrowUpRight size={14}/>
                                 </a>
                              </td>
                           </tr>
                        )) : (
                          <tr>
                            <td colSpan="3" className="px-8 py-10 text-center text-gray-300 italic text-[10px]">No hay registros en el clúster.</td>
                          </tr>
                        )}
                     </tbody>
                  </table>
                </div>
             </div>
          </section>
        </div>

        {/* ASIDE IGUAL... */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-2 border-black/5 rounded-[1.8rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm lg:sticky lg:top-10">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-8 text-center">Contacto Directo</h2>
            
            <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 bg-main rounded-full flex items-center justify-center mb-4 border-2 border-black/5 overflow-hidden ring-4 ring-yellowColor/10">
                  <img 
                    src="https://github.com/NietoDevelooper.png" 
                    alt="Nieto" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                  />
                </div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Servicio Asignado</p>
                <h3 className="text-lg font-black uppercase mt-1">Software D T</h3>
                <p className="text-[9px] font-bold text-yellowColor mt-1">Bogotá, Colombia</p>
            </div>

            <div className="space-y-4">
               <div className="bg-main/30 border border-black/5 p-5 rounded-2xl relative">
                  <div className="text-yellowColor text-[8px] font-black uppercase mb-2 tracking-widest">Nota_Sincronización</div>
                  <p className="text-[11px] sm:text-[12px] font-medium leading-relaxed italic text-gray-600">
                    "{user?.adminMessage || `Bienvenido, ${user?.name || 'Cliente'}. Tu racha de actividad está siendo monitoreada desde Bogotá.`}"
                  </p>
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
               </div>

               <div className="pt-4 space-y-3">
                  <a href="https://wa.me/573115456209" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-4 bg-[#25D366] text-white rounded-xl hover:scale-[1.02] transition-all shadow-md group">
                     <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp Soporte</span>
                     <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                  </a>
                  <button onClick={handleMensajeDirecto} className="w-full flex items-center justify-between p-4 bg-black text-white rounded-xl transition-all duration-300 hover:bg-yellowColor hover:text-black hover:-translate-y-1 shadow-lg">
                     <span className="text-[10px] font-black uppercase tracking-widest">E-mail Corporativo</span>
                     <Mail size={18} />
                  </button>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ClientAppointmentsPanel;