import { Link } from 'react-router-dom';
import equipo1 from '../../assets/images/equipo1.png';

const Guide = () => {
  return (
    <>
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-col lg:flex-row pb-8 lg:pb-[55px] gap-12">
            
            {/* TEXTO Y PASOS */}
            <div className="xl:w-[670px] order-2 lg:order-1">
              <h2 className="text-[36px] leading-[44px] text-headingColor font-black uppercase tracking-tighter mb-6">
                Agenda tu Cita:
                <br /> <span className="text-gold">Un Ingeniero de Software te Guiará.</span>
              </h2>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Escoge uno de nuestros Servicios",
                  "Asignación de Ingeniero según tu solicitud",
                  "Selecciona la Hora y Fecha",
                  "Mensaje directo al Ingeniero que te asistirá"
                ].map((step, index) => (
                  <li key={index} className="flex items-center gap-4 text-lg text-textColor font-medium">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-gold flex items-center justify-center font-black text-sm">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>

              <Link to="/doctors">
                <button className="px-10 py-4 bg-black text-white font-black uppercase tracking-widest rounded-full 
                  hover:bg-gold hover:text-black hover:shadow-[0_10px_25px_rgba(255,215,0,0.4)] 
                  transition-all duration-300 transform hover:-translate-y-1 active:scale-95">
                  Agenda una Cita
                </button>
              </Link>
            </div>

            {/* IMAGEN DEL EQUIPO */}
            <div className="relative z-10 xl:w-[770px] flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative group">
                {/* Decoración dorada detrás de la foto */}
                <div className="absolute -inset-4 bg-gold/10 rounded-[2.5rem] blur-xl group-hover:bg-gold/20 transition-all duration-500"></div>
                
                <img 
                  src={equipo1} 
                  alt="Equipo Software DT" 
                  className="relative rounded-[2rem] lg:w-4/5 border-4 border-black shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
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