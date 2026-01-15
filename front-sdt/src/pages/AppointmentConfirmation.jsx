/* eslint-disable react/no-unescaped-entities */
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react"; // Añadido useContext
import { UserContext } from "../context/UserContext.jsx"; // Importamos el contexto
import {
  Calendar,
  C rounded-2xl bg-gold text-black transition-all group-hover:rotate-12 flex-shrink-0">
               <ShieldCheck size={24} className="sm:w-8 sm:h-8" />
             </div>
             <div className="ml-5 min-w-0">
                <p className="text-[9px] font-black text-gold uppercase tracking-widest">Protocolo Activo</p>
                <h2 className="text-lg sm:text-xl font-black uppercase truncate">{displayData.serviceName}</h2>

    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-sm sm:text-base font-black text-black uppercase leading-tight truncate">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;