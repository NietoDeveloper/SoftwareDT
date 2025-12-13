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


  ];

  return (

};

export default ServicesList;