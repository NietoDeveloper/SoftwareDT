import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  return (
    <section className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden questions-section">
      {/* CSS ESPECÍFICO PARA ESTA SECCIÓN: Esto anula el estilo global del Home */}
      <style dangerouslySetInnerHTML={{ __html: `
        .questions-section h1, 
        .questions-section h2, 
        .questions-section h3, 
        .questions-section p, 
        .questions-section span,
        .questions-section div { 
          color: #ffffff !important; 
        }
        
        /* El texto en Gold debe seguir siendo Gold */
        .questions-section .text-gold, 
        .questions-section .text-gold span {
          color: #FFD700 !important;
        }

        /* Ajuste para los items del Dropdown */
        .questions-section .faq-item {
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
      `}} />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
        src={softlive}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-[1]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
        
        {/* Título forzado a blanco con span Gold */}
        <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-center mb-12 uppercase">
          Preguntas <span className="text-gold">Frecuentes</span>
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 w-full max-w-7xl">
          
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-gold/30 rounded-[2.5rem] blur-2xl group-hover:bg-gold/50 transition duration-500"></div>
            <img 
              src={equipo2} 
              alt="faq" 
              className="relative rounded-[2rem] w-full h-auto object-cover border-4 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]" 
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-xl space-y-4">
              
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