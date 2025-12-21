import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const ServicesCard = ({ item, index }) => {
  const { name, desc } = item;
  
  // ID Real de "Desarrollo Web" en tu base de datos
  const myDoctorId = "6503c1585805561b3693f18e";

  return (
    <div className="py-[35px] px-5 lg:px-8 bg-white rounded-[2.5rem] border-2 border-transparent hover:border-gold transition-all duration-500 group/card shadow-sm hover:shadow-2xl flex flex-col h-full">
      <h2 className="text-[24px] md:text-[28px] leading-tight text-headingColor font-black uppercase tracking-tighter group-hover/card:text-gold transition-colors duration-300">
        {name}
      </h2>
      
      <p className="text-[16px] leading-relaxed font-medium text-textColor mt-5 opacity-70 flex-grow">
        {desc}
      </p>

      <div className="flex items-center justify-between mt-[35px]">
        {/* Enlace hacia BookingPage con ID y State */}
        <Link
          to={`/book-appointment/${myDoctorId}`} 
          state={{ selectedService: item }} 
          className="w-[55px] h-[55px] rounded-full border-2 border-solid border-headingColor flex items-center justify-center group/btn hover:bg-gold hover:border-gold transition-all duration-300 shadow-md"
        >
          <BsArrowRight className="text-headingColor group-hover/btn:scale-125 group-hover/btn:text-black transition-all h-7 w-7" />
        </Link>

        <span className="w-[55px] h-[55px] flex items-center justify-center text-[22px] font-black bg-main text-headingColor rounded-2xl border border-black/5"> 
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default ServicesCard;