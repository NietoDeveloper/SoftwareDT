import { Link } from 'react-router-dom';
import equipo1 from '../../assets/images/equipo1.png';

const Guide = () => {
  return (
    <>
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-col lg:flex-row pb-8 lg:pb-[55px] gap-12">
            
            {/* TEXTO Y PASOS */}
            <div className="xl:w-[670px] order-2 lg:order-1">
              <h2 className="text-[36px] leading-[44px] text-headingColor font-black uppercase tracking-tighter mb-6">
                Agenda tu Cita:
                <br /> <span className="text-gold">Un Ingeniero de Software te Guiará.</span>
              </h2>


          </div>
        </div>
      </section>
    </>
  );
};

export default Guide;