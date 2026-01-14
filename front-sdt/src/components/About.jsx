import about1 from "../assets/images/herodoctor4.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-card py-16">
      <div className="container mx-auto px-4 pb-8">
        <div
          className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col
            lg:flex-row items-center"

            


   


            <Link to="/clients">
              {/* BOTÓN ESTILO SOFTWARE DT (AJUSTADO) */}
              <button 
                className="mt-10 w-56 h-14 bg-black text-white text-xl font-black uppercase tracking-tighter 
                           rounded-full transition-all duration-400 shadow-2xl active:scale-95
                           hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1.5 
                           hover:shadow-[0_0_30px_rgba(254,182,13,0.8)]"
              >
                Nuestros Clientes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;