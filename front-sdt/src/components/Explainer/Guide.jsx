import { Link } from 'react-router-dom';
import equipo1 from '../../assets/images/equipo1.png';

const Guide = () => {
  return (
    <>
      <section className="bg-card py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-col lg:flex-row gap-16">
            
            {/* TEXTO Y PASOS */}


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