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
          <div className="lg:w-[700px] mx-auto">
            <h2 className="text-[32px] md:text-[42px] leading-tight text-headingColor font-black text-center uppercase tracking-tighter">
              Ofrecemos el Mejor <span className="text-gold">Software De Colombia</span>
            </h2>
            <p className="text-lg text-textColor text-center mt-4 font-medium opacity-80">
              Ingenieros De Software De Clase Mundial. <br className="hidden md:block"/>
              Talentosos Y Rankeados Altamente En Colombia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            
            {/* CARD 1 - SERVICIOS */}
            <div className="flex flex-col h-full py-8 px-6 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-gold transition-all duration-500 shadow-sm hover:shadow-2xl group">
              <div className="h-[220px] flex items-center justify-center overflow-hidden rounded-3xl border-2 border-black bg-black">
                <video
                  src={feature}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="mt-8 flex flex-col flex-grow">
                <h2 className="text-[26px] leading-none text-headingColor font-black text-center uppercase">
                  Servicios
                </h2>
                <p className="text-[16px] leading-relaxed text-textColor font-medium text-center mt-4 flex-grow">
                  Software De Clase Mundial. Nuestro equipo se compone de desarrolladores altamente calificados.
                </p>

                <Link
                  to="/services"
                  className="w-[60px] h-[60px] rounded-full border-2 border-headingColor mt-8 mx-auto flex items-center justify-center group/btn hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <BsArrowRight className="text-headingColor group-hover/btn:scale-125 transition-transform h-7 w-7" />
                </Link>
              </div>
            </div>

            {/* CARD 2 - TECNOLOGÍAS */}
            <div className="flex flex-col h-full py-8 px-6 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-gold transition-all duration-500 shadow-sm hover:shadow-2xl group">
              <div className="h-[220px] flex items-center justify-center overflow-hidden rounded-3xl border-2 border-black bg-main">
                <img src={techs1} alt="Tecnologías" className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="mt-8 flex flex-col flex-grow">
                <h2 className="text-[26px] leading-none text-headingColor font-black text-center uppercase">
                  Tecnologías
                </h2>
                <p className="text-[16px] leading-relaxed text-textColor font-medium text-center mt-4 flex-grow">
                   Implementamos las mejores herramientas del mercado para garantizar escalabilidad y alto rendimiento.
                </p>

                <Link
                  to="/contact"
                  className="w-[60px] h-[60px] rounded-full border-2 border-headingColor mt-8 mx-auto flex items-center justify-center group/btn hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <BsArrowRight className="text-headingColor group-hover/btn:scale-125 transition-transform h-7 w-7" />
                </Link>
              </div>
            </div>

            {/* CARD 3 - PRODUCTOS (Redirige a OurClients) */}
            <div className="flex flex-col h-full py-8 px-6 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-gold transition-all duration-500 shadow-sm hover:shadow-2xl group">
              <div className="h-[220px] flex items-center justify-center overflow-hidden rounded-3xl border-2 border-black bg-main">
                <img src={techs2} alt="Productos" className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="mt-8 flex flex-col flex-grow">
                <h2 className="text-[26px] leading-none text-headingColor font-black text-center uppercase">
                  Productos
                </h2>
                <p className="text-[16px] leading-relaxed text-textColor font-medium text-center mt-4 flex-grow">
                   Soluciones digitales terminadas y listas para potenciar la eficiencia de tu modelo de negocio actual.
                </p>

                <Link
                  to="/ourclients"
                  className="w-[60px] h-[60px] rounded-full border-2 border-headingColor mt-8 mx-auto flex items-center justify-center group/btn hover:bg-gold hover:border-gold transition-all duration-300"
                >
                  <BsArrowRight className="text-headingColor group-hover/btn:scale-125 transition-transform h-7 w-7" />
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