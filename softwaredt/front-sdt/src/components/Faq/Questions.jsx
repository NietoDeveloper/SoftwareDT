import FaqItem from "./Dropdown";
import equipo2 from '../../assets/images/equipo2.png';
import softlive from '../../assets/images/softlive.mp4';

const Questions = () => {
  return (
    <>
     <section className="relative h-[110vh]">
  <video
    autoPlay
    loop
    muted
    className="absolute w-full h-full object-cover z-0"
    src={softlive}
  />
  <div className="container relative z-10 text-black pt-[30px] pb-8">
    <div className="xl:w-[570px] mx-auto">
      <h2 className="heading text-center text-white">Preguntas Frecuentes </h2>
    </div>
    <div className="flex flex-col lg:flex-row justify-between lg:gap-2 gap-[50px]">
      <div className="w-full lg:w-1/2 pb-3">
        <img src={equipo2} alt="faq" className="rounded-2xl" />
      </div>
      <div className="pl-5 lg:mt-[30px] w-full">
        <div className="w-full  ">
          <div className='my-5'>
            <FaqItem
              question="Which method of payment do you accept?"
              answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            />
          </div>
          
          <div className='my-4'>
            <FaqItem
              question="How can I reschedule an appointment?"
              answer="To improve your FAQ section, you can..."
            />
          </div>
          
          <div className='my-4'>
            <FaqItem
              question="Can I set an reminder to my appointment?"
              answer="To improve your FAQ section, you can..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Questions