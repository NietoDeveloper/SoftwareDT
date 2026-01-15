import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../API/api.js";
import { 
  PlusCircle, Mail, MessageCircle, ArrowUpRight, Loader2, Clock, MapPin, 
  Activity, ShieldCheck, Database
} from "lucide-react";
import { toast } from "react-hot-toast";

const ClientAppointmentsPanel = () => {
  const { user, token, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = useCallback(async () => {
    const userId = user?._id || user?.id;
    if (!userId || !token) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      // Sincronización con el Datacenter
      const [apptRes, msgRes] = await Promise.all([
        axiosPrivate.get(`/appointments/user/${userId}`),
        axiosPrivate.get(`/messages/user/${userId}`).catch(() => ({ data: { messages: [] } }))
      ]);

      if (apptRes.data.success) {
        setAppointments(apptRes.data.appointments || []);
      }
      if (msgRes.data.success) {
        setMessages(msgRes.data.messages || []);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (handleLogout) handleLogout();
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, user?.id, token, navigate, handleLogout]);

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  const handleExternalCommunication = async (type) => {
    const messagePayload = {
      userId: user?._id || user?.id,
      channel: type,
      subject: type === 'WhatsApp' ? 'SOPORTE VÍA CHAT' : 'SOPORTE VÍA EMAIL',
      content: "Consulta técnica desde Panel de Control SDT",
      createdAt: new Date()
    };

    try {
      await axiosPrivate.post('/messages/log', messagePayload);
      if (type === 'WhatsApp') {
        window.open(`https://wa.me/573115456209?text=${encodeURIComponent("Hola, necesito soporte con mi servicio en Software DT")}`, '_blank');
      } else {
        window.location.href = `mailto:admin@softwaredt.com?subject=Soporte Software DT&body=Hola, requiero asistencia técnica.`;
      }
      // Refrescar historial después de enviar
      setTimeout(fetchDashboardData, 1000);
    } catch (err) {
      console.error("Log error:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "FECHA PENDIENTE";
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? dateString.toUpperCase() // En caso de que venga como string directo del backend corregido
      : date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  };

  // LÓGICA DE FILTRADO SDT: Sincronizada con el Backend
  const filteredAppointments = appointments.filter(appt => {
    const status = appt.status?.toLowerCase() || 'pending';
    if (activeTab === "pending") {
      return ["pending", "scheduled", "active"].includes(status);
    }
    if (activeTab === "completed") {
      // 'fulfilled' es el estado automático que pusimos en el backend para citas pasadas
      return ["completed", "fulfilled", "finished", "taken"].includes(status);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-main pb-20 font-sans text-black antialiased overflow-x-hidden">
      
      {/* HEADER SDT */}
      <div className="bg-white border-b-2 border-black/5 pt-8 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-6 md:px-12 shadow-[0_4px_30px_rgba(254,182,13,0.1)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-6 sm:w-8 h-1 bg-yellowColor shadow-[0_0_10px_rgba(254,182,13,0.5)]"></div>
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Software DT - SECURE ID: {user?._id ? user._id.slice(-8).toUpperCase() : "INVITADO"}
              </span>
            </div>
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-headingColor uppercase tracking-tighter leading-[0.9] break-words">
              <span className="text-yellowColor">Panel De Control </span><br/>
              {user?.name || "USUARIO SDT"}
            </h1>
          </div>
          
          <div className="bg-black text-yellowColor p-4 rounded-xl border-2 border-black flex items-center gap-4 shadow-xl w-full sm:w-auto overflow-hidden">
             <div className="flex flex-col items-end font-mono">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gray-500">System Time</span>
                <span className="text-lg sm:text-2xl font-black">{currentTime.toLocaleTimeString('en-GB')}</span>
             </div>
             <div className="w-[1px] h-8 bg-gray-800"></div>
             <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-gray-500">Network Date</span>
                <span className="text-xs sm:text-sm font-black uppercase">{currentTime.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
             </div>
             <Clock size={20} className="animate-pulse text-yellowColor ml-2 hidden xs:block" />
          </div>

          <Link to="/services" className="w-full md:w-auto group flex items-center justify-center gap-3 bg-yellowColor text-black border-2 border-black px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:shadow-[0_10px_20px_rgba(255,215,0,0.4)] active:scale-95">
            <PlusCircle size={18} /> Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 mt-8 sm:mt-12">
        <div className="w-full lg:w-[65%] space-y-10">
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Tus Citas</h2>
              <div className="flex gap-2 bg-white border-2 border-black/10 p-1 rounded-2xl w-full xl:w-auto">
                {["pending", "completed"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 xl:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-yellowColor text-black shadow-inner" : "text-gray-400 hover:text-black"}`}>
                    {tab === "pending" ? "Pendientes" : "Cumplidas"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {isLoading ? (
                <div className="flex flex-col items-center py-20 gap-4">
                  <Loader2 className="animate-spin text-yellowColor" size={48} />
                  <p className="text-[10px] font-black uppercase tracking-widest animate-pulse">Sincronizando Datacenter...</p>
                </div>
              ) : filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-[3px] border-black/5 rounded-[1.5rem] p-5 sm:p-8 hover:border-gold hover:shadow-[0_15px_30px_rgba(255,215,0,0.15)] transition-all duration-400 group relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-2 transition-all ${appt.status === 'fulfilled' ? 'bg-green-500' : 'bg-gold'}`}></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-bold bg-black text-white px-2 py-0.5 rounded uppercase">{appt.specialization}</span>
                          {appt.status === 'fulfilled' && <span className="text-[8px] font-bold bg-green-500 text-white px-2 py-0.5 rounded uppercase">CUMPLIDA AUTO</span>}
                        </div>
                        <h3 className="text-lg sm:text-3xl font-black uppercase tracking-tighter text-headingColor">{appt.serviceName || "Consultoría"}</h3>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="bg-main px-3 py-1.5 rounded-lg font-black text-[10px] sm:text-[12px] flex items-center gap-2">
                             <Clock size={12}/> {formatDate(appt.appointmentDate)}
                          </div>
                          <div className="bg-yellowColor/10 px-3 py-1.5 rounded-lg font-black text-yellowColor text-[10px] sm:text-[12px]">{appt.appointmentTime}</div>
                        </div>
                      </div>
                      <button onClick={() => navigate("/appointment-confirmation", { state: { appointment: appt } })} className="w-full md:w-auto px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-black text-white hover:bg-gold hover:text-black hover:shadow-lg transition-all">
                        {activeTab === "completed" ? "Ver Registro" : "Ver Detalle"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/50 border-2 border-dashed border-black/10 rounded-3xl py-20 text-center">
                   <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">No hay registros en esta sección</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* MENSAJES Y CONTACTO (Puntos 3 y 4 MVP) */}
        <div className="mt-20 space-y-10">
            <div className="flex items-center gap-4">
               <div className="h-[2px] flex-1 bg-black/5"></div>
               <h2 className="text-xl sm:text-4xl font-black uppercase tracking-[0.1em] text-center px-2">Mensajes y Contacto</h2>
               <div className="h-[2px] flex-1 bg-black/5"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
               {/* TARJETA 1: COMUNICACIÓN */}
               <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-6 sm:p-12 shadow-sm flex flex-col items-center text-center relative overflow-hidden group hover:border-gold/50 transition-all">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-main rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl ring-4 ring-gold/20 overflow-hidden">
                     {/* Reemplazo de la imagen de GitHub por el logo local de SDT */}
<div className="w-full h-full overflow-hidden rounded-2xl border-2 border-black/10">
  <img 
    src="/logo.png" 
    alt="Software DT Logo" 
    className="w-full h-full object-cover" 
    onError={(e) => {
      // Fallback por si la imagen no carga
      e.target.src = "https://github.com/NietoDeveloper";
    }}
  />
</div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-black text-gold uppercase tracking-[0.3em] mb-2">Engineering Excellence</span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase mb-4 tracking-tighter text-headingColor">Soporte Directo DT</h3>
                  
                  <div className="w-full bg-main/30 border-2 border-black/5 p-4 sm:p-6 rounded-3xl mb-8">
                     <p className="text-[10px] sm:text-[13px] font-bold text-gray-600 leading-relaxed italic">
                         "Protocolo de comunicación activo. Selecciona un canal para comunicacion directa "
                     </p>
                  </div>

                  <div className="w-full flex flex-col sm:flex-row gap-4">
                     <button onClick={() => handleExternalCommunication('WhatsApp')}
                        className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 sm:py-5 rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black hover:shadow-lg transition-all">
                        <MessageCircle size={18} /> WhatsApp
                     </button>
                     <button onClick={() => handleExternalCommunication('Email')}
                        className="flex-1 flex items-center justify-center gap-3 bg-black text-white py-4 sm:py-5 rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black hover:shadow-lg transition-all">
                        <Mail size={18} /> Email
                     </button>
                  </div>
               </div>

               {/* TARJETA 2: ÚLTIMA TARJETA - HISTORIAL (MVP PUNTO 4) */}
               <div className="bg-white border-2 border-black/5 rounded-[2.5rem] flex flex-col shadow-sm hover:border-gold/50 transition-all overflow-hidden">
                  <div className="p-6 sm:p-8 bg-black text-white flex justify-between items-center">
                     <div className="flex flex-col">
                        <h3 className="text-md sm:text-lg font-black uppercase tracking-widest flex items-center gap-3">
                           <Clock size={18} className="text-gold" /> Historial de Red
                        </h3>
                     </div>
                     <Activity size={24} className="text-gold animate-pulse" />
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-black/5 bg-main/10 text-center py-4">
                     <div className="border-r border-black/5">
                        <p className="text-[8px] font-black text-gray-400 uppercase">Logs</p>
                        <p className="text-sm font-black">{messages.length}</p>
                     </div>
                     <div className="border-r border-black/5">
                        <p className="text-[8px] font-black text-gray-400 uppercase">Status</p>
                        <p className="text-[9px] font-black text-green-500 uppercase">ONLINE</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase">Security</p>
                        <p className="text-[9px] font-black text-blue-500 uppercase flex items-center justify-center gap-1">
                           <ShieldCheck size={10} /> AES-256
                        </p>
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto max-h-[350px]">
                     <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-50 font-bold text-[9px] sm:text-[10px] uppercase">
                           {messages.length > 0 ? messages.map((msg) => (
                              <tr key={msg._id} className="hover:bg-main/20 transition-colors">
                                 <td className="px-4 sm:px-8 py-5">
                                    <div className="flex items-center gap-2">
                                       <span className={`w-2 h-2 rounded-full ${msg.type === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-blue-500'}`}></span>
                                       <span className="text-gray-700">{msg.title}</span>
                                    </div>
                                 </td>
                                 <td className="px-4 py-5 text-gray-400 font-mono hidden sm:table-cell">{new Date(msg.createdAt).toLocaleDateString()}</td>
                                 <td className="px-4 sm:px-8 py-5 text-right">
                                    <ArrowUpRight size={14} className="text-gold ml-auto" />
                                 </td>
                              </tr>
                           )) : (
                              <tr><td className="px-8 py-20 text-center text-gray-300 italic">No hay logs de actividad...</td></tr>
                           )}
                        </tbody>
                     </table>
                  </div>

                  <div className="p-5 bg-main/20 border-t border-black/5 grid grid-cols-2 items-center">
                     <div className="flex items-center gap-2 text-gray-400">
                        <Database size={12} className="text-gold" />
                        <span className="text-[8px] font-black uppercase">SDT-CLUSTER-01</span>
                     </div>
                     <div className="flex justify-end items-center gap-2">
                        <MapPin size={10} className="text-gray-400" />
                        <span className="text-[8px] font-black uppercase text-gray-400">Bogotá / CO</span>
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAppointmentsPanel;