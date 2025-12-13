// eslint-disable-next-line no-unused-vars
import React from "react";
import Footer from "../components/Footer/Footer";

const ServicesList = () => {
  const functionalPlaceholder =
    "https://placehold.co/150x150/EEEEEE/313131?text=Servicio";

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

  ];

  return (


              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ServicesList;
