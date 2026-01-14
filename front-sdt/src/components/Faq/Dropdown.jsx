import { useState } from 'react';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false); // Maintain state for each FAQ item

  const handleFaq = () => {
    setOpen(!open); // Toggle the state for the specific FAQ item
  };

  return (

  );
};

export default FaqItem;
