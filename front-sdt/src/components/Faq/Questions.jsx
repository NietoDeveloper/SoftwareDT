import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  const sdtGold = "#FFD700"; // Usando Gold para consistencia con el resto del sitio

  return (
    <section 
      id="questions-section-unique"
      className="relative w-full overflow-hidden bg-black"
    >
      {/* CSS Inyectado Blindado: Fuerza blanco por defecto y gold en hover */}
      <style dangerouslySetInnerHTML={{ __html: `
        #questions-section-unique h2, 
        #questions-section-unique p, 
        #questions-section-unique span,
        #questions-section-unique button,
        #questions-section-unique div {
          color: #ffffff !important;
          transition: color 0.3s ease;
        }

        /* Efecto Hover Gold para elementos interactivos y títulos */
        #questions-section-unique h2:hover,
        #questions-section-unique .text-gold-sdt,
        #questions-section-unique button:hover {
          color: ${sdtGold} !important;
        }

        /* Asegurar que los FaqItems (Dropdowns) también respondan al hover */
        #questions-section-unique .faq-item-container:hover * {
          color: ${sdtGold} !important;
        }
      `}} />

      {/* 1. VIDEO FULL ANCHO */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60" // Bajé un poco la opacidad para mejorar contraste
          src={softlive}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col items-center">
        
        {/* 2. TÍTULO */}
        <h2 className="text-4xl lg:text-6xl font-black tracking-widest text-center mb-20 uppercase cursor-default">
          Preguntas <span className="text-gold-sdt">Frecuentes</span>
        </h2>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-24 w-full max-w-7xl">
          
          {/* Lado Izquierdo: Imagen */}
          <div className="w-full lg:w-5/12 relative group">
            <div className={`absolute -inset-1 bg-[#FFD700]/30 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700`}></div>
            <img 
              src={equipo2} 
              alt="equipo software dt" 
              className="relative rounded-[2rem] w-full h-auto object-cover border border-white/30 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" 
            />
          </div>

          {/* Lado Derecho: FaqItems */}
          <div className="w-full lg:w-7/12 flex flex-col">
            <div className="w-full space-y-4">
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