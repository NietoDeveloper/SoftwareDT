import { useState } from 'react';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const handleFaq = () => {
    setOpen(!open);
  };

  return (
    <div 
      className="faq-item group w-full flex flex-col justify-center items-center border-2 border-white/20 rounded-2xl py-4 transition-all duration-300 hover:border-gold/50 hover:bg-white/5 cursor-pointer mb-4"
      onClick={handleFaq}
    >
       <div className="flex justify-between items-center w-full px-6">
        <p className="text-center font-bold uppercase tracking-wider text-white group-hover:text-gold transition-colors duration-300">
          {question}
        </p>

        <div className="flex items-center">
          {open ? (
            <BsCaretUp size={22} className="text-gold animate-pulse" />
          ) : (
            <BsCaretDown size={22} className="text-white group-hover:text-gold transition-colors" />
          )}
        </div>
      </div>

      {/* Respuesta: Blanco suave para que no compita con el título */}
      <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <span className="text-center block px-6 text-white/90 font-medium leading-relaxed italic">
          {answer}
        </span>
      </div>
    </div>
  );
};

export default FaqItem;