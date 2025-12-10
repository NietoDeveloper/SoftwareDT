// eslint-disable-next-line no-unused-vars
import React from 'react';

// Datos de los clientes - Reemplace estos datos con la información real de sus 6 clientes.
const clientData = [
  {
    id: 1,
    title: "Cliente Alpha S.A.S.",
    description: "Desarrollo de plataforma de gestión interna y optimización de flujos de trabajo.",
    imageUrl: "/images/client-alpha.png", // <--- Reemplace con la ruta real
    website: "https://www.clientealpha.com",
  },
  {
    id: 2,
    title: "Firma Beta Legal",
    description: "Creación de un portal de consulta legal con documentación organizada.",
    imageUrl: "/images/client-beta.png", // <--- Reemplace con la ruta real
    website: "https://www.firmabeta.com",
  },
  {
    id: 3,
    title: "Tech Gamma Solutions",
    description: "Integración de API para servicios de terceros y microservicios.",
    imageUrl: "/images/client-gamma.png", // <--- Reemplace con la ruta real
    website: "https://www.techgamma.com",
  },
  {
    id: 4,
    title: "Distribuidora Delta",
    description: "Sistema de inventario en tiempo real conectado a puntos de venta (POS).",
    imageUrl: "/images/client-delta.png", // <--- Reemplace con la ruta real
    website: "https://www.distribuidoradelta.com",
  },
  {
    id: 5,
    title: "Restaurante Epsilon",
    description: "Implementación de un sistema de pedidos online personalizado y optimizado.",
    imageUrl: "/images/client-epsilon.png", // <--- Reemplace con la ruta real
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

      {/* Contenedor de la Cuadrícula Flexible para los Clientes */}
      <div className="w-full max-w-[1400px]">
        {/*
          Configuración de la cuadrícula responsiva:
          - grid-cols-1: 1 columna en móviles (320px)
          - sm:grid-cols-2: 2 columnas en pantallas pequeñas/tablets
          - lg:grid-cols-3: 3 columnas en pantallas grandes
          - xl:grid-cols-4: Opcional: 4 columnas en pantallas extra grandes (Más allá de 1280px, si lo desea)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {clientData.map((client) => (
            // Botón/Tarjeta del Cliente
            // Utiliza un `a` con `target="_blank"` para abrir el enlace en una nueva pestaña.
            <a
              key={client.id}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-sm flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-lg 
                         p-6 transition-all duration-300 ease-in-out cursor-pointer 
                         hover:shadow-2xl hover:border-amber-400 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-amber-500/50"
              style={{ minHeight: '320px' }} // Asegura una altura mínima para la uniformidad
            >
              {/* Contenedor de la Imagen - Asegura la separación clara y centralización */}
              <div className="flex-shrink-0 w-32 h-32 mb-4">
                  {/*
                    La imagen se centra y se usa `object-contain` para que el logo completo se vea sin recortar.
                    Se usa un efecto de grupo para un hover sutil en el logo.
                  */}
                  <img
                      src={client.imageUrl}
                      alt={`Logo de ${client.title}`}
                      className="w-full h-full object-contain rounded-full border-4 border-gray-100 group-hover:border-amber-500 transition-colors duration-300"
                  />
              </div>

              {/* Título del Cliente */}
              <h3 className="text-xl font-semibold text-black mb-2 text-center group-hover:text-amber-600 transition-colors duration-300">
                {client.title}
              </h3>

              {/* Descripción del Proyecto (Contenido) */}
              <p className="text-gray-700 text-center flex-grow">
                {client.description}
              </p>
              
              {/* Indicador de Botón/Enlace (Hover Notorio en Gold) */}
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