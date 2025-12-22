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
    // Agregamos el ID "home-wrapper" para encapsular el CSS
    <div id="home-wrapper" className="bg-main antialiased min-h-screen">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Solo afecta a elementos DENTRO de #home-wrapper */
        #home-wrapper h1, 
        #home-wrapper h2:not(.text-white-force), 
        #home-wrapper h3, 
        #home-wrapper p, 
        #home-wrapper span:not(.text-white-force):not(.text-gold-sdt) { 
          color: #000000 !important; 
        }

        .text-white-force {
          color: #ffffff !important;
          letter-spacing: 0.4em !important;
        }

        /* Botones específicos del Home para no romper los del Header */
        #home-wrapper button:not(.nav-toggle), 
        #home-wrapper .btn {
          background-color: #000000 !important;
          color: #ffffff !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: none !important;
        }

        #home-wrapper button:hover, 
        #home-wrapper .btn:hover {
          background-color: #FFD700 !important;
          color: #000000 !important;
          transform: translateY(-3px);
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


      {/* SECCIONES DEL HOME CON CONTENEDORES LIMPIOS */}
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