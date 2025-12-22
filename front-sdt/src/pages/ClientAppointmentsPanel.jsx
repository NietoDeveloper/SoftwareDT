import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { 
  Calendar, Clock, MessageSquare, ChevronRight, LayoutDashboard, 
  Bell, User, PlusCircle, ExternalLink, Mail, MessageCircle, XCircle, ArrowUpRight
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para mensajes reales (Integración lista para Backend/EmailJS)
  const [messages, setMessages] = useState([
    { id: 1, type: "email", subject: "Protocolo de Despliegue", date: "2025-12-21", status: "Sent", link: "#" },
    { id: 2, type: "whatsapp", subject: "Ajuste de Credenciales", date: "2025-12-22", status: "Read", link: "https://wa.me/..." },
  ]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const userId = user?._id || user?.id;
        if (!userId) return;

        const response = await fetch(`${apiUrl}/appointments/user/${userId}`);
        if (!response.ok) throw new Error("Fallo en la sincronización.");
        
        const data = await response.json();
        setAppointments(Array.isArray(data) ? data : (data.appointments || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAppointments();
  }, [user]);

  const filteredAppointments = appointments.filter(appt => {
    const status = appt.status?.toLowerCase() || appt.appointmentDetails?.status?.toLowerCase() || 'pending';
    if (activeTab === "pending") return ["pending", "active", "scheduled"].includes(status);
    if (activeTab === "completed") return ["completed", "taken", "finished"].includes(status);
    if (activeTab === "cancelled") return ["cancelled", "rejected"].includes(status);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      
      {/* HEADER: Sombra Gold Suave */}
      <div className="bg-white border-b-4 border-black pt-12 pb-10 px-6 sm:px-12 shadow-[0_10px_40px_rgba(255,215,0,0.15)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FFD700] shadow-[0_0_12px_#FFD700]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Software DT Systems</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-black uppercase tracking-tighter leading-[0.8]">
              Panel <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">Cliente</span>
            </h1>
          </div>
          
          <Link 
            to="/services" 
            className="group flex items-center gap-3 bg-[#FFD700] text-black border-[3px] border-black px-6 py-3 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <PlusCircle size={18} />
            Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 flex flex-col lg:flex-row gap-12">
        
        <div className="w-full lg:w-[65%] space-y-12">
          {/* SECCIÓN ROADMAP */}
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Roadmap de Citas</h2>
              <div className="flex bg-white border-[3px] border-black p-1.5 rounded-2xl shadow-[5px_5px_0px_0px_rgba(255,215,0,0.3)]">
                {["pending", "completed", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? "bg-black text-white shadow-[0_0_15px_rgba(255,215,0,0.4)]" : "text-gray-500 hover:text-black hover:bg-[#FFD700]/10"
                    }`}
                  >
                    {tab === "pending" ? "Pendientes" : tab === "completed" ? "Tomadas" : "Canceladas"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              {filteredAppointments.length === 0 ? (
                <div className="bg-white border-4 border-black border-dashed p-16 rounded-[2.5rem] text-center italic text-gray-400 font-bold shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                  No hay registros en esta categoría
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-[3px] border-black rounded-[2.5rem] p-6 hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] hover:border-[#FFD700] transition-all group shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-[#DCDCDC] border-2 border-black rounded-2xl flex items-center justify-center group-hover:bg-[#FFD700] group-hover:shadow-[0_0_15px_#FFD700] transition-all">
                          {activeTab === 'cancelled' ? <XCircle size={24}/> : <Clock size={24}/>}
                        </div>
                        <div>
                          <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-[#FFD700] transition-colors">{appt.serviceName || "Soporte Técnico"}</h3>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{appt.appointmentDetails?.date} — {appt.appointmentDetails?.time}</p>
                        </div>
                      </div>
                      <Link to="/appointment-confirmation" className="bg-black text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all border-2 border-black">
                        Abrir Ticket
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* LOGS DE COMUNICACIÓN: Actualizado con Hovers y Links */}
          <section>
             <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Communication Logs</h2>
             <div className="bg-white border-[3px] border-black rounded-[2.5rem] overflow-hidden shadow-[10px_10px_40px_rgba(255,215,0,0.1)]">
                <table className="w-full text-left">
                   <thead className="bg-black text-white text-[10px] font-black uppercase tracking-widest">
                      <tr>
                         <th className="px-8 py-6">Canal</th>
                         <th className="px-8 py-6">Asunto</th>
                         <th className="px-8 py-6 text-right">Acción</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y-2 divide-gray-100 font-bold text-xs uppercase">
                      {messages.map((msg) => (
                         <tr key={msg.id} className="group hover:bg-[#FFD700]/10 transition-colors">
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-3">
                                  {msg.type === 'email' ? <Mail size={18} className="text-[#FFD700]"/> : <MessageCircle size={18} className="text-green-500"/>}
                                  <span className="text-[10px] text-gray-400 tracking-tighter">{msg.date}</span>
                               </div>
                            </td>
                            <td className="px-8 py-5 group-hover:translate-x-1 transition-transform">{msg.subject}</td>
                            <td className="px-8 py-5 text-right">
                               <a href={msg.link} className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-[9px] font-black hover:bg-[#FFD700] hover:text-black transition-all shadow-[3px_3px_0px_0px_#FFD700]">
                                  Ver <ArrowUpRight size={12}/>
                               </a>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </section>
        </div>

        {/* ASIDE: Comunicaciones con Sombras Suaves Gold */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-[4px] border-black rounded-[3rem] p-10 shadow-[20px_20px_60px_rgba(255,215,0,0.15)] sticky top-10 border-b-[12px]">
            <div className="flex flex-col items-center text-center mb-10">
               <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Comunicaciones</h2>
               
               <div className="w-24 h-24 bg-[#FFD700] border-4 border-black rounded-[2rem] flex items-center justify-center mb-6 -rotate-3 overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:rotate-0 transition-all duration-500 cursor-pointer">
                  <User size={48} strokeWidth={3} />
               </div>
               
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2 italic">
                 Ingeniero De Software Asignado
               </span>
               <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-[#FFD700]">Manuel Nieto</h3>
            </div>

            <div className="space-y-6">
               <div className="bg-[#DCDCDC] border-[3px] border-black p-6 rounded-[2rem] relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                  <div className="absolute -top-4 left-6 bg-black text-[#FFD700] text-[9px] px-3 py-1 font-black uppercase tracking-widest border border-[#FFD700] shadow-[0_0_10px_#FFD700]">Dev_Note</div>
                  <p className="text-[13px] font-bold leading-relaxed italic text-gray-700 relative z-10">
                    "{user?.adminMessage || "Estatus: Entorno listo para producción. Esperando confirmación de requerimientos."}"
                  </p>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFD700]/5 rounded-full -mr-10 -mt-10"></div>
               </div>

               <div className="pt-8 space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">Canales Directos</h4>
                  
                  {/* Botón WhatsApp */}
                  <a 
                    href={`https://wa.me/573001234567?text=Hola,%20soy%20${user?.email || 'cliente'}.%20Necesito%20soporte.`} 
                    className="w-full flex items-center justify-between p-5 bg-[#25D366] text-white border-[3px] border-black rounded-2xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none group"
                  >
                     <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-[#FFD700]">WhatsApp</span>
                     <MessageCircle size={22} strokeWidth={2.5} className="group-hover:text-[#FFD700]" />
                  </a>

                  {/* Botón EmailJS Ready */}
                  <button 
                    onClick={() => console.log("Llamando a EmailJS Service...")}
                    className="w-full flex items-center justify-between p-5 bg-white border-[3px] border-black rounded-2xl hover:bg-black hover:text-white hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                  >
                     <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-[#FFD700]">Mensaje Directo</span>
                     <Mail size={22} className="group-hover:text-[#FFD700]" />
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