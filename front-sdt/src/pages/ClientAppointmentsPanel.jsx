import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { 
  Clock, PlusCircle, User, Mail, MessageCircle, XCircle, ArrowUpRight, Phone, Fingerprint
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);

  const [messages] = useState([
    { id: 1, type: "email", subject: "Protocolo de Despliegue", date: "2025-12-21", status: "Sent", link: "#" },
    { id: 2, type: "whatsapp", subject: "Ajuste de Credenciales", date: "2025-12-22", status: "Read", link: "#" },
  ]);

  const handleMensajeDirecto = () => {
    console.log("Iniciando EmailJS: Sistema de mensajes Software DT");
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const userId = user?._id || user?.id;
        
        if (!userId) return;

        const response = await fetch(`${apiUrl}/appointments/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Fallo en la sincronización.");
        
        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAppointments();
  }, [user, token]);

  const filteredAppointments = appointments.filter(appt => {
    const status = appt.status?.toLowerCase() || 'pending';
    if (activeTab === "pending") return ["pending", "active", "scheduled"].includes(status);
    if (activeTab === "completed") return ["completed", "taken", "finished"].includes(status);
    if (activeTab === "cancelled") return ["cancelled", "rejected"].includes(status);
    return true;
  });

  return (
    <div className="min-h-screen bg-main pb-20 font-sans text-black antialiased">
      
      {/* HEADER DINÁMICO */}
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-4 sm:px-12 shadow-[0_4px_30px_rgba(255,215,0,0.1)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2 w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-gold shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-gray-400">Software DT Secure ID</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black uppercase tracking-tighter leading-none break-words">
              {user?.name || user?.fullName || "Usuario SDT"}<br/>
              <span className="text-gold">Panel de Gestión</span>
            </h1>
          </div>
          
          <Link 
            to="/services" 
            className="w-full md:w-auto group flex items-center justify-center gap-3 bg-gold text-black border-2 border-black px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-xl"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-12 mt-8 sm:mt-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* COLUMNA PRINCIPAL */}
        <div className="w-full lg:w-[65%] space-y-12">
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">Historial de Citas</h2>
              {/* Tabs ajustadas para pantallas pequeñas */}
              <div className="flex flex-wrap gap-2 bg-white border-2 border-black/10 p-1.5 rounded-2xl shadow-sm w-full xl:w-auto">
                {["pending", "completed", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 xl:flex-none px-3 sm:px-5 py-2.5 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? "bg-gold text-black shadow-inner" : "text-gray-400 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {tab === "pending" ? "Proceso" : tab === "completed" ? "Hechas" : "Cancel"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                <div className="p-10 text-center font-black uppercase text-[10px] animate-pulse">Sincronizando Datacenter...</div>
              ) : filteredAppointments.length === 0 ? (
                <div className="bg-white/50 border-2 border-black/5 border-dashed p-10 sm:p-16 rounded-[2rem] text-center italic text-gray-400 font-bold text-sm">
                  No se registran transacciones.
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-2 border-black/5 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 hover:shadow-xl transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <div className="shrink-0 w-12 h-12 bg-main border border-black/5 rounded-xl flex items-center justify-center group-hover:bg-gold transition-colors">
                          {activeTab === 'cancelled' ? <XCircle size={20}/> : <Clock size={20}/>}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-black uppercase tracking-tight truncate">{appt.serviceName || "Consultoría Técnica"}</h3>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            {appt.appointmentDate} — {appt.appointmentTime}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate("/appointment-confirmation", { state: { appointment: appt, doctor: appt.doctorId, userName: user?.name } })}
                        className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
                      >
                        Ver Detalle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* COMMUNICATION LOGS - Responsive Table */}
          <section>
             <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-8">Registros</h2>
             <div className="bg-white border-2 border-black/5 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[300px]">
                     <thead className="bg-black text-white text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em]">
                       <tr>
                           <th className="px-6 sm:px-8 py-5">Asunto</th>
                           <th className="px-6 sm:px-8 py-5 text-right">Acción</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50 font-bold text-[10px] sm:text-[11px] uppercase">
                        {messages.map((msg) => (
                           <tr key={msg.id} className="group hover:bg-gold/5 transition-colors">
                              <td className="px-6 sm:px-8 py-4 text-gray-700 max-w-[150px] sm:max-w-none truncate">{msg.subject}</td>
                              <td className="px-6 sm:px-8 py-4 text-right">
                                 <a href={msg.link} className="inline-flex items-center gap-2 text-black hover:text-gold transition-colors">
                                    Ver <ArrowUpRight size={14}/>
                                 </a>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
             </div>
          </section>
        </div>

        {/* ASIDE */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-2 border-black/5 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm sticky top-10">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-6 text-center">Canales Directos</h2>
            
            <div className="flex flex-col items-center text-center mb-8">
               <div className="w-20 h-20 bg-main rounded-full flex items-center justify-center mb-4 border-2 border-black/5 overflow-hidden">
                  <User size={35} className="text-gray-400" />
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ingeniero Asignado</p>
               <h3 className="text-lg font-black uppercase mt-1">Nieto Developer</h3>
            </div>

            <div className="space-y-4">
               <div className="bg-main/30 border border-black/5 p-4 sm:p-5 rounded-2xl">
                  <div className="text-yellowColor text-[8px] font-black uppercase mb-2 tracking-widest">Nota_del_Ingeniero</div>
                  <p className="text-[11px] sm:text-[12px] font-medium leading-relaxed italic text-gray-600">
                    "{user?.adminMessage || "Estatus: Entorno listo. Software DT monitoreando actividad."}"
                  </p>
               </div>

               <div className="pt-4 space-y-3">
                  <a href="https://wa.me/573115456209" target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-4 bg-[#25D366] text-white rounded-xl hover:opacity-90 transition-all shadow-md group">
                     <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">WhatsApp Soporte</span>
                     <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                  <button onClick={handleMensajeDirecto} className="w-full flex items-center justify-between p-4 bg-black text-white rounded-xl hover:bg-gold hover:text-black transition-all shadow-lg">
                     <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">E-mail Corporativo</span>
                     <Mail size={18} />
                  </button>
               </div>
            </div>
          </div>
        </aside>
      </div>

      {/* FOOTER */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-12 mt-16">
        <div className="bg-black text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none hidden sm:block">
            <Fingerprint size={300} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-gold text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">Ficha Técnica del Cliente</p>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter">{user?.name || "No Registrado"}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:col-span-2 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl shrink-0"><Mail className="text-gold" size={20}/></div>
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Email Registrado</p>
                  <p className="text-xs sm:text-sm font-bold truncate">{user?.email || "Sin asignar"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl shrink-0"><Phone className="text-gold" size={20}/></div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Contacto Directo</p>
                  <p className="text-xs sm:text-sm font-bold">{user?.phone || "No especificado"}</p>
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