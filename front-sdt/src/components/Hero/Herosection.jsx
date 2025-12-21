import { Link } from "react-router-dom";
import heroimage2 from "../../assets/images/banner5.png";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";

const Herosection = () => {
  return (
    <section className="w-full bg-card py-12 lg:py-28 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* LADO IZQUIERDO: TEXTO DE ALTO IMPACTO */}
          <div className="w-full lg:w-[65%] flex flex-col items-start z-10">
            {/* H1 con tracking-tighter y leading-none para look editorial */}
            <h1 className="text-[40px] md:text-[60px] lg:text-[75px] xl:text-[90px] leading-[0.95] text-headingColor font-black uppercase tracking-tighter mb-10">
              Construimos Software Que <br />
              <span className="text-gold">Da Solución</span>
            </h1>
            
            <p className="mb-12 text-lg md:text-xl lg:text-2xl text-textColor font-medium opacity-80 leading-relaxed max-w-4xl border-l-4 border-gold pl-6">
              Innovamos con software de vanguardia. Transformamos negocios con
              tecnología personalizada. Potenciamos empresas con herramientas
              digitales. Diseñamos apps, web y software a medida. Soluciones
              escalables, intuitivas y eficientes.
            </p>

            <Link to="/doctors">
              <button className="group relative px-12 py-6 text-xl lg:text-2xl font-black uppercase tracking-[0.2em] text-white bg-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgba(255,215,0,0.3)] hover:-translate-y-2 active:scale-95">
                <span className="relative z-10">Agenda Tu Cita</span>
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                {/* El span de abajo cambia de color el texto al hacer hover */}
                <style dangerouslySetInnerHTML={{ __html: `
                  .group:hover span { color: #000000; transition: color 0.4s; }
                `}} />
              </button>
            </Link>
          </div>

          {/* LADO DERECHO: COMPOSICIÓN DE IMÁGENES ASIMÉTRICA */}
          <div className="w-full lg:w-[35%] flex justify-center lg:justify-end z-10">
            <div className="flex flex-col gap-6 w-full max-w-[500px]">
              <div className="relative">
                <img
                  src={heroimage4}
                  alt="Diseño de Software"
                  className="rounded-[3rem] shadow-2xl w-full border-[8px] border-main transition-all duration-700 hover:rotate-2 hover:scale-105"
                />
                {/* Badge flotante decorativo */}
                <div className="absolute -bottom-6 -left-6 bg-black text-gold font-black p-6 rounded-2xl hidden md:block shadow-xl uppercase tracking-widest text-xs">
                  Software DT <br/> Expertos
                </div>
              </div>

              <div className="flex gap-6">
                <img
                  src={heroimage3}
                  alt="Programación"
                  className="rounded-[2.5rem] shadow-2xl w-1/2 border-[8px] border-main transition-all duration-700 hover:-rotate-3 hover:scale-105"
                />
                <img
                  src={heroimage2}
                  alt="Apps Móviles"
                  className="rounded-[2.5rem] shadow-2xl w-1/2 border-[8px] border-main transition-all duration-700 hover:rotate-3 hover:scale-105"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Herosection;