import { useState } from 'react';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handlestarClick = (selectedRating) => {
    setRating(selectedRating);
  };



export default ReviewForm;
