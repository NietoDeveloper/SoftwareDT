// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "../components/Footer/Footer";

const clientData = [
  {
    id: 1,
    title: "Banco Agrario de Colombia",
    description: "Desarrollo de infraestructura fintech y banca digital segura para el sector agroindustrial.",
    // Foto real del Banco Agrario
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Banco_Agrario_de_Colombia_logo.svg", 
    website: "https://www.bancoagrario.gov.co/",
  },
  {
  id: 2,
  title: "Grupo Aval",
  description: "Grupo financiero líder en Colombia con integración en servicios bancarios, seguros y pensiones a través de sus subsidiarias.",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Logoaval.svg",
  website: "https://www.grupoaval.com/",
  },
  {
    id: 3,
    title: "Ministerio de Agricultura",
    description: "Transformación digital y analítica de datos para el fortalecimiento del campo colombiano.",
    // Foto real del Ministerio de Agricultura
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_Ministerio_de_Agricultura_%282022-2026%29.png", 
    website: "https://www.minagricultura.gov.co/",
  },
  {
    id: 4,
    title: "Ministerio de Defensa",
    description: "Sistemas de gestión segura y protocolos de encriptación para defensa nacional.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Logo_Ministerio_de_Defensa_%282022-2026%29.png/1200px-Logo_Ministerio_de_Defensa_%282022-2026%29.png?referrer=grok.com",
    website: "https://www.mindefensa.gov.co/",
  },
  {
    id: 5,
    title: "RCN Televisión",
    description: "Modernización de plataformas digitales para streaming y gestión de contenidos masivos.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/CanalRCN2023.png",
    website: "https://www.canalrcn.com/",
  },
  {
    id: 6,
    title: "Drone D T",
    description: "Software para fabrica de Drones en Colombia",
    imageUrl: "https://img.freepik.com/free-photo/silhouette-man-piloting-drone-sunset-with-sunny-sky-background_158595-6219.jpg?semt=ais_hybrid&w=740&q=80", 
    website: "https://dronedt.vercel.app/",
  },
];

const OurClients = () => {
  return (
    <div className="bg-main min-h-screen font-sans antialiased selection:bg-gold/30 overflow-x-hidden">
      {/* Contenedor Responsive 310px a 1900px */}
      <section className="flex flex-col items-center py-16 px-4 sm:px-8 max-w-[1900px] mx-auto">
        
        {/* Encabezado Software DT */}
        <div className="text-center mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-textColor/40">Trusted Partners</span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>
          <h2 className="text-4xl min-[310px]:text-5xl sm:text-7xl lg:text-8xl font-black text-headingColor uppercase tracking-tighter leading-none">
            Nuestros <span className="text-gold">Clientes</span>
          </h2>
        </div>

        {/* Grid de Clientes - Centrado y Moderno */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 justify-items-center">
            {clientData.map((client) => (
              <a
                key={client.id}
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                // HOVER PERFECTO: GOLD SUAVE FLOTANTE (Sin sombras negras)
                className="group w-full flex flex-col items-center bg-card border-[1px] border-headingColor/10 rounded-[2.5rem] p-8 
                           transition-all duration-500 ease-in-out cursor-pointer shadow-none
                           hover:-translate-y-4 hover:border-gold/40 hover:shadow-[0_20px_50px_rgba(255,215,0,0.25)]"
                style={{ minHeight: "450px" }}
              >
                {/* Contenedor de Imagen Real (Sustituye Logo plano) */}
                <div className="relative w-full h-48 mb-8 overflow-hidden rounded-2xl border-[1px] border-headingColor/5 bg-main">
                  <img
                    src={client.imageUrl}
                    alt={`Proyecto ${client.title}`}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Título de Cliente - Fuente Aumentada */}
                <h3 className="text-2xl sm:text-3xl font-black text-headingColor uppercase tracking-tighter mb-4 text-center group-hover:text-gold transition-colors duration-300">

    </div>
  );
};

export default OurClients;