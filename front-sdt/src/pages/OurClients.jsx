// eslint-disable-next-line no-unused-vars
import React from 'react';
import Footer from "../components/Footer/Footer";

const clientData = [
  {
    id: 1,
    title: "Cliente Alpha S.A.S.",
    description: "Desarrollo de plataforma de gestión interna y optimización de flujos de trabajo.",
    imageUrl: "/images/client-alpha.png", 
    website: "https://www..com",
  },
  {
    id: 2,
    title: "Firma Beta Legal",
    description: "Creación de un portal de consulta legal con documentación organizada.",
    imageUrl: "/images/client-beta.png", 
    website: "https://www..com",
  },
  {
    id: 3,
    title: "Tech Gamma Solutions",
    description: "Integración de API para servicios de terceros y microservicios.",
    imageUrl: "/images/client-gamma.png",
    website: "https://www..com",
  },
  {
    id: 4,
    title: "Distribuidora Delta",
    description: "Sistema de inventario en tiempo real conectado a puntos de venta (POS).",
    imageUrl: "/images/client-delta.png",
    website: "https://www..com",
  },

];

const OurClients = () => {
  return (
    <div>
    <section className="flex flex-col items-center p-4 sm:p-8 md:p-12 min-h-screen">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-12 text-center">
        Nuestros Clientes
      </h2>

      <div className="w-full max-w-[1400px]">
   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {clientData.map((client) => (
            <a
              key={client.id}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-sm flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-lg 
                         p-6 transition-all duration-300 ease-in-out cursor-pointer 
                         hover:shadow-2xl hover:border-amber-400 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-amber-500/50"
              style={{ minHeight: '320px' }} 
            >


              
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