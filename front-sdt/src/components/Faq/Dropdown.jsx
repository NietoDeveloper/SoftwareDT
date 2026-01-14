import { useState } from 'react';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false); // Maintain state for each FAQ item

  const handleFaq = () => {
    setOpen(!open); // Toggle the state for the specific FAQ item
  };

  return (
    <div className="flex flex-col justify-center items-center border-2">
       <div className="flex justify-center items-center px-2">
       
            <BsCaretUp size={20} className="text-blue-600 cursor-pointer" />
          )}
        </div>
      </div>

      <div>{open && <span className="text-center px-4">{answer}</span>}</div>
    </div>
  );
};

export default FaqItem;
