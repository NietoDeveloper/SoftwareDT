import { Link } from "react-router-dom";
import heroimage2 from "../../assets/images/banner5.png";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";

const Herosection = () => {
  return (
    <>
      {/* Sección con fondo blanco de la paleta (bg-card) */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-16 pb-12 lg:pt-0 lg:pb-0 bg-card">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-16">
          
          {/* LADO IZQUIERDO: TEXTO */}
          <div className="w-full lg:w-[45%] flex flex-col items-start z-10">
            <h1 className="text-[36px] leading-[44px] text-headingColor font-black lg:text-[56px] lg:leading-[64px] mb-6 uppercase tracking-tight">
              Construimos Software Que <span className="text-gold">Da Solución</span>
            </h1>
            
            <p className="mb-8 text-lg text-textColor font-medium opacity-90 leading-relaxed">
              Innovamos con software de vanguardia. Transformamos negocios con
              tecnología personalizada. Potenciamos empresas con herramientas
              digitales. Diseñamos apps, web y software a medida. Soluciones
              escalables, intuitivas y eficientes. Con Tu visión y nuestra
              tecnología, resultados reales. Eleva tu negocio con nosotros.
            </p>

            <Link to="/contact">
              <button className="px-10 py-4 text-lg font-black uppercase tracking-widest text-white bg-black border-2 border-black rounded-full transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold hover:shadow-[0_10px_20px_rgba(255,215,0,0.3)] hover:-translate-y-1">
                Agenda Tu Cita
              </button>
            </Link>
          </div>

          {/* LADO DERECHO: TARJETA DE IMÁGENES MÁS ANCHA */}
          <div className="w-full lg:w-[55%] flex justify-center lg:justify-end z-10">
            {/* Se aumentó el max-width para que la "tarjeta" de imágenes sea imponente */}
            <div className="flex flex-col gap-6 w-full max-w-[700px]">
              {/* Imagen Principal */}
              <img
                src={heroimage4}
                alt="Diseño de Software"
                className="rounded-[2.5rem] shadow-2xl w-full border-[8px] border-main transition-transform duration-500 hover:scale-[1.02]"
              />
              {/* Grid Inferior */}
              <div className="flex gap-6">
                <img
                  src={heroimage3}
                  alt="Programación"
                  className="rounded-[2rem] shadow-2xl w-1/2 border-[8px] border-main transition-transform duration-500 hover:scale-[1.02]"
                />
                <img
                  src={heroimage2}
                  alt="Apps Móviles"
                  className="rounded-[2rem] shadow-2xl w-1/2 border-[8px] border-main transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Herosection;