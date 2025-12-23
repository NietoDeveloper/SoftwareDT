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
    <div id="home-wrapper" className="bg-main antialiased min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* SECTOR DE EXCLUSIÓN */
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

        /* EFECTO HOVER GOLD NOTORIO Y EXPLOSIVO */
        #home-wrapper button:hover:not(#questions-section-unique *), 
        #home-wrapper .btn:hover:not(#questions-section-unique *) {
          background-color: #FEB60D !important;
          color: #000000 !important;
          transform: translateY(-5px) scale(1.05);
          font-weight: 900 !important;
          box-shadow: 0 0 30px rgba(254, 182, 13, 0.8) !important;
        }

        html { scroll-behavior: smooth; }
      `,
        }}
      />

      {/* SECCIÓN DEL VIDEO INICIAL */}
      <section className="h-[100vh] w-full relative flex items-end justify-end overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
          src={BogotaAir1}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/20 z-[1]"></div>

        <div className="relative z-[10] flex flex-col items-end gap-8 pb-44 pr-6 md:pr-24 lg:pr-32">
          <h2 className="text-white-force text-3xl md:text-5xl lg:text-6xl font-black uppercase text-right leading-none">
            Software D T
          </h2>
          {/* BOTÓN AJUSTADO: Más pequeño (w-44 h-12) y con hover más reactivo */}
          <button
            onClick={() => navigate("/contact")}
            className="w-44 h-12 rounded-full shadow-2xl active:scale-95 text-xl font-black uppercase tracking-tighter"
          >
            Contácto
          </button>
        </div>
      </section>

      <main className="max-w-[1800px] mx-auto overflow-hidden space-y-10 px-4 sm:px-8 mt-10">
        <section className="py-10">
          <Herosection />
        </section>

        <section className="hover:shadow-xl transition-shadow duration-500 rounded-3xl overflow-hidden bg-card">
          <About />
        </section>

        <section className="hover:shadow-xl transition-shadow duration-500 rounded-3xl overflow-hidden bg-card">
          <Guide />
        </section>

        <section className="hover:shadow-xl transition-shadow duration-500 rounded-3xl overflow-hidden bg-card">
          <Publicidad />
        </section>

        <section className="hover:shadow-xl transition-shadow duration-500 rounded-3xl overflow-hidden bg-card mb-20">
          <Questions />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;