import about1 from "../assets/images/herodoctor4.png";
import { Link } from "react-router-dom";

const Publicidad = () => {
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
            
            {/* Elemento decorativo flotante (Opcional - Gold) */}
            <div
              className="absolute z-20 bottom-4 w-[200px] md:w-[300px] md:right-[-7px]
                    lg:right-[22px] bg-white p-4 rounded-2xl shadow-xl border-l-8 border-gold hidden md:block"
            >
              <p className="text-black font-black text-sm uppercase">🚀 +5 Años Innovando</p>
              <p className="text-gray-500 text-[10px] font-bold">Bogotá - Miami - Toronto</p>
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

            <Link to="/contact">
              <button className="mt-8 px-10 py-4 bg-black text-white font-black uppercase tracking-widest rounded-full 
                hover:bg-gold hover:text-black hover:shadow-[0_10px_20px_rgba(255,215,0,0.4)] 
                transition-all duration-300 transform hover:-translate-y-1">
                Sobre Nosotros
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publicidad;