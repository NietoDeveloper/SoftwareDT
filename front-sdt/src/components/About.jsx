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

          {/* LADO DEL TEXTO */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="text-[36px] leading-[44px] text-headingColor font-black uppercase tracking-tighter">
              Creamos Software Con <span className="text-gold">Estándares Mundiales</span>
            </h2>
            
            <p className="text-lg text-textColor font-medium leading-relaxed mt-6">
              Desarrollamos software innovador con estándares mundiales,
              utilizando tecnologías de vanguardia para crear soluciones
              personalizadas que impulsan el éxito de cada negocio. 
            </p>

            <p className="text-lg text-textColor font-medium leading-relaxed mt-4 opacity-80">
              Desde nuestra sede en <strong>Bogotá, Colombia</strong>, atendemos mercados en
              Colombia, Estados Unidos y Canadá. Nuestro equipo apasionado
              garantiza calidad, eficiencia y resultados excepcionales en cada
              proyecto, transformando ideas en herramientas que elevan su
              empresa al siguiente nivel.
            </p>

            <Link to="/clients">
              {/* BOTÓN: Redimensionado para mobile y redireccionado a Clientes */}
              <button 
                className="mt-10 px-8 py-4 lg:px-12 lg:py-5 bg-black text-white text-lg lg:text-2xl font-black uppercase tracking-[0.2em] 
                           border-2 border-white/30 rounded-full hover:bg-gold hover:text-black 
                           transition-all duration-500 shadow-2xl active:scale-95 scale-100 lg:scale-110"
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