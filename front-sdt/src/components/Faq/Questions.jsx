import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  const sdtYellow = "#FEB60D"; // Tu yellowColor definido en tailwind.config

  return (
    <section 
      id="questions-section-unique"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* CSS Inyectado para asegurar legibilidad sobre el video sin overlay */}
      <style dangerouslySetInnerHTML={{ __html: `
        #questions-section-unique *, 
        #questions-section-unique p, 
        #questions-section-unique h2, 
        #questions-section-unique span,
        #questions-section-unique button {
          color: #ffffff !important;
          text-decoration: none !important;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* Sombra para resaltar sobre el video */
        }
        #questions-section-unique .text-gold-sdt {
          color: ${sdtYellow} !important;
        }
      `}} />

      {/* 1. VIDEO FULL ANCHO SIN OVERLAY */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-100" // Opacidad al máximo
          src={softlive}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center">
        
        {/* 2. TÍTULO */}
        <h2 className="text-4xl lg:text-6xl font-black tracking-widest text-center mb-20 uppercase">
          Preguntas <span className="text-gold-sdt">Frecuentes</span>
        </h2>

 vará a cabo vía Microsoft TEAMS y tiene una duración estimada de 15 minutos."
              />
              <FaqItem
                question="¿Tienen Atención en todo el país?"
                answer="Sí. Antes de iniciar la construcción del software se agendan reuniones estratégicas. De ser necesario, se realizarán de forma presencial en la ciudad del cliente."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;