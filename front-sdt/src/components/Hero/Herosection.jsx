import { Link } from "react-router-dom";
import heroimage2 from "../../assets/images/banner5.png";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";

const Herosection = () => {
  return (
    <>
      {/* Fondo Gainsboro aplicado a la sección principal */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-16 pb-12 lg:pt-0 lg:pb-0 bg-gainsboro">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
            {/* Texto forzado a Negro */}
            <h1 className="text-[36px] leading-[44px] text-black font-[700] lg:text-[56px] lg:leading-[64px] mb-6">
              Construimos Software Que Da Solucion
            </h1>
            
            <p className="mb-8 text-lg text-black font-medium opacity-90">
              Innovamos con software de vanguardia. Transformamos negocios con
              tecnología personalizada. Potenciamos empresas con herramientas
              digitales. Diseñamos apps, web y software a medida. Soluciones
              escalables, intuitivas y eficientes. Con Tu visión y nuestra
              tecnología, resultados reales. Eleva tu negocio con nosotros.
            </p>

            <Link to="/doctors">
              {/* Botón: Fondo Negro, Texto Blanco -> Hover Gold con Texto Negro */}
              <button className="px-8 py-3 text-lg font-bold text-white bg-black border-2 border-black rounded-xl transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold shadow-md">
                Agenda Tu Cita
              </button>
            </Link>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
            <div className="flex flex-col gap-5 max-w-[350px] lg:max-w-full">
              {/* Imágenes con fondo blanco en el borde (opcional) para resaltar */}
              <img
                src={heroimage4}
                alt="Diseño de Software"
                className="rounded-xl shadow-2xl w-full border-4 border-white"
              />
              <div className="flex gap-5">
                <img
                  src={heroimage3}
                  alt="Programación"
                  className="rounded-xl shadow-2xl w-1/2 border-4 border-white"
                />
                <img
                  src={heroimage2}
                  alt="Apps Móviles"
                  className="rounded-xl shadow-2xl w-1/2 border-4 border-white"
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