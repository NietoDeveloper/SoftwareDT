import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  return (
    <section 
      id="questions-section-dt"
      className="questions-section relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden"
    >
      {/* CSS Encapsulado: Solo afecta a lo que esté dentro de #questions-section-dt */}
      <style dangerouslySetInnerHTML={{ __html: `
        #questions-section-dt h2, 
        #questions-section-dt p, 
        #questions-section-dt span:not(.text-gold),
        #questions-section-dt .faq-item,
        #questions-section-dt button {
          color: #ffffff !important;
          text-shadow: none !important;
        }

        #questions-section-dt .text-gold, 
        #questions-section-dt .text-gold span {
          color: #FEB60D !important;
        }

        /* Asegura que el video no se escape de esta sección */
        #questions-section-dt video {
          pointer-events: none;
        }
      `}} />

      {/* VIDEO FONDO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        src={softlive}
      />
      
      {/* OVERLAY SUTIL */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
        
        {/* TÍTULO */}
        <h2 className="text-4xl lg:text-7xl font-black tracking-[0.2em] text-center mb-16 uppercase">
          Preguntas <span className="text-gold">Frecuentes</span>
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 w-full max-w-7xl">
          
          {/* IMAGEN EQUIPO */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-white/10 rounded-[2.5rem] blur-2xl group-hover:bg-gold/20 transition duration-500"></div>
            <img 
              src={equipo2} 
              alt="equipo software dt" 
              className="relative rounded-[2rem] w-full h-auto object-cover border-2 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]" 
            />
          </div>

          {/* ACORDEÓN FAQ */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-xl space-y-6">
              <FaqItem
                question="¿Tiene algún costo la cita?"
                answer="No. La cita con un programador es de tipo informativo y nos guiará en el servicio requerido para tu proyecto."
              />
              <FaqItem
                question="¿Es presencial o virtual la cita?"
                answer="Virtual. La reunión se llevará a cabo vía Microsoft TEAMS y tiene una duración estimada de 15 minutos."
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