import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../API/api.js";
import { 
  PlusCircle, Mail, MessageCircle, ArrowUpRight, Loader2, Save
} from "lucide-react";
import { toast } from "react-hot-toast"; // Asumiendo que usas toast para feedback profesional

             </div>
          </sect

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