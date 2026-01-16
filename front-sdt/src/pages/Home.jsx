import { useNavigate } from "react-router-dom";
import Herosection from "../components/Hero/Herosection";
import About from "../components/About";
import Publicidad from "../components/Publicidad";
import Questions from "../components/Faq/Questions";
import Guide from "../components/Explainer/Guide";
import BogotaAir1 from "../assets/images/BogotaAir1.mp4";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home-wrapper" className="bg-main antialiased min-h-screen selection:bg-gold/30">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* SECTOR DE EXCLUSIÓN Y TEXTOS SDT */
        #home-wrapper h1:not(footer *):not(#questions-section-unique *), 
        #home-wrapper h2:not(.text-white-force):not(footer *):not(#questions-section-unique *), 
        #home-wrapper h3:not(footer *):not(#questions-section-unique *), 
        #home-wrapper p:not(footer *):not(#questions-section-unique *), 
        #home-wrapper span:not(.text-white-force):not(.text-gold-sdt):not(footer *):not(#questions-section-unique *) { 
          color: #000000 !important; 
        }

        .text-white-force {
          color: #ffffff !important;
          letter-spacing: 0.4em !important;
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9));
        }

        /* ESTÁNDAR DE FOTOS SOFTWARE DT - NO AFECTA VIDEOS */
        #home-wrapper img {
          filter: grayscale(100%) opacity(0.6);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        #home-wrapper section:hover img {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.05);
        }

        /* BOTONES SDT */
        #home-wrapper button:not(.nav-toggle):not(#questions-section-unique *), 
        #home-wrapper .btn:not(#questions-section-unique *) {
          background-color: #000000 !important;
          color: #ffffff !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          border: none !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* HOVER GOLD NOTORIO (Mantenido según tu instrucción) */
        #home-wrapper button:hover:not(#questions-section-unique *), 
        #home-wrapper .btn:hover:not(#questions-section-unique *) {
          background-color: #FEB60D !important;
          color: #000000 !important;
          transform: translateY(-5px) scale(1.05);
          font-weight: 900 !important;
          box-shadow: 0 15px 35px rgba(254, 182, 13, 0.4) !important;
        }

        html { scroll-behavior: smooth; }
      `,
        }}
      />

      {/* SECCIÓN DEL VIDEO INICIAL - TAL CUAL (SIN FILTROS) */}
      <section className="h-[100vh] w-full relative flex items-end justify-end overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={BogotaAir1}
        />
        {/* Gradiente sutil para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[1]"></div>

        <div className="relative z-[10] flex flex-col items-end gap-8 pb-44 pr-6 md:pr-24 lg:pr-32 max-w-[1900px]">
          <h2 className="text-white-force text-3xl min-[310px]:text-4xl md:text-6xl lg:text-7xl font-black uppercase text-right leading-none tracking-tighter">
            Software D T
          </h2>
          <button
            onClick={() => navigate("/contact")}
            className="w-44 h-12 rounded-full shadow-2xl active:scale-95 text-xl font-black uppercase tracking-tighter"
          >
            Contacto
          </button>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL RESPONSIVE 310PX A 1900PX */}
      <main className="max-w-[1900px] mx-auto overflow-hidden space-y-12 sm:space-y-20 px-4 sm:px-8 mt-12 sm:mt-20">
        
        <section className="py-6 sm:py-10">
          <Herosection />
        </section>

        {/* Tarjetas con Borde Negro Fino y Gold Flotante Suave */}
        <section className="border-[1px] border-headingColor/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-card hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(255,215,0,0.15)]">
          <About />
        </section>

        <section className="border-[1px] border-headingColor/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-card hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(255,215,0,0.15)]">
          <Guide />
        </section>

        <section className="border-[1px] border-headingColor/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-card hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(255,215,0,0.15)]">
          <Publicidad />
        </section>

        <section className="border-[1px] border-headingColor/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-card mb-20 hover:border-gold/30 hover:shadow-[0_20px_60px_rgba(255,215,0,0.15)]">
          <Questions />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;