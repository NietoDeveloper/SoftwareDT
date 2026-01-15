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
            icon={<CircleUser className="h-5 w-5 sm:h-6 sm:w-6" />} 


        <div className="w-full mt-10 p-6 sm:p-10 bg-black text-white rounded-[2rem] relative group">
          <div className="absolute top-4 right-6 text-gold/20 font-black text-4xl opacity-20">"</div>
          <p className="text-[9px] font-black text-gold uppercase tracking-[0.3em] mb-4">Especificaciones del Cliente</p>
          <p className="text-white font-bold text-base sm:text-xl leading-relaxed italic pr-4">
            {displayData.reason}
          </p>
        </div>

        <div className="w-full mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link
            to="/client-appointments" 
            className="group flex items-center justify-center gap-4 py-5 px-10 bg-black text-white font-black rounded-2xl transition-all hover:bg-gold hover:text-black hover:-translate-y-1 uppercase text-[11px] tracking-widest w-full sm:w-auto shadow-2xl"
          >
            Panel de Control
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
          
          <Link
            to="/services"
            className="py-5 px-10 bg-white text-black border-4 border-black font-black rounded-2xl transition-all hover:bg-main uppercase text-[11px] tracking-widest w-full sm:w-auto text-center"
          >
            Nuevo Servicio
          </Link>
        </div>
      </div>
      
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