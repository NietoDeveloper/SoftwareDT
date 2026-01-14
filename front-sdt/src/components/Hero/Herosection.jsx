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