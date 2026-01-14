import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  const sdtGold = "#FFD700";

  return (
    <section 
      id="questions-section-unique"
      className="relative w-full overflow-hidden bg-black min-h-screen flex items-center"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        /* REGLA NUCLEAR: Forzamos blanco a todo lo que esté dentro del wrapper del Home Y de esta sección */
        #home-wrapper #questions-section-unique *,
        #home-wrapper #questions-section-unique h2,


        #home-wrapper #questions-section-unique button {
          color: #ffffff !important;
          fill: #ffffff !important;
          opacity: 1 !important;
        }

        /* EXCEPCIÓN PARA EL ORO */
        #home-wrapper #questions-section-unique .text-gold-sdt,
        #home-wrapper #questions-section-unique .gold-text,
        #home-wrapper #questions-section-unique svg,
        #home-wrapper #questions-section-unique path,
        #home-wrapper #questions-section-unique summary::-webkit-details-marker {
          color: ${sdtGold} !important;
          fill: ${sdtGold} !important;
        }

        /* FORMATO DE LETRAS SOFTWARE DT */
        #questions-section-unique h2 {
          letter-spacing: 0.4em !important;
          font-weight: 900 !important;
          text-shadow: 2px 2px 15px rgba(0,0,0,1);
        }

        #questions-section-unique .faq-item-container {
          border-bottom: 1px solid rgba(255, 215, 0, 0.4);
          padding: 1.5rem 0;
        }

        /* Aseguramos que el video se vea claro */
        #questions-section-unique video {
          opacity: 0.85 !important;
        }
      `}} />

      {/* VIDEO CLARO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover" 
          src={softlive}
        />
        {/* Overlay sutil para legibilidad sin oscurecer demasiado */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
        
        {/* TÍTULO */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl lg:text-6xl font-black uppercase leading-tight" style={{color: '#ffffff'}}>
            Preguntas <span style={{color: sdtGold}}>Frecuentes</span>
          </h2>
          <div className="w-24 h-[3px] bg-[#FFD700] mx-auto mt-6 shadow-[0_0_20px_#FFD700]"></div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24 w-full max-w-7xl">
          
          {/* IMAGEN IZQUIERDA */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="absolute -inset-1 bg-gold/10 rounded-[2rem] blur-2xl"></div>
            <img 
              src={equipo2} 
              alt="equipo software dt" 
              className="relative rounded-[2rem] w-full h-auto border border-white/20 shadow-2xl" 
            />
          </div>

          {/* CONTENIDO FAQ DERECHA */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-4">
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