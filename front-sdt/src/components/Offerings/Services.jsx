import ServicesCard from "./ServicesCard";

const servicesList = [
  {
    id: "web-apps-db",
    name: "Desarrollo de Web, Apps y Bases de Datos",
    desc: "Creación de sitios web dinámicos, responsivos y optimizados, adaptados a tus necesidades, con diseño moderno y SEO integrado. Desarrollo de Apps móviles personalizadas para iOS y Android con interfaces intuitivas.",
  },
  {
    id: "empresa-soluciones",
    name: "Soluciones para Empresas",
    desc: "Software Contable, Manejo de Personal (Nómina, asistencias) y Gestión de Usuarios. Automatizamos registros financieros y optimizamos la gestión de recursos humanos con seguridad total.",
  },
  {
    id: "productos-ia-iot",
    name: "Productos",
    desc: "Creamos Software de alto impacto como: Plataformas de IA para agricultura, Apps fintech para inclusión financiera y soluciones IoT para ciudades inteligentes.",
  },
  {
    id: "custom-software",
    name: "Software Personalizado",
    desc: "Soluciones a medida: Funcionalidades adaptadas a procesos únicos, escalabilidad para crecer con tu empresa y soporte técnico continuo para garantizar el máximo rendimiento.",
  },
  {
    id: "update-software",
    name: "Actualización o Creación de Software",
    desc: "Análisis profundo de tu ecosistema digital para decidir si es más eficiente actualizar tu software actual o construir una solución nueva desde cero.",
  },
  {
    id: "social-media",
    name: "Manejo de Portafolio y Redes Sociales",
    desc: "Plataforma integral para programar publicaciones, crear contenido y analizar métricas en Facebook, Instagram, X y LinkedIn desde un dashboard unificado.",
  },
];

const techIcons = [
  { name: "React", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", link: "https://react.dev/" },
  { name: "Node.js", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", link: "https://nodejs.org/" },
  { name: "Tailwind CSS", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg", link: "https://tailwindcss.com/" },
  { name: "JavaScript", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", link: "https://developer.mozilla.org/es/docs/Web/JavaScript" },
  { name: "PostgreSQL", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", link: "https://www.postgresql.org/" },
  { name: "Vite", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vite/vite-original.svg", link: "https://vitejs.dev/" },
  { name: "Firebase", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg", link: "https://firebase.google.com/" },
  { name: "GitHub", url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg", link: "https://github.com/" },
];

const Services = () => {
  return (
    <div className="bg-main overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        footer, footer *, .footer-section, .footer-section * { color: #ffffff !important; }
        .tech-card:hover img { filter: drop-shadow(0 0 10px #FEB60D); }
      `}} />

      <section className="py-20 max-w-[1800px] mx-auto px-4 sm:px-8">
        <div className="lg:w-[600px] mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-headingColor uppercase tracking-tighter">
            Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p className="text-lg text-textColor mt-4 font-medium opacity-80">
            Selecciona un servicio para agendar tu consultoría técnica en Bogotá.
          </p>
        </div>
        
        {/* Renderizado directo: ServicesCard ya tiene la lógica de navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((item, index) => (
            <ServicesCard key={item.id || index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* SECCIÓN DE TECNOLOGÍA */}
      <section className="min-h-screen w-full bg-white flex flex-col items-center justify-center py-20 px-4 sm:px-8">
        <div className="max-w-[1800px] w-full mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-headingColor uppercase tracking-tighter mb-4">
              Nuestra <span className="text-gold">Tecnología</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {techIcons.map((tech, idx) => (
              <a 
                href={tech.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={idx} 
                className="tech-card group flex flex-col items-center justify-center p-8 bg-main rounded-[2.5rem] border-2 border-transparent hover:border-gold hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <img src={tech.url} alt={tech.name} className="w-16 h-16 md:w-24 md:h-24 mb-6 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <span className="text-headingColor font-black uppercase text-sm group-hover:text-gold transition-colors">{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;