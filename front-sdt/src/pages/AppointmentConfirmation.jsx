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
                <p className="text-gold font-bold text-xs sm:text-sm mt-1">{displayData.price}</p>
             </div>
 
          <DetailItem 

      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-black uppercase tracking-[0.4em] opacity-40">
          SDT-SYSTEM-CONFIRMATION • 2025 • BOGOTÁ D.C.
        </p>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-5 sm:p-6 bg-white border-2 border-black/5 rounded-3xl transition-all hover:bg-main/20 hover:border-black/10">
    <div className="text-black group-hover:text-gold transition-all mr-5 bg-main p-4 rounded-2xl group-hover:bg-black group-hover:rotate-[360deg] duration-700 flex-shrink-0">
      {icon}
    </div>
    <div className="flex flex-col min-w-0">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-sm sm:text-base font-black text-black uppercase leading-tight truncate">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;