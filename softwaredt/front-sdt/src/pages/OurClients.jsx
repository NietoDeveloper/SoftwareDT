// eslint-disable-next-line no-unused-vars
import React from 'react';

const clientData = [
  {
    id: 1,
    title: "Cliente Alpha S.A.S.",
    description: "Desarrollo de plataforma de gestión interna y optimización de flujos de trabajo.",
    imageUrl: "/images/client-alpha.png", 
    website: "https://www.clientealpha.com",
  },
  {
    id: 2,
    title: "Firma Beta Legal",
    description: "Creación de un portal de consulta legal con documentación organizada.",
    imageUrl: "/images/client-beta.png", 
    website: "https://www.firmabeta.com",
  },
  {
    id: 3,
    title: "Tech Gamma Solutions",
    description: "Integración de API para servicios de terceros y microservicios.",
    imageUrl: "/images/client-gamma.png",
    website: "https://www.techgamma.com",
  },
  {
    id: 4,
    title: "Distribuidora Delta",
    description: "Sistema de inventario en tiempo real conectado a puntos de venta (POS).",
    imageUrl: "/images/client-delta.png",
    website: "https://www.distribuidoradelta.com",
  },
  {
    id: 5,
    title: "Restaurante Epsilon",
    description: "Implementación de un sistema de pedidos online personalizado y optimizado.",
    imageUrl: "/images/client-epsilon.png",
    website: "https://www.restauranteepsilon.com",
  },
  {
    id: 6,
    title: "ONG Zeta Social",
    description: "Diseño y desarrollo de sitio web informativo con funcionalidades de donación.",
    imageUrl: "/images/client-zeta.png", // <--- Reemplace con la ruta real
    website: "https://www.ongzeta.org",
  },
];

const OurClients = () => {
  return (
    <section className="flex flex-col items-center p-4 sm:p-8 md:p-12 min-h-screen">
      {/* Título Principal */}
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
              <div className="flex-shrink-0 w-32 h-32 mb-4">
        
                  <img
                      src={client.imageUrl}
                      alt={`Logo de ${client.title}`}
                      className="w-full h-full object-contain rounded-full border-4 border-gray-100 group-hover:border-amber-500 transition-colors duration-300"
                  />
              </div>

              <h3 className="text-xl font-semibold text-black mb-2 text-center group-hover:text-amber-600 transition-colors duration-300">
                {client.title}
              </h3>

              <p className="text-gray-700 text-center flex-grow">
                {client.description}
              </p>
              
              <div className="mt-4 text-sm font-medium text-gray-500 group-hover:text-amber-500 transition-colors duration-300">
                Visitar Web &rarr;
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;