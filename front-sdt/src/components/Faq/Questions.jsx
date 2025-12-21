import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  // Estilo ultra forzado para ganar al !important del global
  const forceWhite = { color: '#ffffff !important', color: 'white' };

  return (
    /* Agregamos w-screen y left-1/2 para que el video ignore el contenedor del padre y sea full ancho */
    <section 
      id="questions-section-unique"
      className="relative min-h-screen w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* CSS Inyectado para forzar a los hijos (Dropdowns) a ser blancos */}
      <style dangerouslySetInnerHTML={{ __html: `
        #questions-section-unique *, 
        #questions-section-unique p, 
        #questions-section-unique h2, 
        #questions-section-unique span,
        #questions-section-unique button {
          color: #ffffff !important;
          text-decoration: none !important;
        }
        #questions-section-unique .text-gold {
          color: #FEB60D !important;
        }
      `}} />

      {/* 1. VIDEO FULL ANCHO SIN RESTRICCIONES */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        src={softlive}
      />
      
      {/* Overlay sutil para legibilidad */}
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
        
        {/* 2. TÍTULO FORZADO */}
        <h2 
          style={forceWhite}
          className="text-4xl lg:text-7xl font-black tracking-[0.2em] text-center mb-16 uppercase"
        >
          Preguntas <span style={{ color: '#FEB60D' }} className="text-gold">Frecuentes</span>
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 w-full max-w-7xl">
          
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-white/10 rounded-[2.5rem] blur-2xl group-hover:bg-gold/20 transition duration-500"></div>
            <img 
              src={equipo2} 
              alt="faq" 
              className="relative rounded-[2rem] w-full h-auto object-cover border-2 border-white/30 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]" 
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* 3. FAQ WRAPPER */}
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