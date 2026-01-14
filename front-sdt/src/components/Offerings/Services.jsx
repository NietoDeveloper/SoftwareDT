import ServicesCard from "./ServicesCard";

const servicesList = [
  {
    name: "Desarrollo de Web, Apps y Bases de Datos",
    desc: "Creación de sitios web dinámicos, responsivos y optimizados, adaptados a tus necesidades, con diseño moderno y SEO integrado. Desarrollo de Apps: Aplicaciones móviles personalizadas para iOS y Android, con interfaces intuitivas y funcionalidades específicas para tu negocio. Bases de Datos: Diseño y gestión de bases de datos seguras, escalables y eficientes, optimizadas para almacenar, consultar y analizar información.",
  },


const Services = () => {
  return (
    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">

        </div>
  
          {servicesList.map((item, index) => (
            <ServicesCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
