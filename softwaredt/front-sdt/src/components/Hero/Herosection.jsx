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
      <div className="relative w-full h-screen overflow-hidden">
        <h1
          className="text-[36px] leading-[36px]
                     text-gray-800 mt-10 md:text-[60px] font-[600] md:leading-[70px]"
        >
          Construimos Software Que Da Solucion
        </h1>
        <p className="text_para mt-10">
          Innovamos con software de vanguardia. Transformamos negocios con
          tecnología personalizada. Potenciamos empresas con herramientas
          digitales. Diseñamos apps, web y software a medida. Soluciones
          escalables, intuitivas y eficientes. Tu visión, nuestra tecnología,
          resultados reales. Eleva tu
          negocio con nosotros.
        </p>
        <Link to="/doctors">
          <button className="btn border-4 border-black hover:bg-blue-500">
            Agenda Tu Cita
          </button>
        </Link>
      </div>
      <div className="mt-[25px] flex flex-col lg:flex-row lg:items-center lg:mt-[20px] gap-5 lg:gap-30px">
        <div>
          <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-gray-800">
            50+
          </h2>
          <span className="block h-2 w-[100px] bg-yellow-300 rounded-full mt-[-12px]"></span>
          <p className="text_para">Clientes Satisfechos</p>
        </div>
        <div>
          <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[50px] font-[700] text-gray-800">
            60+
          </h2>
          <span className="block h-2 w-[100px] bg-purple-600 rounded-full mt-[-12px]"></span>
          <p className="text_para">Apps Y Software Propios</p>
        </div>
        <div>
          <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-gray-800">
            100%
          </h2>
          <span className="block h-2 w-[150px] bg-teal-700 rounded-full mt-[-12px]"></span>
          <p className="text_para">Estandar Mundial</p>
        </div>
      </div>

      {/* hero images */}
      <div className="flex gap-[30px] justify-end">
        <div className="mt-[30px]">
          <img src={heroimage3} alt="doctor" className="w-full mb-[30px]" />
          <img src={heroimage4} alt="doctor" className="w-full mb-[30px]" />
          <img src={heroimage2} alt="doctor" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Herosection;
