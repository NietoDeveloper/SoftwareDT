import ServicesCard from './ServicesCard';

const servicesList = [
  {
    name: 'Desarrollo Web',
    desc: 'Desarrollamos Aplicaciones Y Webistes, con las ultimas y mejores technologias',
  },

  {
    name: 'Soluciones para Empresas',
    desc: 'Creamos Software que brinda soluciones e innovaciones que mejoran y cran excelentes procesos.',
  },

  {
    name: 'Software Personalizado',
    desc: 'Analizamos las solicitudes y necesidades para crear ',
  },
  {
    name: 'Software Contable, Manejo Personal, Manejo de Usuarios E Informacion.',
    desc: 'Aplicamos  aedr',
  },

  {
    name: 'Manejo y creacion de portafolio de redes sociales',
    desc: '',
  },

  {
    name: 'Productos',
    desc: '',
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
