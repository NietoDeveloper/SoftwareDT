import { useParams, useLocation } from "react-router-dom";
import useFetchData from "../hooks/useFetchData"; // Verifica que el archivo sea .js o .jsx
import { BASE_URL } from "../config";
import Loader from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const BookingPage = () => {
  const { doctorId } = useParams(); 
  const location = useLocation();
  
  const selectedService = location.state?.selectedService;

  // El fetch se activa automáticamente al recibir el doctorId
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${doctorId}`);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <section className="bg-main min-h-screen pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border-2 border-gold/20">
          <h2 className="text-3xl font-black text-headingColor uppercase mb-6">
            Agendar <span className="text-gold">Consultoría</span>
          </h2>
          
          {/* Información del Servicio seleccionado en Services.jsx */}
          <div className="bg-main/50 p-6 rounded-2xl mb-8 border-l-8 border-gold shadow-inner">
            <p className="text-xs uppercase font-black text-gray-400 tracking-widest mb-1">Motivo de Cita</p>
            <h3 className="text-xl font-black text-headingColor uppercase">
              {selectedService?.name || "Consultoría Técnica General"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center font-black text-xl">
                    {doctor?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Consultor Asignado</p>
                    <p className="text-lg font-black text-headingColor">{doctor?.name}</p>
                  </div>
                </div>
                <p className="text-textColor opacity-75 italic">"{doctor?.bio}"</p>
             </div>

             {/* Aquí puedes insertar tu componente de Formulario o DatePicker */}
             <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-400 font-medium">Formulario de Agendamiento Activo</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;