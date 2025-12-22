import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { 
  Calendar, Clock, MessageSquare, ChevronRight, LayoutDashboard, 
  Bell, User, PlusCircle, ExternalLink, Mail, MessageCircle, XCircle, CheckCircle2
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Historial de mensajes (Inbox) - Puedes conectar esto a un endpoint similar
  const [messages, setMessages] = useState([
    { id: 1, type: "email", subject: "Ticket: Error en Despliegue", date: "2025-12-21", status: "Procesado" },
    { id: 2, type: "whatsapp", subject: "Consulta VIP Soporte", date: "2025-12-22", status: "Leído" },
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Usamos la URL de producción o local según el entorno
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const userId = user?._id || user?.id;
        
        if (!userId) return;

        // Petición real a la base de datos
        const response = await fetch(`${apiUrl}/appointments/user/${userId}`);
        
        if (!response.ok) {
          throw new Error("Fallo en la sincronización con la base de datos.");
        }

        const data = await response.json();
        
        // Ajustamos la respuesta según la estructura de tu backend
        const list = Array.isArray(data) ? data : (data.appointments || []);
        setAppointments(list);
      } catch (err) {
        setError(err.message);
        console.error("Database Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchAppointments();
  }, [user]);

  // Lógica de filtrado basada en la base de datos
  const filteredAppointments = appointments.filter(appt => {
    const status = appt.status?.toLowerCase() || appt.appointmentDetails?.status?.toLowerCase() || 'pending';
    
    if (activeTab === "pending") return ["pending", "active", "scheduled"].includes(status);
    if (activeTab === "completed") return ["completed", "taken", "finished"].includes(status);
    if (activeTab === "cancelled") return ["cancelled", "rejected"].includes(status);
    return true;
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-main">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-[5px] border-black border-t-yellowColor rounded-full animate-spin"></div>
        <p className="text-black font-black uppercase tracking-[0.4em] text-[10px]">fetching_database_logs...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-main pb-20 font-sans text-black antialiased">
      
      {/* HEADER: SOFTWARE DT COMMAND CENTER */}
      <div className="bg-white border-b-4 border-black pt-12 pb-10 px-6 sm:px-12">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-black"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Client Environment</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-headingColor uppercase tracking-tighter leading-[0.8]">
              Control <span className="text-yellowColor">Panel</span>
            </h1>
          </div>
          
          <Link 
            to="/services" 
            className="group flex items-center gap-3 bg-yellowColor text-black border-[3px] border-black px-10 py-5 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <PlusCircle size={20} />
            Agendar Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 flex flex-col lg:flex-row gap-12">
        
        {/* COLUMNA PRINCIPAL */}
        <div className="w-full lg:w-[65%] space-y-12">
          
          {/* SECCIÓN CITAS DESDE DB */}
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <div className="p-2 bg-black text-yellowColor rounded-lg"><Calendar size={24}/></div>
                Roadmap de Citas
              </h2>
              
              {/* SELECTORES DE ESTADO (TABS) */}
              <div className="flex bg-gray-200 border-[3px] border-black p-1.5 rounded-2xl w-full xl:w-auto">
                {["pending", "completed", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 xl:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {tab === "pending" ? "Pendientes" : tab === "completed" ? "Tomadas" : "Canceladas"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              {filteredAppointments.length === 0 ? (
                <div className="bg-white border-4 border-black border-dashed p-16 rounded-[2.5rem] text-center">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4 text-gray-300"><Calendar size={40}/></div>
                  <p className="text-gray-400 font-black text-xs uppercase tracking-[0.3em]">No se han encontrado registros en la base de datos</p>
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-[3px] border-black rounded-[2.5rem] p-6 hover:shadow-[12px_12px_0px_0px_rgba(254,182,13,0.3)] transition-all group relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6 w-full">
                        <div className={`w-16 h-16 border-2 border-black rounded-2xl flex items-center justify-center shrink-0 ${activeTab === 'cancelled' ? 'bg-red-50 text-red-500' : 'bg-main text-black group-hover:bg-yellowColor'}`}>
                          {activeTab === 'cancelled' ? <XCircle size={30}/> : <Clock size={30}/>}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[9px] font-black bg-black text-white px-2 py-0.5 rounded uppercase tracking-tighter">
                               ID: {appt._id?.slice(-6)}
                             </span>
                          </div>
                          <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-2">
                            {appt.serviceName || "Consultoría Software"}
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            <span className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase"><Calendar size={14} className="text-black"/> {appt.appointmentDetails?.date}</span>
                            <span className="flex items-center gap-2 text-[11px] font-bold text-gray-500 uppercase"><Clock size={14} className="text-black"/> {appt.appointmentDetails?.time}</span>
                          </div>
                        </div>
                      </div>
                      <Link 
                        to={`/appointment-confirmation`}
                        className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-yellowColor hover:text-black border-2 border-black transition-all flex items-center justify-center gap-2"
                      >
                        Detalles <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* COMMUNICATION LOGS (Auditoría de Mensajes) */}
          <section>
             <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3 mb-8">
                <div className="p-2 bg-black text-yellowColor rounded-lg"><MessageSquare size={24}/></div>
                Communication Logs
             </h2>
             <div className="bg-white border-[3px] border-black rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead className="bg-black text-white text-[10px] font-black uppercase tracking-[0.3em]">
                         <tr>
                            <th className="px-8 py-5 text-left">Protocolo</th>
                            <th className="px-8 py-5 text-left">Asunto</th>
                            <th className="px-8 py-5 text-left">Timestamp</th>
                            <th className="px-8 py-5 text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-gray-100">
                         {messages.map((msg) => (
                            <tr key={msg.id} className="hover:bg-yellowColor/5 transition-colors font-bold text-[11px] uppercase tracking-wider">
                               <td className="px-8 py-5">
                                  {msg.type === 'email' ? <Mail size={18} className="text-blue-600"/> : <MessageCircle size={18} className="text-green-600"/>}
                               </td>
                               <td className="px-8 py-5 text-black font-black">{msg.subject}</td>
                               <td className="px-6 py-5 text-gray-400">{msg.date}</td>
                               <td className="px-8 py-5 text-right">
                                  <span className="bg-gray-100 border border-black/10 px-3 py-1 rounded-full text-[9px] font-black">{msg.status}</span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </section>
        </div>

        {/* COLUMNA LATERAL (PROFILE & SUPPORT) */}
        <aside className="w-full lg:w-[35%] space-y-8">
          <div className="bg-card border-[4px] border-black rounded-[3rem] p-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] sticky top-10 transition-transform hover:-translate-y-1">
            <div className="flex flex-col items-center text-center mb-10">
               <div className="w-24 h-24 bg-yellowColor border-4 border-black rounded-[2rem] flex items-center justify-center mb-6 shadow-lg -rotate-3">
                  <User size={48} strokeWidth={3} />
               </div>
               <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.5em] mb-2">Verified_User</span>
               <h3 className="text-2xl font-black break-all uppercase tracking-tighter text-headingColor leading-none">{user?.email?.split('@')[0]}</h3>
            </div>

            <div className="space-y-6">
               <div className="bg-main border-[3px] border-black p-6 rounded-[2rem] relative">
                  <div className="absolute -top-4 left-6 bg-black text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest">Dev_Note</div>
                  <p className="text-[13px] font-bold leading-relaxed italic text-gray-700">
                    "{user?.adminMessage || "Tu infraestructura está siendo optimizada. Revisa el roadmap para próximos sprints."}"
                  </p>
               </div>

               <div className="pt-8 space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">High_Priority_Channels</h4>
                  <a href={`https://wa.me/573001234567?text=Hola,%20soy%20${user?.email}.%20Necesito%20soporte.`} className="w-full flex items-center justify-between p-5 bg-green-50 border-[3px] border-black rounded-2xl hover:bg-yellowColor transition-all group">
                     <span className="text-[11px] font-black uppercase tracking-widest">WhatsApp Direct</span>
                     <MessageCircle size={22} className="text-green-600 group-hover:text-black transition-colors" />
                  </a>
                  <Link to="/contact" className="w-full flex items-center justify-between p-5 bg-blue-50 border-[3px] border-black rounded-2xl hover:bg-yellowColor transition-all group">
                     <span className="text-[11px] font-black uppercase tracking-widest">Deploy Ticket</span>
                     <Mail size={22} className="text-blue-600 group-hover:text-black transition-colors" />
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