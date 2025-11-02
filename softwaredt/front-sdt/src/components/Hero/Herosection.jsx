import { Link } from "react-router-dom";
import heroimage2 from "../../assets/images/banner5.png";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";

const Herosection = () => {
  return (
    <>

      </button>

      <section className="min-h-screen w-full flex flex-col justify-center items-center relative pt-16 pb-12 lg:pt-0 lg:pb-0">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row lg:items-center justify-between gap-10 lg:gap-20">
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
              escalables, intuitivas y eficientes. Con Tu visión y nuestra
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
