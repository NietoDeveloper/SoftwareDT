// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ServicesList = () => {
  const services = [
    {
      title: "Desarrollo Web y Apps",
      subtitle: "Software a Medida",
      description: "Creación de sitios web dinámicos, aplicaciones móviles iOS/Android y gestión de bases de datos seguras.",
      price: "Desde $ 2.000.000 COP",
    },
    {
      title: "Inteligencia Artificial",
      subtitle: "Vanguardia Tecnológica",
      description: "Integración de Bots, Robots y automatización con modelos de IA para servicios personalizados.",
      price: "Desde $ 5.000.000 COP",
    },
    {
      title: "Mantenimiento IT",
      subtitle: "Continuidad del Negocio",
      description: "Soporte técnico continuo, monitoreo de servidores y actualizaciones de seguridad preventivas.",
      price: "Desde $ 8.000.000 COP",
    },
    {
      title: "Optimización SEO",
      subtitle: "Visibilidad Digital",
      description: "Análisis profundo para mejorar el ranking en motores de búsqueda y auditorías técnicas de rendimiento.",
      price: "Desde $ 8.000.000 COP",
    },
    {
      title: "Diseño UI/UX",
      subtitle: "Experiencia Inmersiva",
      description: "Interfaces centradas en el usuario con prototipos de alta fidelidad y pruebas de usabilidad.",
      price: "Desde $ 3.000.000 COP",
    },
    {
      title: "Automatización",
      subtitle: "Eficiencia y Ahorro",
      description: "Implementación de scripts para automatizar tareas repetitivas reduciendo el error humano.",
      price: "Desde $ 6.000.000 COP",
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans antialiased">
      <section className="flex flex-col items-center py-16 px-4 min-h-screen max-w-[1800px] mx-auto">
        
        {/* Encabezado */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-2">
            <div className="w-8 h-[2px] bg-amber-500 shadow-[0_0_8px_#f59e0b]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Informacion De Productos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter">
            Nuestros <span className="text-amber-500">Servicios</span>
          </h1>
        </div>

        {/* Grid de Tarjetas (320px a 1800px) */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 w-full">
          {services.map((service, index) => (
            <Link
              key={index}
              to="/doctors"
              className="group bg-white border-[4px] border-black rounded-[30px] p-6 transition-all duration-300 ease-out cursor-pointer 
                         flex flex-col items-center justify-between text-center 
                         w-full sm:max-w-[340px] h-[400px] overflow-hidden
                         shadow-[0_10px_20px_rgba(0,0,0,0.05)] 
                         hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] 
                         hover:-translate-y-2 hover:border-amber-500"
            >
              {/* Contenedor Superior */}
              <div className="w-full flex flex-col items-center flex-shrink-0">
                <h3 className="mt-[35px] text-xl font-black text-black uppercase tracking-tight group-hover:text-amber-600 transition-colors duration-300 truncate w-full">
                  {service.title}
                </h3>
                
                <span className="mt-[35px] text-[12px] font-black text-black group-hover:text-amber-500 uppercase tracking-[0.2em] transition-colors duration-300">
                  {service.subtitle}
                </span>
              </div>

              <div className="flex-1 flex items-center justify-center py-4 w-full px-2">
                <p className="text-gray-800 text-lg font-bold leading-snug italic line-clamp-3">
                  "{service.description}"
                </p>
              </div>

              {/* Contenedor Inferior */}
              <div className="w-full flex flex-col items-center mt-auto flex-shrink-0">
                <div className="w-12 h-[2px] bg-amber-500 mb-4 shadow-[0_0_4px_#f59e0b]"></div>
                
                <div className="flex items-center justify-between w-full px-4 mb-2">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inversión</p>
                    <p className="text-[13px] font-black text-black uppercase">{service.price}</p>
                  </div>
                  
                  {/* Botón Circular Gold Corregido */}
                  <div className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center 
                                  bg-transparent transition-all duration-300 ease-in-out
                                  shadow-[0_8px_15px_rgba(0,0,0,0.15)] 
                                  group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:shadow-[0_10px_25px_rgba(245,158,11,0.5)] 
                                  group-hover:scale-110">
                    <ArrowRightIcon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesList;