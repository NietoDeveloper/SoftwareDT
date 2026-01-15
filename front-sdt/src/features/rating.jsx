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
             
  
  
            
            <div>
                <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
            </div>
            
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
