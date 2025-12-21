import ServicesCard from "./ServicesCard";

const servicesList = [
  {
    id: "web-apps-db",
    name: "Desarrollo de Web, Apps y Bases de Datos",
    desc: "Creación de sitios web dinámicos, responsivos y optimizados, adaptados a tus necesidades.",
  },
  {
    id: "empresa-soluciones",
    name: "Soluciones para Empresas",
    desc: "Software Contable, Manejo de Personal (Nómina, asistencias) y Gestión de Usuarios.",
  },
  {
    id: "productos-ia-iot",
    name: "Productos",
    desc: "Creamos Software de alto impacto como: Plataformas de IA, Apps fintech e IoT.",
  },
  {
    id: "custom-software",
    name: "Software Personalizado",
    desc: "Soluciones a medida: Funcionalidades adaptadas a procesos únicos y escalabilidad.",
  },
  {
    id: "update-software",
    name: "Actualización o Creación de Software",
    desc: "Análisis para decidir si es más eficiente actualizar tu software o construir uno nuevo.",
  },
  {
    id: "social-media",
    name: "Manejo de Portafolio y Redes Sociales",
    desc: "Plataforma integral para programar publicaciones y analizar métricas desde un dashboard.",
  },
];

const Services = () => {
  return (
    <div className="bg-main min-h-screen">
      <section className="py-20 max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Cabecera Simple */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-black text-headingColor uppercase tracking-tighter">
            Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p className="text-lg text-textColor mt-4 opacity-80">
            Selecciona un servicio para agendar tu consultoría técnica.
          </p>
        </div>
        
        {/* Grid de Servicios: Activa el flujo hacia Booking con el ID de la DB */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((item, index) => (
            <ServicesCard key={item.id || index} item={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;