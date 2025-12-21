import { useNavigate } from "react-router-dom";
import ServicesCard from "./ServicesCard";

// ... (servicesList y techIcons se mantienen igual)

const Services = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    // ID de tu perfil en la DB
    const myDoctorId = "67664366521a0f5a7732298c"; 

    // Forzamos la ruta absoluta a /booking/id
    navigate(`/booking/${myDoctorId}`, { 
      state: { selectedService: service } 
    });
  };

  return (
    <div className="bg-main overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        footer, footer *, .footer-section, .footer-section * { color: #ffffff !important; }
        .tech-card:hover img { filter: drop-shadow(0 0 10px #FEB60D); }
      `}} />

      <section className="py-20 max-w-[1800px] mx-auto px-4 sm:px-8">
        <div className="lg:w-[600px] mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-headingColor uppercase tracking-tighter">
            Nuestros <span className="text-gold">Servicios</span>
          </h2>
          <p className="text-lg text-textColor mt-4 font-medium opacity-80">
            Selecciona un servicio para agendar tu consultoría técnica en Bogotá.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((item, index) => (
            /* Si ServicesCard tiene un Link interno a /contact, 
               debemos capturar el click aquí o pasarle la prop 
            */
            <div 
              key={item.id || index} 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Evita que otros links internos se disparen
                handleServiceSelect(item);
              }} 
              className="cursor-pointer group"
            >
              <ServicesCard item={item} index={index} />
            </div>
          ))}
        </div>
      </section>

      {/* ... (Tech Stack Section) */}
    </div>
  );
};

export default Services;