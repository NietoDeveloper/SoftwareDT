import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { 
  Clock, PlusCircle, User, Mail, MessageCircle, XCircle, ArrowUpRight, Phone, Fingerprint, Loader2
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]); 
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = user?._id || user?.id;
      
      if (!userId || !token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const cleanToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
        const headers = { 'Authorization': cleanToken };

        const apptRes = await fetch(`${apiUrl}/appointments/user/${userId}`, { headers });

        if (apptRes.ok) {
          const apptData = await apptRes.json();
          setAppointments(apptData.appointments || apptData.data || []);
        } else {
          console.error("❌ Error en Datacenter (Citas)");
        }

        setMessages([]); 

      } catch (err) {
        console.error("❌ Error Crítico SDT:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, token, apiUrl]);

  const formatDate = (dateString) => {
    if (!dateString) return "FECHA PENDIENTE";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "FECHA INVÁLIDA" : date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
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
    <div className="min-h-screen bg-main pb-20 font-sans text-black antialiased">
      {/* HEADER RESPONSIVE 310PX - 1800PX */}
      <div className="bg-white border-b-2 border-black/5 pt-8 sm:pt-12 pb-8 sm:pb-10 px-3 sm:px-6 md:px-12 shadow-[0_4px_30px_rgba(254,182,13,0.1)]">
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
            className="w-full md:w-auto group flex items-center justify-center gap-3 bg-yellowColor text-black border-2 border-black px-5 py-3 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,215,0,0.4)] active:scale-95 shadow-lg"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-3 sm:px-6 md:px-12 mt-6 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-[65%] space-y-10 sm:y-12">
          
          {/* SECCIÓN HISTORIAL DE CITAS */}
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tighter">Historial de Citas</h2>
              <div className="flex gap-2 bg-white border-2 border-black/10 p-1 rounded-2xl shadow-sm w-full xl:w-auto">
                {["pending", "completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 xl:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[8px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
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

            <div className="grid gap-3 sm:gap-4">
              {isLoading ? (
                <div className="p-16 sm:p-20 flex flex-col items-center justify-center gap-4">
                   <Loader2 className="animate-spin text-yellowColor" size={40} />
                   <div className="font-black uppercase text-[9px] sm:text-[10px] tracking-widest text-gray-400">Sincronizando Datacenter...</div>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="bg-white/50 border-2 border-black/5 border-dashed p-10 sm:p-16 rounded-[1.5rem] sm:rounded-[2rem] text-center italic text-gray-400 font-bold text-xs sm:text-sm">
                  No se registran Citas en este estado.
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-2 border-black/5 rounded-[1.2rem] sm:rounded-[1.8rem] p-4 sm:p-6 hover:shadow-xl transition-all group overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto">
                        <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-main border border-black/5 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-yellowColor transition-colors">
                          <Clock size={18} className="sm:w-[20px]"/>
                        </div>
                        <div className="min-w-0 flex-1 sm:flex-none">
                          <h3 className="text-sm sm:text-lg font-black uppercase tracking-tight truncate max-w-[180px] sm:max-w-none">
                            {appt.serviceName || "Consultoría Técnica"}
                          </h3>
                          <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 sm:mt-1">
                            {formatDate(appt.appointmentDate)} — {appt.appointmentTime}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate("/appointment-confirmation", { state: { appointment: appt } })}
                        className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-yellowColor hover:text-black active:scale-95"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* SECCIÓN MENSAJERÍA */}
          <section>
             <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tighter mb-6 sm:mb-8">Historial Mensajeria</h2>
             <div className="bg-white border-2 border-black/5 rounded-[1.2rem] sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left min-w-[280px]">
                     <thead className="bg-black text-white text-[7px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                       <tr>
                           <th className="px-4 sm:px-8 py-4 sm:py-5">Asunto / Evento</th>
                           <th className="px-4 sm:px-8 py-4 sm:py-5">Fecha</th>
                           <th className="px-4 sm:px-8 py-4 sm:py-5 text-right">Acción</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50 font-bold text-[9px] sm:text-[11px] uppercase">
                        {messages.length > 0 ? messages.map((msg) => (
                           <tr key={msg._id || msg.id} className="group hover:bg-yellowColor/5 transition-colors">
                              <td className="px-4 sm:px-8 py-3 sm:py-4 text-gray-700 max-w-[100px] sm:max-w-none truncate">{msg.subject}</td>
                              <td className="px-4 sm:px-8 py-3 sm:py-4 text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                              <td className="px-4 sm:px-8 py-3 sm:py-4 text-right">
                                 <a href={msg.link || "#"} className="inline-flex items-center gap-1 sm:gap-2 text-black hover:text-yellowColor transition-colors">
                                    Ver <ArrowUpRight size={12} className="sm:w-[14px]"/>
                                 </a>
                              </td>
                           </tr>
                        )) : (
                          <tr>
                            <td colSpan="3" className="px-4 sm:px-8 py-8 sm:py-10 text-center text-gray-300 italic text-[10px]">No hay registros en el clúster.</td>
                          </tr>
                        )}
                     </tbody>
                  </table>
                </div>
             </div>
          </section>
        </div>

        {/* ASIDE (STICKY) */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-2 border-black/5 rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 shadow-sm sticky top-6 sm:top-10">
            <h2 className="text-md sm:text-xl font-black uppercase tracking-tighter mb-6 text-center">Contacto Directo</h2>
            
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-main rounded-full flex items-center justify-center mb-3 sm:mb-4 border-2 border-black/5 overflow-hidden ring-4 ring-yellowColor/10">
                  <img 
                    src="https://github.com/NietoDevelooper.png" 
                    alt="Nieto" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                  />
                </div>
                <p className="text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Servicio Asignado</p>
                <h3 className="text-md sm:text-lg font-black uppercase mt-1">Software D T</h3>
                <p className="text-[8px] sm:text-[9px] font-bold text-yellowColor mt-1">Colombia</p>
            </div>

            <div className="space-y-4">
               <div className="bg-main/30 border border-black/5 p-4 sm:p-5 rounded-2xl relative">
                  <div className="text-yellowColor text-[7px] sm:text-[8px] font-black uppercase mb-2 tracking-widest">Nota_Sincronización</div>
                  <p className="text-[10px] sm:text-[12px] font-medium leading-relaxed italic text-gray-600">
                    "{user?.adminMessage || `Bienvenido, ${user?.name || 'Cliente'}. Tu racha de actividad está siendo monitoreada desde Bogotá.`}"
                  </p>
                  <div className="absolute -right-1 -top-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 sm:border-4 border-white animate-pulse"></div>
               </div>

               <div className="pt-2 sm:pt-4 space-y-3">
                  <a href="https://wa.me/573115456209" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#25D366] text-white rounded-xl hover:scale-[1.02] transition-all shadow-md group">
                     <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">WhatsApp Soporte</span>
                     <MessageCircle size={16} className="sm:w-[18px] group-hover:rotate-12 transition-transform" />
                  </a>
                  <button onClick={handleMensajeDirecto} className="w-full flex items-center justify-between p-3 sm:p-4 bg-black text-white rounded-xl transition-all duration-300 hover:bg-yellowColor hover:text-black hover:-translate-y-1 shadow-lg">
                     <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">E-mail Corporativo</span>
                     <Mail size={16} className="sm:w-[18px]" />
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