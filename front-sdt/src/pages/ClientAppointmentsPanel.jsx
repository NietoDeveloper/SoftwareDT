import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { 
  Clock, PlusCircle, User, Mail, MessageCircle, XCircle, ArrowUpRight
} from "lucide-react";

const ClientAppointmentsPanel = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [isLoading, setIsLoading] = useState(true);

  // Mensajes estáticos para la tabla de logs (puedes conectarlos a una API después)
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
        // Sincronización con la estructura { success: true, appointments: [] }
        setAppointments(data.appointments || []);
      } catch (err) {
        console.error("Error fetching appointments:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAppointments();
  }, [user, token]);

  // Lógica de filtrado por estados según el tab activo
  const filteredAppointments = appointments.filter(appt => {
    const status = appt.appointmentDetails?.status?.toLowerCase() || appt.status?.toLowerCase() || 'pending';
    if (activeTab === "pending") return ["pending", "active", "scheduled"].includes(status);
    if (activeTab === "completed") return ["completed", "taken", "finished"].includes(status);
    if (activeTab === "cancelled") return ["cancelled", "rejected"].includes(status);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#DCDCDC] pb-20 font-sans text-black antialiased">
      
      {/* HEADER */}
      <div className="bg-white border-b-2 border-black/5 pt-12 pb-10 px-6 sm:px-12 shadow-[0_4px_30px_rgba(255,215,0,0.1)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-1 bg-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Software DT Systems</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-black uppercase tracking-tighter leading-[0.8]">
              Panel <span className="text-[#FFD700] drop-shadow-[0_0_10_rgba(255,215,0,0.3)]">Cliente</span>
            </h1>
          </div>
          
          <Link 
            to="/services" 
            className="group flex items-center gap-3 bg-[#FFD700] text-black border-2 border-black px-5 py-2 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,215,0,0.3)] hover:shadow-[0_10px_25px_rgba(255,215,0,0.5)] hover:-translate-y-1 active:scale-95"
          >
            <PlusCircle size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            Nueva Cita
          </Link>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 mt-12 flex flex-col lg:flex-row gap-12">
        
        <div className="w-full lg:w-[65%] space-y-12">
          {/* ROADMAP SECCIÓN */}
          <section>
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Roadmap de Citas</h2>
              <div className="flex bg-white border-2 border-black/10 p-1 rounded-xl shadow-sm">
                {["pending", "completed", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab ? "bg-[#FFD700] text-black shadow-[0_4px_10px_rgba(255,215,0,0.2)]" : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {tab === "pending" ? "Pendientes" : tab === "completed" ? "Tomadas" : "Canceladas"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                <div className="p-10 text-center font-black uppercase text-[10px] animate-pulse">Sincronizando Datacenter...</div>
              ) : filteredAppointments.length === 0 ? (
                <div className="bg-white/50 border-2 border-black/5 border-dashed p-16 rounded-[2rem] text-center italic text-gray-400 font-bold">
                  No hay registros activos en esta categoría
                </div>
              ) : (
                filteredAppointments.map((appt) => (
                  <div key={appt._id} className="bg-white border-2 border-black/5 rounded-[2rem] p-6 hover:shadow-[0_10px_30px_rgba(255,215,0,0.12)] transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-[#DCDCDC]/50 border border-black/5 rounded-xl flex items-center justify-center group-hover:bg-[#FFD700] transition-colors">
                          {activeTab === 'cancelled' ? <XCircle size={20}/> : <Clock size={20}/>}
                        </div>
                        <div>
                          <h3 className="text-lg font-black uppercase tracking-tight">{appt.serviceName || "Consultoría Técnica"}</h3>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                            {appt.appointmentDetails?.date} — {appt.appointmentDetails?.time}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate("/appointment-confirmation", { state: { appointment: appt, service: { title: appt.serviceName } } })}
                        className="bg-black text-white px-6 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(255,215,0,0.3)]"
                      >
                        Abrir Ticket
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* COMMUNICATION LOGS */}
          <section>
             <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Communication Logs</h2>
             <div className="bg-white border-2 border-black/5 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                   <thead className="bg-black text-white text-[9px] font-black uppercase tracking-[0.2em]">
                     <tr>
                         <th className="px-8 py-5">Asunto</th>
                         <th className="px-8 py-5 text-right">Acción</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50 font-bold text-[11px] uppercase">
                      {messages.map((msg) => (
                         <tr key={msg.id} className="group hover:bg-[#FFD700]/5 transition-colors">
                            <td className="px-8 py-4 text-gray-700">{msg.subject}</td>
                            <td className="px-8 py-4 text-right">
                               <a href={msg.link} className="inline-flex items-center gap-2 text-black hover:text-[#FFD700] transition-colors">
                                  Ver <ArrowUpRight size={14}/>
                               </a>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </section>
        </div>

        {/* ASIDE (PERFIL DE INGENIERO ASIGNADO) */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sticky top-10">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-6 text-center">Comunicaciones</h2>
            
            <div className="flex flex-col items-center text-center mb-8">
               <div className="w-20 h-20 bg-[#DCDCDC] rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-black/5 overflow-hidden">
                  <User size={35} className="text-gray-400" />
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Ingeniero De Software Asignado
               </p>
               <h3 className="text-lg font-black uppercase mt-1">Manuel Nieto</h3>
            </div>

            <div className="space-y-4">
               <div className="bg-[#DCDCDC]/30 border border-black/5 p-5 rounded-2xl">
                  <div className="text-[#FEB60D] text-[8px] font-black uppercase mb-2 tracking-widest">Dev_Note</div>
                  <p className="text-[12px] font-medium leading-relaxed italic text-gray-600">
                    "{user?.adminMessage || "Estatus: Entorno listo. Esperando confirmación de requerimientos."}"
                  </p>
               </div>

               <div className="pt-4 space-y-3">
                  <a 
                    href="https://wa.me/573115456209" 
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-between p-4 bg-[#25D366] text-white rounded-xl hover:opacity-90 transition-all shadow-md group"
                  >
                     <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp Directo</span>
                     <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                  </a>

                  <button 
                    onClick={handleMensajeDirecto}
                    className="w-full flex items-center justify-between p-4 bg-black text-white rounded-xl hover:bg-[#FFD700] hover:text-black transition-all shadow-lg"
                  >
                     <span className="text-[10px] font-black uppercase tracking-widest">Mensaje de Sistema</span>
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