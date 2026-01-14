import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  const sdtGold = "#FFD700";

  return (

              <FaqItem
                question="¿Es presencial o virtual la cita?"
                answer="Virtual. La reunión se llevará a cabo vía Microsoft TEAMS y tiene una duración estimada de 15 minutos."
              />
              <FaqItem
                question="¿Tienen Atención en todo el país?"
                answer="Sí. Antes de iniciar la construcción del software se agendan reuniones estratégicas. De ser necesario, se realizarán de forma presencial en la ciudad del cliente."
              />
            </div>
            
            <div className="mt-16 flex flex-col items-center lg:items-start">
               <p className="text-[14px] font-black tracking-[0.6em] uppercase" style={{color: sdtGold}}>
                 Dorado Technologies
               </p>
               <div className="w-16 h-[2px] bg-white/50 mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;