import { Link } from "react-router-dom";
import heroimage2 from "../../assets/images/banner5.png";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";

const Herosection = () => {
  return (
    <>
      <h2
        className="absolute top-[65%] md:top-[50%] left-[35%] -translate-x-1/2 
  text-3xl md:text-5xl font-extrabold text-white tracking-wider z-50 
  drop-shadow-lg text-center max-w-xs md:max-w-md"
      >
        Software Dorado Technology
      </h2>

      <button
        className="absolute top-[calc(65%+5rem)] md:top-[calc(50%+8rem)] left-[35%] -translate-x-1/2 z-50 
  bg-gradient-to-r from-blue-700 to-blue-800 text-white font-extrabold 
  py-5 px-10 text-2xl
  md:py-6 md:px-12 md:text-3xl 
  rounded-full shadow-2xl transition-all duration-300 ease-in-out transform
  hover:from-yellow-400 hover:to-yellow-500 hover:text-gray-900
  hover:scale-110 hover:shadow-glow-xl
  focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        style={{
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
          "--tw-shadow-glow-xl":
            "0 0 30px rgba(252, 211, 77, 0.8), 0 0 60px rgba(252, 211, 77, 0.6)",
        }}
      >
        Contacto
      </button>

      {/* hero content */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-16 pb-12 lg:pt-0 lg:pb-0">
        {/* Sección 1: Hero (Estilo Tesla - Contenido a la izquierda, Imágenes a la derecha/fondo) */}
        <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20">
          {/* Contenido de Texto y Botón (Ocupa 50% en pantallas grandes) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
            <h1
              className="text-[36px] leading-[44px]
                   text-gray-800 font-[600] lg:text-[56px] lg:leading-[64px] mb-6"
            >
              Construimos Software Que Da Solucion
            </h1>
            <p className="text_para mb-8 text-lg text-gray-600">
              Innovamos con software de vanguardia. Transformamos negocios con
              tecnología personalizada. Potenciamos empresas con herramientas
              digitales. Diseñamos apps, web y software a medida. Soluciones
              escalables, intuitivas y eficientes. Tu visión, nuestra
              tecnología, resultados reales. Eleva tu negocio con nosotros.
            </p>
            <Link to="/doctors">
<button className="px-8 py-3 text-lg font-medium text-white border-2 border-transparent rounded-xl transition duration-300 bg-blue-600 hover:bg-yellow-400 hover:text-black">
  Agenda Tu Cita
</button>
            </Link>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
            <div className="flex flex-col gap-5 max-w-[350px] lg:max-w-full">
              <img
                src={heroimage4}
                alt="Diseño de Software"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="flex gap-5">
                <img
                  src={heroimage3}
                  alt="Programación"
                  className="rounded-xl shadow-xl w-1/2"
                />
                <img
                  src={heroimage2}
                  alt="Apps Móviles"
                  className="rounded-xl shadow-xl w-1/2"
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
