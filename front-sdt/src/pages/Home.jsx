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


        .text-white-force {
          color: #ffffff !important;
          letter-spacing: 0.4em !important;
          filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.9));
        }



        html { scroll-behavior: smooth; }
      `,
        }}
      />

   

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