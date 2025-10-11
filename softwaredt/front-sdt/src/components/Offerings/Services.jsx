import ServicesCard from "./ServicesCard";

const servicesList = [
  {
    name: "Desarrollo de Web, Apps y Bases de Datos",
    desc: "",
  },

  {
    name: "Soluciones para Empresas",
    desc: "Desarrollo Web: Creación de sitios web dinámicos, responsivos y optimizados, adaptados a tus necesidades, con diseño moderno y SEO integrado. Desarrollo de Apps: Aplicaciones móviles personalizadas para iOS y Android, con interfaces intuitivas y funcionalidades específicas para tu negocio.
Bases de Datos: Diseño y gestión de bases de datos seguras, escalables y eficientes, optimizadas para almacenar, consultar y analizar información.",
  },

  {
    name: "Software Personalizado",
    desc: "Solución diseñada a medida para satisfacer necesidades específicas de tu empresa. Incluye: Desarrollo a Medida: Funcionalidades adaptadas a procesos únicos, integrando requerimientos específicos de tu negocio. Escalabilidad: Flexible para crecer con tu empresa, permitiendo actualizaciones y nuevas integraciones. Gestión de Datos: Almacena, organiza y protege información clave con interfaces personalizadas. Soporte Técnico: Asistencia continua para garantizar rendimiento y adaptabilidad. ",
  },
  {
    name: "Solución integral para la gestión empresarial que incluye:",
    desc: "Software Contable: Automatiza registros financieros, genera balances, estados de resultados y cumple con normativas fiscales. Simplifica la contabilidad con herramientas para facturación, conciliación bancaria y reportes financieros. Manejo de Personal: Administra nóminas, calcula salarios, beneficios y deducciones. Controla horarios, asistencias y expedientes de empleados, optimizando la gestión de recursos humanos. Manejo de Usuarios e Información: Gestiona accesos y permisos de usuarios con seguridad. Organiza y protege datos empresariales, facilitando la búsqueda, almacenamiento y análisis de información clave.",
  },

  {
    name: "Manejo y creacion de portafolio de redes sociales",
    desc: "Nuestro servicio de manejo de redes sociales es una plataforma integral que permite programar publicaciones, crear contenido, analizar métricas y monitorear interacciones en plataformas como Facebook, Instagram, X y LinkedIn, todo desde un dashboard unificado para optimizar la presencia digital de tu marca.",
  },

  {
    name: "Productos",
    desc: "Creamos Software como: Plataforma de IA para agricultura, App fintech para inclusión financiera, Software de IoT para ciudades inteligentes. ",
  },
];

const Services = () => {
  return (
    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">Servicios</h2>
          <p className="text_para text-center">
            Ofrecemos los siguientes servicios:
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]
    lg:mt-[55px]"
        >
          {servicesList.map((item, index) => (
            <ServicesCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
