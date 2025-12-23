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
      // AJUSTE 1: Mongoose usa _id, pero tras el login lo normalizamos
      const userId = user?._id || user?.id;
      
      // Si no hay token o user, no intentamos la petición
      if (!userId || !token) {
          // Si ya terminó de cargar el contexto y no hay user, redireccionamos
          return;
      }

      try {
        setIsLoading(true);
        
        // AJUSTE 2: Limpieza del Token. 
        // Si el token ya viene con "Bearer ", no lo duplicamos.
        const cleanToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

        const [apptRes, msgRes] = await Promise.all([
          fetch(`${apiUrl}/appointments/user/${userId}`, {
            headers: { 'Authorization': cleanToken }
          }),
          fetch(`${apiUrl}/messages/user/${userId}`, { 
            headers: { 'Authorization': cleanToken }
          })
        ]);

        if (apptRes.ok) {
          const apptData = await apptRes.json();
          // Software DT espera la propiedad 'appointments' o 'data'
          setAppointments(apptData.appointments || apptData.data || []);
        }

        if (msgRes.ok) {
          const msgData = await msgRes.json();
          setMessages(msgData.messages || msgData.data || []); 
        }

      } catch (err) {
        console.error("❌ Error de sincronización SDT:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, token, apiUrl]);

  // AJUSTE 3: Formateo de fecha para que sea legible en el Panel
  const formatDate = (dateString) => {
    if (!dateString) return "Pendiente";
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options).toUpperCase();
  };

  const handleMensajeDirecto = () => {
    window.location.href = `mailto:admin@softwaredt.com?subject=Soporte Software DT - ${user?.name}`;
  };

  const filteredAppointments = appointments.filter(appt => {
    const status = appt.status?.toLowerCase() || 'pending';
    if (activeTab === "pending") return ["pending", "active", "scheduled"].includes(status);
    if (activeTab === "completed") return ["completed", "taken", "finished"].includes(status);
    if (activeTab === "cancelled") return ["cancelled", "rejected"].includes(status);
    return true;
  });

  return (
    <div className="min-h-screen bg-main pb-20 font-sans text-black antialiased">
      
      {/* HEADER DINÁMICO CON VARIABLE DE COLOR PROPIA */}
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-4 sm:px-12 shadow-[0_4px_30px_rgba(254,182,13,0.1)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-yellowColor shadow-[0_0_10px_rgba(254,182,13,0.5)]"></div>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                SDT-SECURE-ID: {user?._id ? user._id.slice(-8).toUpperCase() : "INVITADO"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-headingColor uppercase tracking-tighter leading-none break-words">
              {user?.name || "Cargando..."}<br/>
              <span className="text-yellowColor">Panel Cliente</span>
            </h1>
          </div>
          
          <Link 
            to="/services" 
            className="w-full md:w-auto group flex items-center justify-center gap-3 bg-yellowColor text-black border-2 border-black px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-lg"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-12 mt-8 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* COLUMNA PRINCIPAL (CITAS) */}
        <div className="w-full lg:w-[65%] space-y-12">
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Historial de Transacciones</h2>
              <div className="flex flex-wrap gap-2 bg-white border-2 border-black/10 p-1.5 rounded-2xl shadow-sm w-full xl:w-auto">
                {["pending", "completed", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 xl:flex-none px-3 sm:px-5 py-2.5 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? "bg-yellowColor text-black shadow-inner" : "text-gray-400 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {tab === "pending" ? "Proceso" : tab === "completed" ? "Hechas" : "Cancel"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                <div className="p-20 flex flex-col items-center justify-center gap-4">
                   <Loader2 className="animate-spin text-yellowColor" size={40} />
                   <div className="font-black uppercase text-[10px] tracking-widest text-gray-400">Sincronizando Datacenter...</div>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="bg-white/50 border-2 border-black/5 border-dashed p-10 sm:p-16 rounded-[2rem] text-center italic text-gray-400 font-bold text-sm">
                  No se registran transacciones en este estado.
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-2 border-black/5 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 hover:shadow-xl transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <div className="shrink-0 w-12 h-12 bg-main border border-black/5 rounded-xl flex items-center justify-center group-hover:bg-yellowColor transition-colors">
                          {activeTab === 'cancelled' ? <XCircle size={20}/> : <Clock size={20}/>}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight truncate">{appt.serviceName || "Consultoría Técnica"}</h3>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {formatDate(appt.appointmentDate)} — {appt.appointmentTime}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate("/appointment-confirmation", { state: { appointment: appt } })}
                        className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-yellowColor hover:text-black transition-all"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* REGISTROS DE ACTIVIDAD DINÁMICOS */}
          <section>
             <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-8">Logs de Actividad SDT</h2>
             <div className="bg-white border-2 border-black/5 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[300px]">
                     <thead className="bg-black text-white text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em]">
                       <tr>
                           <th className="px-6 sm:px-8 py-5">Asunto / Evento</th>
                           <th className="px-6 sm:px-8 py-5">Fecha</th>
                           <th className="px-6 sm:px-8 py-5 text-right">Acción</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50 font-bold text-[10px] sm:text-[11px] uppercase">
                        {messages.length > 0 ? messages.map((msg) => (
                           <tr key={msg._id || msg.id} className="group hover:bg-yellowColor/5 transition-colors">
                              <td className="px-6 sm:px-8 py-4 text-gray-700 max-w-[150px] sm:max-w-none truncate">{msg.subject}</td>
                              <td className="px-6 sm:px-8 py-4 text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                              <td className="px-6 sm:px-8 py-4 text-right">
                                 <a href={msg.link || "#"} className="inline-flex items-center gap-2 text-black hover:text-yellowColor transition-colors">
                                    Ver <ArrowUpRight size={14}/>
                                 </a>
                              </td>
                           </tr>
                        )) : (
                          <tr>
                            <td colSpan="3" className="px-8 py-10 text-center text-gray-300 italic">No hay registros de comunicación en el clúster.</td>
                          </tr>
                        )}
                     </tbody>
                  </table>
                </div>
             </div>
          </section>
        </div>

        {/* ASIDE - INFO DEL INGENIERO CON FOTO DINÁMICA */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-2 border-black/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm sticky top-10">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-6 text-center">Canal Directo</h2>
            
            <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 bg-main rounded-full flex items-center justify-center mb-4 border-2 border-black/5 overflow-hidden ring-4 ring-yellowColor/10">
                  <img 
                    src="https://github.com/NietoDevelooper.png" 
                    alt="Nieto" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150" }}
                  />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ingeniero Senior Asignado</p>
                <h3 className="text-lg font-black uppercase mt-1">Nieto Developer</h3>
                <p className="text-[9px] font-bold text-yellowColor mt-1">Nivel: #3 Committers Colombia</p>
            </div>

            <div className="space-y-4">
               <div className="bg-main/30 border border-black/5 p-4 sm:p-5 rounded-2xl relative">
                  <div className="text-yellowColor text-[8px] font-black uppercase mb-2 tracking-widest">Nota_Sincronización</div>
                  <p className="text-[11px] sm:text-[12px] font-medium leading-relaxed italic text-gray-600">
                    "{user?.adminMessage || `Bienvenido, ${user?.name}. Tu racha de actividad está siendo monitoreada desde Bogotá.`}"
                  </p>
                  <div className="absolute -right-2 -top-2 w-4 h-4 bg-green-500 rounded-full border-4 border-white animate-pulse"></div>
               </div>

               <div className="pt-4 space-y-3">
                  <a href="https://wa.me/573115456209" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-4 bg-[#25D366] text-white rounded-xl hover:scale-[1.02] transition-all shadow-md group">
                     <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">WhatsApp Soporte</span>
                     <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                  </a>
                  <button onClick={handleMensajeDirecto} className="w-full flex items-center justify-between p-4 bg-black text-white rounded-xl hover:bg-yellowColor hover:text-black transition-all shadow-lg">
                     <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">E-mail Corporativo</span>
                     <Mail size={18} />
                  </button>
               </div>
            </div>
          </div>
        </aside>
      </div>
      
      {/* ... (Footer de Ficha Técnica se mantiene igual) */}
    </div>
  );
};

export default ClientAppointmentsPanel;