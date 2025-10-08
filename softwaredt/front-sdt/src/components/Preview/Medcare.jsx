import techs1 from "../../assets/images/techs1.png";
import techs2 from "../../assets/images/techs2.png";
import feature from "../../assets/images/softwareempresas.mp4";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Medcare = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="lg:w-[480px] mx-auto pt-10">
            <h2 className="heading text-center">
              Ofrecemos el Mejor Software De Colombia
            </h2>
            <p className="text_para text-center">
              Programadores De Clase Mundial&apos;
              Talentosos Desarrolladores De Software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <video
                  src={feature}
                  autoPlay
                  loop
                  muted
                  alt="icon"
                  className="rounded-2xl"
                />
              </div>

              <div className="mt-[30px]">
                <h2
                  className="text-[26px] leading-9 text-gray-900 
                        font-[700] text-center"
                >
                  Servicios
                </h2>
                <p className="text-[16px] leading-7 text-gray-800 font-[400] text-center mt-4">
                  Software De Clase Mundial. Nuestro equipo se compone de desarrolladores de Software de clase mundial.
                </p>

                <Link
                  to="/doctors"
                  className="w-[40px] h-[40px] rounded-full border 
                        border-solid border-gray-900 mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-600"
                >
                  <BsArrowRight className="group-hover:text-white h-5 w-6" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={techs1} alt="icon" className="rounded-2xl" />
              </div>

              <div className="mt-[30px]">
                <h2
                  className="text-[26px] leading-9 text-gray-900 
                        font-[700] text-center"
                >
                  Las Mejores Technologias
                </h2>
                <p className="text-[16px] leading-7 text-gray-800 font-[400] text-center mt-4">
                   Software De Clase Mundial. Nuestro equipo se compone de desarrolladores de Software de clase mundial.
                </p>

                <Link
                  to="/doctors"
                  className="w-[40px] h-[40px] rounded-full border 
                        border-solid border-gray-900 mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-600"
                >
                  <BsArrowRight className="group-hover:text-white h-5 w-6" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={techs2} alt="icon" className="rounded-2xl" />
              </div>

              <div className="mt-[30px]">
                <h2
                  className="text-[26px] leading-9 text-gray-900 
                        font-[700] text-center"
                >
                  Productos
                </h2>
                <p className="text-[16px] leading-7 text-gray-800 font-[400] text-center mt-4">
                  
                </p>

                <Link
                  to="/doctors"
                  className="w-[40px] h-[40px] rounded-full border 
                        border-solid border-gray-900 mt-[30px] mx-auto flex items-center justify-center group hover:bg-blue-600"
                >
                  <BsArrowRight className="group-hover:text-white h-5 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Medcare;
