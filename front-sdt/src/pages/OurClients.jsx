// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "../components/Footer/Footer";

const clientData = [
  {
    id: 1,
    title: "Banco Agrario de Colombia",
    description: "Desarrollo de infraestructura fintech y banca digital segura para el sector agroindustrial.",
    imageUrl: "https://www.bancoagrario.gov.co/PublishingImages/Logo_Banco_Agrario_2024.png", // Imagen Online Directa
    website: "https://www.bancoagrario.gov.co/",
  },

  {
    id: 3,
    title: "Tejas Ajover",
    description: "Optimización de arquitectura de software y logística para plantas de producción industrial.",
    imageUrl: "https://ajover.co/wp-content/uploads/2021/05/logo-ajover.png", // Imagen Online Directa
    website: "https://ajover.co/",
  },
  {
    id: 4,
    title: "Ministerio de Defensa Colombia",
    description: "Sistemas de gestión segura y protocolos de encriptación para defensa nacional.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Logo_Ministerio_de_Defensa_%282022-2026%29.png",
    website: "https://www.mindefensa.gov.co/",
  },
  {
    id: 5,
    title: "RCN Televisión Colombia",
    description: "Modernización de plataformas digitales para streaming y gestión de contenidos masivos.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/CanalRCN2023.png",
    website: "https://www.canalrcn.com/",
  },
  {
    id: 6,
    title: "Software DT Labs",
    description: "I+D en nuevas tecnologías de inteligencia artificial y desarrollo de microservicios.",
    imageUrl: "https://softwaredt.vercel.app/logo.png", // URL ejemplo de tu logo
    website: "https://softwaredt.vercel.app/",
  },
];

const OurClients = () => {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans antialiased">
      <section className="flex flex-col items-center py-16 px-4 sm:px-8 max-w-[1800px] mx-auto">
        
        {/* Encabezado Técnico */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[3px] bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Trusted Partners</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter drop-shadow-sm">
            Nuestros <span className="text-amber-500">Clientes</span>
          </h2>
        </div>

        {/* Grid Responsivo (320px a 1800px) */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 justify-items-center">
            {clientData.map((client) => (
              <a
                key={client.id}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex flex-col items-center bg-white border-[4px] border-black rounded-[35px] p-8 
                           transition-all duration-300 ease-out cursor-pointer 
                           hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:-translate-y-3 hover:border-amber-500"
                style={{ minHeight: "360px" }}
              >
                {/* Contenedor del Logo */}
                <div className="relative w-32 h-32 mb-6 flex items-center justify-center p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors duration-300">
                  <img
                    src={client.imageUrl || "https://placehold.co/200x200?text=DT"}
                    alt={`Logo de ${client.title}`}
                    className="w-full h-full object-contain filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Texto Negro a Gold */}
                <h3 className="text-xl font-black text-black uppercase tracking-tighter mb-3 text-center group-hover:text-amber-600 transition-colors duration-300 drop-shadow-[1px_1px_0px_rgba(255,255,255,1)]">
                  {client.title}
                </h3>

                <p className="text-gray-500 text-sm font-bold text-center flex-grow leading-snug px-2">
                  {client.description}
                </p>

                {/* Footer de Tarjeta con sombra suave */}
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-amber-500 transition-colors duration-300">
                   Conexión Segura <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default OurClients;