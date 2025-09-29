import { Link } from "react-router-dom";
import heroimage3 from "../../assets/images/hero-img03.png";
import heroimage4 from "../../assets/images/feature-img.png";
import Bog1 from "../../assets/images/softwareempresas.mp4";

const Herosection = () => {
  return (
    <>

    <h2 
    className="absolute top-[65%] md:top-[55%] left-[35%] -translate-x-1/2 
               text-lg md:text-3xl font-extrabold text-white tracking-wider z-50 
               drop-shadow-lg text-center max-w-xs"
  >
    Software Dorado Technology
  </h2>

  <button
    // La base es 65%+4rem. En escritorio (md:), se sube a 55% y se aumenta la separación a 6rem.
    className="absolute top-[calc(65%+4rem)] md:top-[calc(55%+6rem)] left-[35%] -translate-x-1/2 z-50 
               bg-gradient-to-r from-blue-700 to-blue-800 text-white font-extrabold 
               py-5 px-10 text-2xl
               md:py-7 md:px-14 md:text-3xl 
               rounded-full shadow-2xl transition-all duration-300 ease-in-out transform
               hover:from-yellow-400 hover:to-yellow-500 hover:text-gray-900
               hover:scale-110 hover:shadow-glow-xl
               focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
    style={{
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6)',
      '--tw-shadow-glow-xl': '0 0 30px rgba(252, 211, 77, 0.8), 0 0 60px rgba(252, 211, 77, 0.6)' 
    }}
  >
    Contacto
  </button>

    
      {/* hero content */}
      <section className={`h-[110vh] w-full relative flex justify-center`}>
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          src={Bog1}
        />
      </section>
      <div>
        <h1
          className="text-[36px] leading-[36px]
                     text-gray-800  md:text-[60px] font-[600] md:leading-[70px]"
        >
          Construimos las soluciones para nuestros clientes
        </h1>
        <p className="text_para ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius,
          obcaecati minus aliquptate architecto! Quam veniam q uas fugiat
          repellat laudantium tempore?
        </p>
        <Link to="/doctors">
          <button className="btn border-4 border-black hover:bg-blue-500">
            Book an Appointment
          </button>
        </Link>
      </div>
      <div className="mt-[25px] flex flex-col lg:flex-row lg:items-center lg:mt-[20px] gap-5 lg:gap-30px">
        <div>
          <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-gray-800">
            30+
          </h2>
          <span className="block h-2 w-[100px] bg-yellow-300 rounded-full mt-[-12px]"></span>
          <p className="text_para">Years of Experience</p>
        </div>
        <div>
          <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[50px] font-[700] text-gray-800">
            10+
          </h2>
          <span className="block h-2 w-[100px] bg-purple-600 rounded-full mt-[-12px]"></span>
          <p className="text_para">Locations</p>
        </div>
        <div>
          <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-gray-800">
            100%
          </h2>
          <span className="block h-2 w-[150px] bg-teal-700 rounded-full mt-[-12px]"></span>
          <p className="text_para">Guaranteed Satisfaction</p>
        </div>
      </div>

      {/* hero images */}
      <div className="flex gap-[30px] justify-end">
        <div className="flex-grow">
          <img src={heroimage4} alt="doctor" className="w-full" />
        </div>
        <div className="mt-[30px]">
          <img src={heroimage3} alt="doctor" className="w-full mb-[30px]" />
          <img src={heroimage4} alt="doctor" className="w-full mb-[30px]" />
        </div>
      </div>
    </>
  );
};

export default Herosection;
