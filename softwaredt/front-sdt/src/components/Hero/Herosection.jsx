import { Link } from 'react-router-dom';
import heroimage3 from '../../assets/images/hero-img03.png';
import heroimage4 from '../../assets/images/feature-img.png';
import Bog1 from '../../assets/images/softwareempresas.mp4';
import '../../App.css';

  const handleButtonClick = () => {
    alert('¡Botón Pulsado! 🚀');
  };

const Herosection = () => {

  return (
    <>
    

      {/* hero content */}
      <div>
        
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
            obcaecati minus aliquptate architecto! Quam veniam q uas
            fugiat repellat laudantium tempore?
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
