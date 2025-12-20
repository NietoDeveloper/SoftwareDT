import { useNavigate } from "react-router-dom";
import Herosection from "../components/Hero/Herosection";
import About from "../components/About";
import Services from "../components/Offerings/Services";
import Medcare from "../components/Preview/Medcare";
import Questions from "../components/Faq/Questions";
import Guide from "../components/Explainer/Guide";
import BogotaAir1 from "../assets/images/BogotaAir1.mp4";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fcfcfc] antialiased">
      {/* ESTILOS GLOBALES (NIETO STYLE) - Aplicados a todos los componentes hijos */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Forzar textos negros */
        h1, h2, h3, h4, p, span:not(.text-amber-500) { color: #000000 !important; }

        /* Botones y flechas: Negros con Hover Gold */
        button, .btn, .arrow-icon, svg.arrow {
          background-color: #000000 !important;
          color: #ffffff !important;
          transition: all 0.3s ease-in-out !important;
        }

        button:hover, .btn:hover, .arrow-icon:hover, svg.arrow:hover {
          background-color: #f59e0b !important;
          color: #000000 !important;
          border-color: #f59e0b !important;
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.5) !important;
          transform: translateY(-2px);
        }

        /* Numeraciones: Negro con Hover Gold */
        .number, .count, .step-number {
          color: #000000 !important;
          transition: color 0.3s ease !important;
        }

        .number:hover, .count:hover, .step-number:hover {
          color: #f59e0b !important;
        }

        /* Animación de entrada al hacer scroll */
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />

      {/* VIDEO SECTION - Con botón de contacto redireccionable */}
      <section className="h-[100vh] w-full relative flex flex-col items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted



      </section>

      {/* HERO SECTION */}
      <section className="hero_section 2xl:h-[110vh] py-16 lg:py-24 max-w-[1800px] mx-auto px-4 sm:px-8">
        <div className="container mx-auto">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
              <Herosection />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT - Manteniendo estructura y posiciones originales */}
      <main className="max-w-[1800px] mx-auto overflow-hidden">
        <div className="transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <Medcare />
        </div>

        <div className="transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <About />
        </div>

        <div className="transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <Services />
        </div>

        <div className="transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          <Guide />
        </div>

        <div className="transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] mb-10">
          <Questions />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;