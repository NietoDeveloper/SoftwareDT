import ServicesCard from "./ServicesCard";

const servicesList = [
  {
    name: "Desarrollo Web",
    desc: "Desarrollamos Aplicaciones Y Webistes, con las ultimas y mejores technologias",
  },

  {
    name: "Soluciones para Empresas",
    desc: "Creamos Software que brinda soluciones e innovaciones que mejoran y cran excelentes procesos.",
  },

  {
    name: "Software Personalizado",
    desc: "Analizamos las solicitudes y necesidades para crear ",
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
