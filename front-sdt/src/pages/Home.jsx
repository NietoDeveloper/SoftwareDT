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
      <style dangerouslySetInnerHTML={{ __html: `
        h1, h2, h3, h4, p, span:not(.text-gold) { 
          color: #000000 !important; 
        }

        .nav-toggle, 
        button[aria-label="Menu"], 
        .nav-toggle span {
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

        .number, .count, .step-number {
          color: #000000 !important;
          transition: color 0.3s ease !important;
          font-weight: 900;
        }

        .number:hover, .count:hover, .step-number:hover {
          color: #FFD700 !important;
        }

        html { scroll-behavior: smooth; }
      `}} />

      <section className="h-[100vh] w-full relative flex flex-col items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover z-0 opacity-80"
          src={BogotaAir1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-main z-[1]"></div>

        <button 
          onClick={() => navigate("/contact")}
          className="relative z-[10] px-10 py-4 bg-black text-white font-black uppercase tracking-[0.2em] 
                     border-2 border-white/20 rounded-full hover:bg-gold hover:text-black 
                     transition-all duration-500 shadow-2xl scale-110 active:scale-95"
        >
          Contáctanos
        </button>
      </section>

      <section className="py-16 lg:py-24 max-w-[1800px] mx-auto px-4 sm:px-8">
        <div className="container mx-auto">
          <Herosection />
        </div>
      </section>

      <main className="max-w-[1800px] mx-auto overflow-hidden space-y-10">
        {/* Se eliminó el <about /> duplicado que causaba error */}
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