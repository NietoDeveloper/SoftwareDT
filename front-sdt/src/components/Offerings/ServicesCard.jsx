import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const ServicesCard = ({ item, index }) => {
  const { name, desc, _id } = item; // Asegúrate de extraer el _id del item
  
  return (
    <div className="py-[30px] px-3 lg:px-5 bg-white rounded-3xl border-2 border-transparent hover:border-gold transition-all duration-300 group/card">
      <h2 className="text-[26px] leading-9 text-headingColor font-black uppercase tracking-tight">
        {name}
      </h2>
      
      <p className="text-[16px] leading-7 font-medium text-textColor mt-4 opacity-80">
        {desc}
      </p>

      <div className="flex items-center justify-between mt-[30px]">
        {/* CORRECCIÓN DE FLUJO: 
            1. Cambiamos /contact por /book-appointment/${_id}
            2. Pasamos el objeto completo en el 'state' para que BookingPage lo reciba de inmediato
        */}
        <Link
          to={`/book-appointment/${_id}`}
          state={{ doctorData: item }} 
          className="w-[44px] h-[44px] rounded-full border-2 border-solid border-black flex items-center justify-center group hover:bg-gold hover:border-gold transition-all duration-300 shadow-md"
        >
          <BsArrowRight className="text-black group-hover:scale-125 transition-transform h-5 w-6" />
        </Link>

        <span 
          className="w-[44px] h-[44px] flex items-center justify-center text-[20px] font-black leading-[30px] bg-main text-black rounded-xl border border-black/10 group-hover/card:bg-gold transition-colors duration-300"
        > 
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default ServicesCard;