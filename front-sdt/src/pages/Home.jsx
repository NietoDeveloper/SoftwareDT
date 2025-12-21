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
    <div className="bg-main antialiased min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* AJUSTE AQUÍ: Agregamos :not(footer *) para que NO afecte al footer */
        h1:not(footer *), h2:not(footer *), h3:not(footer *), h4:not(footer *), p:not(footer *), span:not(footer *):not(.text-white-force):not(.text-gold) { 
          color: #000000 !important; 
        }

        .text-white-force {
          color: #ffffff !important;
          /* Eliminamos sombras para estilo limpio Software DT */
          letter-spacing: 0.4em !important;
        }

        .nav-toggle, button[aria-label="Menu"], .nav-toggle span {
          background-color: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        button:not(.nav-toggle):not([aria-label="Menu"]), .btn, .arrow-icon {
          background-color: #000000 !important;
          color: #ffffff !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: none !important;
        }

        button:not(.nav-toggle):not([aria-label="Menu"]):hover, .btn:hover, .arrow-icon:hover {
          background-color: #FFD700 !important;
          color: #000000 !important;
          box-shadow: 0 10px 25px rgba(255, 215, 0, 0.4) !important;
          transform: translateY(-3px);
        }

        html { scroll-behavior: smooth; }
      `,
        }}
      />

      {/* SECCIÓN DEL VIDEO */}
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

        {/* CONTENIDO FLOTANTE ALINEADO A LA DERECHA */}
        <div className="relative z-[10] flex flex-col items-end gap-8 pb-44 pr-6 md:pr-24 lg:pr-32">
          <h2 className="text-white-force text-2xl md:text-5xl lg:text-6xl font-black uppercase text-right leading-none">
            Software D T
          </h2>

          <button
            onClick={() => navigate("/contact")}
            className="px-12 py-5 bg-black text-white text-xl lg:text-2xl font-black uppercase tracking-[0.2em] 
                       border-2 border-white/30 rounded-full hover:bg-gold hover:text-black 
                       transition-all duration-500 shadow-2xl active:scale-95 scale-110"
          >
            Contácto
          </button>
        </div>
      </section>

      {/* SECCIÓN HERO */}
      <section className="py-10 max-w-[1800px] mx-auto px-4 sm:px-8">
        <Herosection />
      </section>

      <main className="max-w-[1800px] mx-auto overflow-hidden space-y-10 px-4 sm:px-8">
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
