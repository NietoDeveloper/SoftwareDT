import { useParams, useLocation } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";
import Loader from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const BookingPage = () => {
  const { doctorId } = useParams(); // Recibe 6503c1585805561b3693f18e
  const location = useLocation();
  
  // Capturamos el servicio seleccionado enviado desde ServicesCard
  const selectedService = location.state?.selectedService;

  // Fetch de los datos del consultor desde la DB
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <section className="bg-main min-h-screen pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border-2 border-gold/20">
          <h1 className="text-3xl font-black text-headingColor uppercase mb-2">
            Agendar <span className="text-gold">Consultoría</span>
          </h1>
          
          {/* Mostramos el servicio que viene del flujo anterior */}
          <div className="bg-main/50 p-4 rounded-xl mb-8 border-l-4 border-gold">
            <p className="text-sm uppercase font-bold text-gray-500">Servicio Seleccionado:</p>
            <h2 className="text-xl font-black text-headingColor uppercase">{selectedService?.name || "Consultoría General"}</h2>
          </div>

          {/* Aquí iría tu formulario de cita */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div>
                <p className="font-bold">Consultor: {doctor?.name}</p>
                <p className="text-sm opacity-70">{doctor?.specialization}</p>
             </div>
             {/* Componente de Formulario aquí */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;