import React from 'react';
import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  return (
    <section className="relative h-[120vh] w-full bg-black text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src={softlive}
      />
      <div className="relative z-10 container mx-auto px-6 py-16 min-[700px]:px-8 min-[700px]:py-20 flex flex-col items-center">
        <h2 className="text-4xl min-[700px]:text-5xl font-bold tracking-tight text-center mb-8 min-[700px]:mb-12">Preguntas Frecuentes</h2>
        <div className="flex flex-col min-[700px]:flex-row justify-center items-center gap-8 min-[700px]:gap-16 w-full max-w-6xl">
          <div className="w-full min-[700px]:w-1/2">
            <img src={equipo2} alt="faq" className="rounded-2xl w-full h-auto object-cover" />
          </div>
          <div className="w-full min-[700px]:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-lg">
              <div className="my-4 min-[700px]:my-6">
                <FaqItem
                  question="¿Tiene algún costo la cita?"
                  answer="No; La cita con un programador, es de tipo informativo y nos guiara en el servicio requerido. "
                  className="bg-transparent border border-gray-200 rounded-lg text-white"
                />
              </div>
              <div className="my-4 min-[700px]:my-6">
                <FaqItem
                  question="¿Es presencial o virtual la cita?"
                  answer="Virtual. La reunuion se llevara a cabo via TEAMS; y Tiene una duracion de 15 min."
                  className="bg-transparent border border-gray-200 rounded-lg text-white"
                />
              </div>
              <div className="my-4 min-[700px]:my-6">
                <FaqItem
                  question="¿Tienen Atención en todo el país?"
                  answer="Si. Antes de Iniciar la construccion del Software se tienen reuniones presenciales, las cuales de ser necesario de realizaran en la ciudad del cliente "
                  className="bg-transparent border border-gray-200 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;