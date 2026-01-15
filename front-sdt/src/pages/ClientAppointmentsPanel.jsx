import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../API/api.js";
import { 
  PlusCircle, Mail, MessageCircle, ArrowUpRight, Loader2, Save
} from "lucide-react";
import { toast } from "react-hot-toast"; // Asumiendo que usas toast para feedback profesional

const ClientAppointmentsPanel = () => {
  const { user, token, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

s>lassName="px-6 sm:px-8 py-5 text-right">Acción</th>
                       </tr>
                     </thead>
                     <tbody
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

        {/* ASIDE (Ajustado para control de mensajes y estilo SDT) */}
        <aside className="w-full lg:w-[35%]">
          <div className="bg-white border-2 border-black/5 rounded-[1.8rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-sm lg:sticky lg:top-10">
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tighter mb-8 text-center">Centro de Control</h2>
            
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
               {/* NUEVO: Área de Configuración de Mensajes (Lo que pediste guardar) */}
               <div className="bg-main/30 border-2 border-black/5 p-5 rounded-2xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[8px] font-black text-yellowColor uppercase tracking-widest">Plantilla WhatsApp</span>
                    {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} className="text-gray-400" />}
                  </div>
                  <textarea 
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="Escribe tu mensaje predefinido aquí..."
                    className="w-full bg-white border border-black/5 rounded-xl p-3 text-[11px] font-bold focus:ring-2 ring-yellowColor/20 outline-none resize-none h-24"
                  />
                  <button 
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="w-full mt-3 bg-black text-white text-[9px] font-black uppercase py-3 rounded-xl hover:bg-yellowColor hover:text-black transition-all"
                  >
                    Sincronizar Mensaje
                  </button>
               </div>

               <div className="pt-4 space-y-3">
                  <a href={`https://wa.me/573115456209?text=${encodeURIComponent(customMessage)}`} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between p-4 bg-[#25D366] text-white rounded-xl hover:scale-[1.02] transition-all shadow-md group">
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