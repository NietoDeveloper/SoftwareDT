import React from "react";

const ServicesList = () => {
  const functionalPlaceholder = "https://placehold.co/150x150/EEEEEE/313131?text=Servicio";

  const services = [
    {
      title: "Desarrollo Web, Apps y Bases de Datos",
      subtitle: "Todo tipo de WebSites, Apps, Bases de Datos",
      description:
        "Creación de sitios web dinámicos y responsivos, aplicaciones móviles personalizadas para iOS/Android, y diseño/gestión de bases de datos seguras y escalables.",
      photo: functionalPlaceholder,
      price: "Desde  $ 2.000.000 COP",
    },
    {
      title: "Consultoría y Optimización SEO",
      subtitle: "Aumenta tu visibilidad",
      description: "Servicio de análisis profundo para mejorar el ranking en motores de búsqueda, optimización de contenido y auditorías técnicas para un mejor rendimiento.",
      photo: functionalPlaceholder,
      price: "Desde  $ 5.000.000 COP",
    },
    {
      title: "Mantenimiento y Soporte IT",
      subtitle: "Continuidad del negocio",
      description: "Soporte técnico continuo, monitorización de servidores, actualizaciones de seguridad y mantenimiento preventivo para garantizar la operatividad de tus sistemas.",
      photo: functionalPlaceholder,
      price: "$200 - $300",
    },
    {
      title: "Diseño de Interfaz (UI/UX)",
      subtitle: "Experiencia de usuario inmersiva",
      description: "Diseño centrado en el usuario, creación de prototipos y pruebas de usabilidad para garantizar que tu producto sea intuitivo, accesible y atractivo.",
      photo: functionalPlaceholder,
      price: "$250 - $350",
    },
    {
      title: "Automatización de Procesos",
      subtitle: "Eficiencia y ahorro",
      description: "Implementación de scripts y herramientas para automatizar tareas repetitivas, liberando tiempo de tu equipo y reduciendo el margen de error humano.",
      photo: functionalPlaceholder,
      price: "Desde  $ 6.000.000 COP",
    },
    {
      title: "Investigacion Y Desarrollo",
      subtitle: "Independiente Y/O con Inversion",
      description: "Realizamos Investigacion Independiente continua, y ademas; Buscamos cooperacion con otras organizaciones e Inversores.",
      photo: functionalPlaceholder,
      price: "Desde  $ 10.000.000 COP",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center transform transition duration-300 hover:scale-[1.02] border border-blue-100"
        >
          <img
            src={service.photo}
            alt={service.title}
            className="w-24 h-24 mb-4 rounded-full object-cover border-4 border-blue-500"
          />
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">{service.title}</h2>
          <h3 className="text-md font-semibold text-blue-600 mb-3 uppercase tracking-wider">{service.subtitle}</h3>
          <p className="text-gray-600 mb-4 text-center flex-grow">{service.description}</p>
          <div className="mt-auto pt-3 border-t w-full text-center">
             <p className="text-xl font-black text-green-700">{service.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;