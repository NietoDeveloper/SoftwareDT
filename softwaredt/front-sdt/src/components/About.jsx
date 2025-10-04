import about1 from "../assets/images/herodoctor4.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container pb-8">
        <div
          className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col
            lg:flex-row"
        >
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={about1} alt="about" className=" rounded-md" />
            <div
              className="absolute z-20 bottom-4 w-[200px] md:w-[300px] md:right-[-7px]
                    lg:right-[22px]"
            >
              <img src="" alt="" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">
              Creamos Software Con Estandares Mundiales
            </h2>
            <p className="text_para">
              Desarrollamos software innovador con estándares mundiales.
              Utilizamos las mejores tecnologías para soluciones de
              vanguardia. Nuestros proyectos garantizan calidad, eficiencia y
              resultados.Estamos ubicados en Bogotá, Colombia. Ademas  atendemos
              clientes en Colombia, Estados Unidos y Canadá.  Creamos soluciones
              personalizadas para cada negocio. Nuestro equipo apasionado supera
              expectativas en cada entrega. Transformamos ideas en herramientas
              que impulsan el éxito.Contáctenos para llevar su empresa al
              siguiente nivel. Construimos el futuro con tecnología de punta.
            </p>

            <Link to="/services">
              <button className="btn hover:bg-blue-500">Sobre Nosotros</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
