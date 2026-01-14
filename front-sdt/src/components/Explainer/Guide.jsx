import { Link } from 'react-router-dom';
import equipo1 from '../../assets/images/equipo1.png';

const Guide = () => {
  return (
    <>
      <section className="bg-card py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-col lg:flex-row gap-16">
            
            {/* TEXTO Y PASOS */}
            <div className="xl:w-[670px] order-2 lg:order-1">
              <h2 className="text-[32px] md:text-[42px] leading-tight text-headingColor font-black uppercase tracking-[0.1em] mb-8">
                Agenda tu Cita:
                <br /> <span className="text-gold">Un Ingeniero De Software te Guiará</span>
              </h2>
              
              {/* LISTA DE PASOS CON PUNTOS DISCRETOS */}
              <ul className="space-y-6 mb-12">
                {[
                  "Escoge uno de nuestros Servicios",
                  "Asignación de Servicio De Software según tu solicitud",
                  "Selecciona la Hora y Fecha",
                  "Mensaje directo al Ingeniero De Software que te asistirá"
                ].map((step, index) => (
                  <li key={index} className="flex items-center gap-6 group">
                    {/* Punto indicador discreto estilo Software DT */}
                    <div className="relative flex items-center justify-center">
                       <div className="w-2 h-2 bg-gold rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                       <div className="absolute w-4 h-4 border border-gold/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    
                    <span className="text-textColor font-bold tracking-wide uppercase text-sm md:text-base opacity-70 group-hover:opacity-100 transition-all duration-300">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to="/services">
                {/* BOTÓN ESTILO SOFTWARE DT (ESTÁNDAR UNIFICADO) */}
                <button 
                  className="w-56 h-14 bg-black text-white text-xl font-black uppercase tracking-tighter 
                             rounded-full transition-all duration-400 shadow-2xl active:scale-95
                             hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1.5 
                             hover:shadow-[0_0_30px_rgba(254,182,13,0.8)]"
                >
                  Iniciar Proceso
                </button>
              </Link>
            </div>

            {/* IMAGEN DEL EQUIPO CON ESTILO DT */}
            <div className="relative z-10 xl:w-[650px] flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative group">
                {/* Decoración geométrica minimalista */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/50 rounded-tr-[2rem] z-0"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-black/20 rounded-bl-[2rem] z-0"></div>
                
                <img 
                  src={equipo1} 
                  alt="Equipo Software DT" 
                  className="relative rounded-[1.5rem] w-full max-w-[500px] object-cover border border-black/5 shadow-[20px_20px_60px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:scale-[1.02] z-10" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Guide;