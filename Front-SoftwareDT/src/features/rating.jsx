import { useState } from 'react';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hover, setHover] = useState(0);

  // EFECTO DE SONIDO SOFTWARE DT
  const playClick = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  };

  const handlestarClick = (selectedRating) => {
    playClick();
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClick();
    console.log({ rating, reviewText });
  };

  return (
    <section className='w-full flex justify-center items-center py-10'>
      <div className='w-full max-w-2xl px-4'>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center text-center space-y-10">
          
          <div className="space-y-4">
            <h3 className='text-2xl sm:text-3xl font-black text-headingColor uppercase tracking-tighter leading-none'>
              ¿Cómo calificarías <br /> <span className="text-gold">tu experiencia técnica?</span>
            </h3>
            <p className="text-[10px] font-black text-textColor/40 uppercase tracking-[0.4em]">Validation Protocol v1.0</p>
          </div>

          {/* ESTRELLAS SOFTWARE DT CON HOVER Y GOLD FLOTANTE */}
          <div className='flex items-center gap-3 bg-main/50 p-6 rounded-3xl border border-headingColor/5 shadow-inner'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type='button'
                key={star}
                onClick={() => handlestarClick(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`text-4xl transition-all duration-300 transform active:scale-75 ${
                  star <= (hover || rating) 
                  ? 'text-gold scale-125 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]' 
                  : 'text-gainsboro opacity-50'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          
          {/* TEXTAREA ESTILO SDT */}
          <div className="w-full">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="ESCRIBE TU REVISIÓN TÉCNICA AQUÍ..."
              className="w-full bg-main/40 border-[1px] border-headingColor/10 p-6 rounded-[2rem] focus:border-gold focus:ring-0 outline-none transition-all font-bold text-headingColor resize-none text-sm placeholder:text-textColor/20"
              rows="5"
            />
          </div>
          
          {/* BOTÓN GOLD CON HOVER INTENSO Y MOVIMIENTO */}
          <div className='w-full max-w-xs'>
            <button
              type="submit"
              onClick={playClick}
              className="w-full py-5 bg-gold text-headingColor rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-500 
                         hover:bg-yellowColor hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(254,182,13,0.5)] active:scale-95"
            >
              Enviar Validación
            </button>
          </div>

          <p className="text-[9px] font-black text-gainsboro uppercase tracking-[0.6em]">
            End-to-End Encrypted Feedback
          </p>
          
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;