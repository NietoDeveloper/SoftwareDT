import { Link } from "react-router-dom";
import heroimage2 from "../../assets/images/banner5.png";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";

const Herosection = () => {
  return (
    <section className="w-full bg-card py-12 lg:py-20 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* LADO IZQUIERDO: COLUMNA DE TEXTO EXTRA ANCHA */}
          <div className="w-full lg:w-[65%] flex flex-col items-start z-10">
            <h1 className="text-[36px] md:text-[50px] lg:text-[70px] xl:text-[80px] leading-[1.1] text-headingColor font-black uppercase tracking-tighter mb-8">
              Construimos Software Que <span className="text-gold">Da Solución</span>
            </h1>
            
            <p className="mb-10 text-lg md:text-xl lg:text-2xl text-textColor font-medium opacity-90 leading-relaxed w-full">
              Innovamos con software de vanguardia. Transformamos negocios con
              tecnología personalizada. Potenciamos empresas con herramientas
              digitales. Diseñamos apps, web y software a medida. Soluciones
              escalables, intuitivas y eficientes. Con Tu visión y nuestra
               tecnología, resultados reales. Eleva tu negocio con nosotros.
            </p>

            <Link to="/doctors">
              <button className="px-10 py-5 lg:px-14 lg:py-6 text-xl lg:text-2xl font-black uppercase tracking-widest text-white bg-black border-2 border-black rounded-full transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_15px_30px_rgba(255,215,0,0.4)] hover:-translate-y-2 active:scale-95">
                Agenda Tu Cita
              </button>
            </Link>
          </div>

          {/* LADO DERECHO: IMÁGENES (COMPACTADAS PARA DAR ESPACIO) */}
          <div className="w-full lg:w-[35%] flex justify-center lg:justify-end z-10">
            <div className="flex flex-col gap-5 w-full max-w-[550px]">
              <img
                src={heroimage4}
                alt="Diseño de Software"
                className="rounded-[2.5rem] shadow-2xl w-full border-[6px] border-main transition-transform duration-500 hover:scale-[1.03]"
              />
              <div className="flex gap-5">
                <img
                  src={heroimage3}
                  alt="Programación"
                  className="rounded-[2rem] shadow-2xl w-1/2 border-[6px] border-main transition-transform duration-500 hover:scale-[1.03]"
                />
                <img
                  src={heroimage2}
                  alt="Apps Móviles"
                  className="rounded-[2rem] shadow-2xl w-1/2 border-[6px] border-main transition-transform duration-500 hover:scale-[1.03]"
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