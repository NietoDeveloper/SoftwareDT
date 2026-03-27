// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "../components/Footer/Footer";

const clientData = [
  {
    id: 1,
    title: "Banco Agrario de Colombia",
    description: "Desarrollo de infraestructura fintech y banca digital segura para el sector agroindustrial.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Banco_Agrario_de_Colombia_logo.svg", 
    website: "https://www.bancoagrario.gov.co/",
  },
  {
    id: 2,
    title: "Grupo Aval",
    description: "Grupo financiero líder en Colombia con integración en servicios bancarios, seguros y pensiones.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Logoaval.svg",
    website: "https://www.grupoaval.com/",
  },
  {
    id: 3,
    title: "Emerald DT Assets",
    description: "Optimización de activos de alto valor mediante algoritmos de trazabilidad avanzada y arquitecturas de datos masivos.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", // Data/Asset visualization
    website: "https://softwaredt.vercel.app/",
  },
  {
    id: 4,
    title: "Ministerio de Defensa",
    description: "Sistemas de gestión segura y protocolos de encriptación para la infraestructura de defensa nacional.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Logo_Ministerio_de_Defensa_%282022-2026%29.png/1200px-Logo_Ministerio_de_Defensa_%282022-2026%29.png",
    website: "https://www.mindefensa.gov.co/",
  },
  {
    id: 5,
    title: "RCN Televisión",
    description: "Modernización de plataformas digitales para streaming y gestión de ecosistemas de contenidos masivos.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/CanalRCN2023.png",
    website: "https://www.canalrcn.com/",
  },
  {
    id: 6,
    title: "Drone D T",
    description: "Software especializado para la fabricación y telemetría de drones industriales en Colombia.",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=1000", // Drone tech industrial
    website: "https://dronedt.vercel.app/",
  },
];

const OurClients = () => {
  return (
    <div className="bg-main min-h-screen font-sans antialiased selection:bg-gold/30 overflow-x-hidden">
      <section className="flex flex-col items-center py-20 px-4 sm:px-8 max-w-[1900px] mx-auto">
        
        {/* Encabezado Software DT */}
        <div className="text-center mb-16 sm:mb-28 space-y-6">
          <div className="inline-flex items-center justify-center gap-4">
            <div className="w-12 h-[2px] bg-gold"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-textColor/40">Industrial Partners</span>
            <div className="w-12 h-[2px] bg-gold"></div>
          </div>
          <h2 className="text-5xl min-[310px]:text-6xl sm:text-7xl lg:text-9xl font-black text-headingColor uppercase tracking-tighter leading-none">
            Ecosistema <span className="text-gold">DT</span>
          </h2>
          <p className="text-textColor/50 font-bold uppercase text-[11px] tracking-[0.3em]">Confianza de Grado Industrial</p>
        </div>

        {/* Grid de Clientes */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-14 justify-items-center">
            {clientData.map((client) => (
              <a
                key={client.id}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex flex-col items-center bg-card border-[1px] border-headingColor/5 rounded-[1.5rem] p-10 
                           transition-all duration-500 ease-in-out cursor-pointer shadow-none
                           hover:-translate-y-4 hover:border-gold/30 hover:shadow-[0_30px_60px_rgba(255,215,0,0.15)]"
                style={{ minHeight: "500px" }}
              >
                {/* Visual Image */}
                <div className="relative w-full h-56 mb-10 overflow-hidden rounded-xl border-[1px] border-headingColor/5 bg-main">
                  <img
                    src={client.imageUrl}
                    alt={`Proyecto ${client.title}`}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:opacity-0 transition-opacity"></div>
                </div>

                {/* Título de Cliente */}
                <h3 className="text-2xl sm:text-4xl font-black text-headingColor uppercase tracking-tighter mb-5 text-center group-hover:text-gold transition-colors duration-300">
                  {client.title}
                </h3>

                {/* Descripción */}
                <p className="text-textColor/60 text-[14px] font-bold text-center flex-grow leading-relaxed px-4 uppercase tracking-tight">
                  {client.description}
                </p>

                {/* Card Footer */}
                <div className="mt-10 flex items-center justify-between w-full pt-8 border-t border-headingColor/5">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-textColor/30 group-hover:text-headingColor transition-colors">
                    Access Node
                  </span>
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-gold group-hover:scale-110">
                    <span className="text-gold group-hover:text-black text-2xl font-light">&rarr;</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurClients;