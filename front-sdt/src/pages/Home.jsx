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
          /* Brillo gold más intenso */
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9));
        }

        #home-wrapper button:not(.nav-toggle), 
        #home-wrapper .btn {
          background-color: #000000 !important;
          color: #ffffff !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: none !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #home-wrapper button:hover, 
        #home-wrapper .btn:hover {
          background-color: #FFD700 !important;
          color: #000000 !important;
          transform: translateY(-3px);
          /* Resaltado extra de la fuente en hover */
          letter-spacing: 0.05em;
          font-weight: 900 !important;
        }

        html { scroll-behavior: smooth; }
      `,
        }}
      />

      {/* SECCIÓN DEL VIDEO INICIAL */}
      <section className="h-[100vh] w-full relative flex items-end justify-end overflow-hidden">
        <video
          autoPlay



export default Home;