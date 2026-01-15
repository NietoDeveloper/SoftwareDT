import { useState } from 'react';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handlestarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <section className='w-full'>
      <div className='container'>
        
        <form >             
          

   

        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
