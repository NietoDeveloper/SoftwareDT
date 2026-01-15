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
  
  
            
           
            
            <div className=''>
                 <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Submit Review
            </button>
            </div>
           
          </div>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
