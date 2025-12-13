// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const ServicesList = () => {
  const functionalPlaceholder =
    "https://placehold.co/150x150/EEEEEE/313131?text=Servicio";

  const services = [
   
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
        <h1 className="text-4xl font-extrabold text-black mb-12 text-center">
          Servicios 

              >


            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicesList;