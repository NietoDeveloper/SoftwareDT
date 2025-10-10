import ServicesCard from './ServicesCard';

const servicesList = [
  {
    name: 'Desarrollo Web',
    desc: 'Desarrollamos Aplicaciones Y Webistes, con las ultimas y mejores technologias',
  },

  {
    name: 'Soluciones para Empresas',
    desc: 'Creamos Software que brinda soluciones e innovaciones para cada necesidad.',
  },

  {
    name: 'Software Personalizado',
    desc: 'Book a session with our resident therapists qualified in marriage counselling, addictions',
  },
  {
    name: 'Software Contable, Manejo Personal, Manejo de Usuarios E Informacion.',
    desc: 'Intensive care for cancer patients we offer chemo, surgery, and rehabilitation',
  },

  {
    name: 'Manejo y creacion de portafolio de redes sociales',
    desc: 'Gentle care during labor and safe delivery to nursing the newborn and mother',
  },

  {
    name: 'Productos',
    desc: 'Our nursing home is a sanctuary for your loved one thanks to qualified nurses',
  },
];

const Services = () => {
  return (
    <section>
      <div className="container">
        <div className="xl:w-[470px] mx-auto">
          <h2 className="heading text-center">Servicios</h2>
          <p className="text_para text-center">
            Ofrecemos los siguientes servicios:
          </p>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px]
    lg:mt-[55px]"
        >
          {servicesList.map((item, index) => (
            <ServicesCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
