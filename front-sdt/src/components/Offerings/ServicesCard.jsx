import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

const ServicesCard = ({ item, index }) => {
  const { name, desc, _id } = item; 
  
  return (
    <div className="py-[30px] px-3 lg:px-5 bg-white rounded-3xl border-2 border-transparent hover:border-gold transition-all duration-300 group/card">
      <h2 className="text-[26px] leading-9 text-headingColor font-black uppercase tracking-tight">
        {name}
      </h2>
      
      <p className="text-[16px] leading-7 font-medium text-textColor mt-4 opacity-80">
        {desc}
      </p>

      <div className="flex items-center justify-between mt-[30px]">

  );
};

export default ServicesCard;