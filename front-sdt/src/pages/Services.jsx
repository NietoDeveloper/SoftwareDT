// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const ServicesList = () => {
  const functionalPlaceholder =
    "https://placehold.co/150x150/EEEEEE/313131?text=Servicio";

  const services = [
    {
      title: "Desarrollo Web, Apps y Bases de Datos",
      subtitle: "Creacion personalizada de WebSites, Apps, Bases de Datos; Mantenimiento y Escalamiento",
      description:
        "Creación a la MEDIDA de sitios web dinámicos y responsivos, aplicaciones móviles personalizadas para iOS/Android, y diseño/gestión de bases de datos seguras y escalables.",
      photo: functionalPlaceholder,
      price: "Desde  $ 2.000.000 COP",
    },
        {
      title: "Inteligencia Artificial",
      subtitle: "",
      description:
        "Servicio de análisis profundo para mejorar el ranking en motores de búsqueda, optimización de contenido y auditorías técnicas para un mejor rendimiento.",
      photo: functionalPlaceholder,
      price: "Desde  $ 8.000.000 COP",
    },
    {
      title: "Consultoría y Optimización SEO",
      subtitle: "Aumenta tu visibilidad",
      description:
        "Servicio de análisis profundo para mejorar el ranking en motores de búsqueda, optimización de contenido y auditorías técnicas para un mejor rendimiento.",
      photo: functionalPlaceholder,
      price: "Desde  $ 8.000.000 COP",
    },
    {
      title: "Mantenimiento y Soporte IT",
      subtitle: "Continuidad del negocio",
      description:
        "Soporte técnico continuo, monitorización de servidores, actualizaciones de seguridad y mantenimiento preventivo para garantizar la operatividad de tus sistemas.",
      photo: functionalPlaceholder,
      price: "Desde  $ 8.000.000 COP",
    },
    {
      title: "Diseño de Interfaz (UI/UX)",
      subtitle: "Experiencia de usuario inmersiva",
      description:
        "Diseño centrado en el usuario, creación de prototipos y pruebas de usabilidad para garantizar que tu producto sea intuitivo, accesible y atractivo.",
      photo: functionalPlaceholder,
      price: "Desde  $ 3.000.000 COP",
    },
    {
      title: "Automatización de Procesos",
      subtitle: "Eficiencia y ahorro",
      description:
        "Implementación de scripts y herramientas para automatizar tareas repetitivas, liberando tiempo de tu equipo y reduciendo el margen de error humano.",
      photo: functionalPlaceholder,
      price: "Desde  $ 6.000.000 COP",
    },
    {
      title: "Investigacion Y Desarrollo",
      subtitle: "Independiente Y/O con Inversion",
      description:
        "Realizamos Investigacion Independiente continua, y ademas; Buscamos cooperacion con otras organizaciones e Inversores.",
      photo: functionalPlaceholder,
      price: "Desde  $ 10.000.000 COP",
    },
  ];

  return (
    <div>
      <section className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-extrabold text-black mb-12 text-center mt-5">
          Servicios 
        </h1>
        <div className="w-full max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {services.map((service, index) => (
              <Link
                key={index}
                to="/doctors"
                className="group w-full max-w-sm flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-lg 
                           p-6 transition-all duration-300 ease-in-out cursor-pointer 
                           hover:shadow-2xl hover:border-yellow-400 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
                style={{ minHeight: '320px' }} 
              >
                <div className="flex-shrink-0 w-32 h-32 mb-4">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-contain rounded-full border-4 border-gray-100 group-hover:border-yellow-500 transition-colors duration-300"
                  />
                </div>
                <h2 className="text-2xl font-extrabold text-black mb-2 text-center group-hover:text-yellow-600 transition-colors duration-300">
                  {service.title}
                </h2>
                <h3 className="text-md font-semibold text-black mb-3 uppercase tracking-wider group-hover:text-yellow-600 transition-colors duration-300">
                  {service.subtitle}
                </h3>
                <p className="text-gray-700 text-center flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto pt-3 border-t w-full text-center">
                  <p className="text-xl font-black text-black group-hover:text-yellow-500 transition-colors duration-300">
                    {service.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export default ServicesList;