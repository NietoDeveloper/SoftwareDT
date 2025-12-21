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

};

export default Questions;