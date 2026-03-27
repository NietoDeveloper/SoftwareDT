/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const Investigations = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: "digital-twins",
      title: "Video Digital Twins",
      subtitle: "Sistemas de Misión Crítica",
      description: "Redefinición de la supervisión industrial mediante gemelos digitales alimentados por flujos de video de baja latencia. Un ecosistema MERN que integra telemetría y sensores IoT.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1200",
      github: "https://github.com/NietoDeveloper/drone-dt-dashboard",
      link: "https://softwaredt.vercel.app/",
      tech: ["MERN Stack", "AWS", "WebSockets"]
    },
    {
      id: "emerald-dt",
      title: "Asset Optimization",
      subtitle: "Trazabilidad de Alto Valor",
      description: "Investigación sobre algoritmos de trazabilidad avanzada para la gestión de inventarios. Optimización de bases de datos PostgreSQL/MongoDB para cargas masivas.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
      github: "https://github.com/NietoDeveloper",
      link: "#",
      tech: ["PostgreSQL", "Docker", "Algorithms"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#DCDCDC] text-black font-sans antialiased overflow-x-hidden">
      
      {/* HEADER TÉCNICO - BREAKPOINT FIX (310px - 1900px) */}
      <header className="pt-32 pb-16 md:pb-24 px-4 sm:px-8 lg:px-12 max-w-[1900px] mx-auto border-b border-black/10">
        <div className="flex items-center gap-3 text-[#FEB60D] mb-8">
          <div className="h-[2px] w-8 sm:w-16 bg-[#FEB60D]"></div>
          <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">R&D Division Node</span>
        </div>
        
        {/* TÍTULO RESPONSIVE: Ajuste dinámico para pantallas desde 310px */}
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[clamp(2.5rem,12vw,11rem)] font-black uppercase tracking-tighter leading-[0.85] break-words"
        >
          Investigaciones <br />
          <span className="text-[#FEB60D] selection:bg-black selection:text-[#FEB60D]">SDT</span>
        </motion.h1>
      </header>

      {/* LISTADO DE PROYECTOS */}
      <section className="max-w-[1900px] mx-auto px-4 sm:px-8 lg:px-12 py-20">
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-start`}
            >
              {/* ÁREA VISUAL - BRUTALIST STYLE */}
              <div className="w-full lg:w-[60%] group relative border-2 border-black overflow-hidden bg-black">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-[300px] sm:h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-2 max-w-[80%]">
                  {project.tech.map(t => (
                    <span key={t} className="bg-[#FEB60D] text-black text-[8px] sm:text-[10px] font-black uppercase px-2 py-1 shadow-[4px_4px_0px_#000]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ÁREA DE TEXTO */}
              <div className="w-full lg:w-[40%] space-y-6">
                <div className="space-y-2">
                  <p className="text-[#FEB60D] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                    // {project.subtitle}
                  </p>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none">
                    {project.title}
                  </h2>
                </div>

                <p className="text-black/70 text-sm sm:text-base font-bold uppercase leading-relaxed max-w-prose">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <a 
                    href={project.github} 
                    className="group flex-1 flex items-center justify-center gap-3 py-4 bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[#FEB60D] hover:text-black transition-all"
                  >
                    Source Code <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                  <a 
                    href={project.link} 
                    className="flex-1 flex items-center justify-center py-4 border-2 border-black font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-[#FEB60D] transition-all"
                  >
                    Live Project
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECCIÓN FINAL - CTA ELITE */}
      <section className="mt-20 py-32 bg-black text-white px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-[clamp(2rem,8vw,5rem)] font-black uppercase tracking-tighter leading-none">
            Ready to <span className="text-[#FEB60D]">Scale</span> your Infrastructure?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button 
              onClick={() => navigate("/contact")}
              className="px-12 py-5 bg-[#FEB60D] text-black font-black uppercase tracking-[0.3em] text-xs hover:shadow-[0_0_30px_rgba(254,182,13,0.4)] transition-all"
            >
              Consultoría Senior
            </button>
            <button 
              onClick={() => navigate("/doctors")}
              className="px-12 py-5 border-2 border-white text-white font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all"
            >
              Agendar Roadmap
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Investigations;