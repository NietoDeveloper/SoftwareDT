import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const ServicesCard = ({ item, index }) => {
  const { name, desc } = item;
  
  // ID de NietoDeveloper (Consultor) para que cargue la DB exitosamente
  const myDoctorId = "67664366521a0f5a7732298c";

  return (
    <div className="py-[35px] px-5 lg:px-8 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-gold transition-all duration-500 group/card shadow-sm hover:shadow-2xl flex flex-col h-full">
      {/* Título */}
      <h2 className="text-[24px] md:text-[28px] leading-tight text-headingColor font-black uppercase tracking-tighter group-hover/card:text-gold transition-colors duration-300">
        {name}
      </h2>
      
      {/* Descripción */}
      <p className="text-[16px] leading-relaxed font-medium text-textColor mt-5 opacity-70 flex-grow">
        {desc}
      </p>

      <div className="flex items-center justify-between mt-[35px]">
        {/* BOTÓN AJUSTADO: Ahora apunta a la ruta de Booking con tu ID y pasa el objeto 'item' completo */}
        <Link
          to={`/booking/${myDoctorId}`} 
          state={{ selectedService: item }} 
          className="w-[55px] h-[55px] rounded-full border-2 border-solid border-headingColor flex items-center justify-center group/btn hover:bg-gold hover:border-gold transition-all duration-300 shadow-md"
        >
          <BsArrowRight className="text-headingColor group-hover/btn:scale-125 group-hover/btn:text-black transition-all h-7 w-7" />
        </Link>

        {/* Indicador de Número */}
        <span 
          className="w-[55px] h-[55px] flex items-center justify-center text-[22px] font-black bg-main text-headingColor rounded-2xl border border-black/5 group-hover/card:bg-gold group-hover/card:text-black transition-all duration-500 transform group-hover/card:rotate-6"
        > 
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default ServicesCard;