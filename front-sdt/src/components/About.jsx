import about1 from "../assets/images/herodoctor4.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="bg-card py-16">
      <div className="container mx-auto px-4 pb-8">
        <div
          className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col
            lg:flex-row items-center"
        >
          {/* LADO DE LA IMAGEN - Nieto Developer Style */}
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img 
              src={about1} 
              alt="Sobre Software DT" 
              className="rounded-[2rem] border-8 border-main shadow-2xl" 
            />
            
            {/* Elemento decorativo flotante */}
            <div
              className="absolute z-20 bottom-4 w-[200px] md:w-[300px] md:right-[-7px]
                  lg:right-[22px] bg-white p-4 rounded-2xl shadow-xl border-l-8 border-gold hidden md:block"
            >
              <p className="text-black font-black text-sm uppercase">🚀 +5 Años Innovando</p>
              <p className="text-gray-500 text-[10px] font-bold">Bogotá - Los Angeles - Toronto</p>
            </div>
          </div>

   


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