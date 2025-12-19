// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "../components/Footer/Footer";

const clientData = [
  {
    id: 1,
    title: "Banco Agrario de Colombia",
    description: "Desarrollo de sistemas transaccionales y seguridad bancaria.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Logo_Banco_Agrario.png",
    website: "https://www.bancoagrario.gov.co/",
  },
  {
    id: 2,
    title: "Google",
    description: "Optimización de arquitecturas cloud y servicios de integración.",
    imageUrl: "https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp",
    website: "https://www.google.com/",
  },
  {
    id: 3,
    title: "Ministerio de Defensa",
    description: "Sistemas de gestión segura y protección de datos nacionales.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Logo_Ministerio_de_Defensa_%282022-2026%29.png",
    website: "https://www.mindefensa.gov.co/",
  },
  {
    id: 4,
    title: "RCN Televisión",
    description: "Plataformas digitales escalables para medios masivos.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/CanalRCN2023.png",
    website: "https://www.canalrcn.com/",
  },
  {
    id: 5,
    title: "Tejas Ajover",
    description: "Sistemas ERP y automatización de procesos industriales.",
    imageUrl: "https://ajover.co/wp-content/uploads/2021/03/Logo-Ajover-3.png", 
    website: "https://ajover.co/",
  },
  {
    id: 6,
    title: "Software DT",
    description: "Arquitecturas propietarias y consultoría avanzada.",
    imageUrl: "", // Placeholder del logo propio
    website: "https://softwaredt.vercel.app/",
  },
];

const OurClients = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <section className="flex flex-col items-center py-20 px-4 sm:px-8">
        {/* Cabecera Técnica */}
        <div className="w-full max-w-[1800px] mb-16 text-center lg:text-left flex flex-col items-center lg:items-start lg:px-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-1 bg-amber-500"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Partners & Trust</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter leading-none">
            Nuestros <span className="text-amber-500 text-shadow-sm">Clientes</span>
          </h2>
        </div>

        {/* Grid Responsive de 320px a 1800px */}
        <div className="w-full max-w-[1800px] px-4 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {clientData.map((client) => (
              <a
                key={client.id}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center bg-white border-[3px] border-black rounded-[30px] p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[20px_20px_0px_0px_rgba(245,158,11,0.3)]"
              >
                {/* Logo Container con Efecto */}
                <div className="flex-shrink-0 w-36 h-36 mb-6 relative">
                  <div className="absolute inset-0 bg-amber-500 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 opacity-20"></div>
                  <img
                    src={client.imageUrl || "https://placehold.co/400x400/000000/F59E0B?text=DT"}
                    alt={`Logo de ${client.title}`}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Título y Descripción en Negro */}
                <h3 className="text-xl font-black text-black uppercase tracking-tight mb-3 text-center transition-colors group-hover:text-amber-600">
                  {client.title}
                </h3>

                <p className="text-gray-600 font-medium text-center text-sm leading-relaxed mb-6">
                  {client.description}
                </p>

                {/* Link con Estética Gold al Hover */}
                <div className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">
                  Protocolo Web <span className="text-amber-500 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer sin interrupciones visuales */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default OurClients;