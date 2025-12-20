import Herosection from "../components/Hero/Herosection";
import About from "../components/About";
import Services from "../components/Offerings/Services";
import Medcare from "../components/Preview/Medcare";
import Questions from "../components/Faq/Questions";
import Guide from "../components/Explainer/Guide";
import BogotaAir1 from "../assets/images/BogotaAir1.mp4";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div className="bg-[#fcfcfc] antialiased">
      {/* VIDEO SECTION - Manteniendo posición y forma */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover z-0 opacity-90"
          src={BogotaAir1}
        />
        {/* Overlay sutil para mejorar legibilidad si hay componentes encima */}
        <div className="absolute inset-0 bg-black/10 z-[1]"></div>
      </section>

      {/* HERO SECTION - Ajustes de color y hover sutil */}
      <section className="hero_section 2xl:h-[110vh] py-16 lg:py-24 max-w-[1800px] mx-auto px-4 sm:px-8">

            </div>
          </div>
        </div>

    </div>
  );
};

export default Home;