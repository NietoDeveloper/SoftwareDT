import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../API/api.js";
import { 
  PlusCircle, Mail, MessageCircle, ArrowUpRight, Loader2, Save
} from "lucide-react";
import { toast } from "react-hot-toast"; // Asumiendo que usas toast para feedback profesional

             </div>
          </section>
        </div>
-full h-full object-cover" 
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