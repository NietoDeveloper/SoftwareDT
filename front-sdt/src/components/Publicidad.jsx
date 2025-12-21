import techs1 from "../assets/images/techs1.png";
import techs2 from "../assets/images/techs2.png";
import feature from "../assets/images/softwareempresas.mp4";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Publicidad = () => {
  return (
    <>
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="lg:w-[580px] mx-auto">
            <h2 className="text-[36px] leading-[44px] text-headingColor font-black text-center uppercase tracking-tighter">
              Ofrecemos el Mejor <span className="text-gold">Software De Colombia</span>
            </h2>
            <p className="text-lg text-textColor text-center mt-4 font-medium">
              Ingenieros De Software De Clase Mundial.
              Talentosos Y Rankeados Altamente En Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[55px]">
            
            {/* CARD 1 - SERVICIOS (VIDEO) */}
            <div className="py-[30px] px-5 bg-white rounded-3xl border-2 border-transparent hover:border-gold transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center justify-center overflow-hidden rounded-2xl border-2 border-black">
                <video
                  src={feature}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-black text-center uppercase">
                  Servicios
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-medium text-center mt-4">
                  Software De Clase Mundial. Nuestro equipo se compone de desarrolladores de Software altamente calificados.
                </p>

                <Link
                  to="/contact"
                  className="w-[50px] h-[50px] rounded-full border-2 border-solid border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <BsArrowRight className="text-black group-hover:scale-125 transition-transform h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* CARD 2 - TECNOLOGÍAS */}
            <div className="py-[30px] px-5 bg-white rounded-3xl border-2 border-transparent hover:border-gold transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center justify-center overflow-hidden rounded-2xl border-2 border-black bg-main">
                <img src={techs1} alt="Tecnologías" className="w-full h-full object-contain p-2" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-black text-center uppercase">
                  Tecnologías
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-medium text-center mt-4">
                   Implementamos las mejores herramientas del mercado para garantizar escalabilidad y alto rendimiento.
                </p>

                <Link
                  to="/contact"
                  className="w-[50px] h-[50px] rounded-full border-2 border-solid border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <BsArrowRight className="text-black group-hover:scale-125 transition-transform h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* CARD 3 - PRODUCTOS */}
            <div className="py-[30px] px-5 bg-white rounded-3xl border-2 border-transparent hover:border-gold transition-all duration-300 shadow-sm hover:shadow-xl">
              <div className="flex items-center justify-center overflow-hidden rounded-2xl border-2 border-black bg-main">
                <img src={techs2} alt="Productos" className="w-full h-full object-contain p-2" />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-black text-center uppercase">
                  Productos
                </h2>
                <p className="text-[16px] leading-7 text-textColor font-medium text-center mt-4">
                   Soluciones digitales terminadas y listas para potenciar la eficiencia de tu modelo de negocio actual.
                </p>

                <Link
                  to="/contact"
                  className="w-[50px] h-[50px] rounded-full border-2 border-solid border-black mt-[30px] mx-auto flex items-center justify-center group hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <BsArrowRight className="text-black group-hover:scale-125 transition-transform h-6 w-6" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Publicidad;