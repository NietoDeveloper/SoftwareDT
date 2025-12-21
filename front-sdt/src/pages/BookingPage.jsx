import { useParams, useLocation } from "react-router-dom";
import useFetchData from "../hooks/useFetchData"; // Asegúrate de que el archivo sea src/hooks/useFetchData.js
import { BASE_URL } from "../config";
import Loader from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const BookingPage = () => {
  const { doctorId } = useParams(); 
  const location = useLocation();
  
  // Recuperamos la información del servicio guardada en Services.jsx
  const selectedService = location.state?.selectedService;

  /**
   * Ajuste de Seguridad:
   * Solo hacemos la petición si doctorId existe para evitar errores 400 iniciales.
   */
  const { data: doctor, loading, error } = useFetchData(
    doctorId ? `${BASE_URL}/doctors/${doctorId}` : null
  );

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-main">
      <Loader />
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-main">
      <Error message={error} />
    </div>
  );

  return (
    <section className="bg-main min-h-screen pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border-2 border-gold/20">
          <h2 className="text-3xl font-black text-headingColor uppercase mb-6">
            Agendar <span className="text-gold">Consultoría</span>
          </h2>
          
          {/* Bloque del Servicio Seleccionado */}
          <div className="bg-main/50 p-6 rounded-2xl mb-8 border-l-8 border-gold shadow-inner">
            <p className="text-xs uppercase font-black text-gray-400 tracking-widest mb-1">
              Servicio para Software DT:
            </p>
            <h3 className="text-xl font-black text-headingColor uppercase">
              {selectedService?.name || "Consultoría Técnica Especializada"}
            </h3>
            {selectedService?.desc && (
              <p className="text-sm text-textColor opacity-70 mt-2 line-clamp-2">
                {selectedService.desc}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {/* Información del Consultor (NietoDeveloper) */}
             <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center font-black text-2xl shadow-md">
                    {doctor?.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Consultor Responsable</p>
                    <p className="text-xl font-black text-headingColor">{doctor?.name || "Cargando..."}</p>
                    <p className="text-sm text-gold font-bold">{doctor?.specialization}</p>
                  </div>
                </div>
                
                <div className="p-4">
                   <p className="text-headingColor font-bold mb-1 italic">Propuesta de valor:</p>
                   <p className="text-textColor opacity-75 leading-relaxed">"{doctor?.bio || "Experto en soluciones tecnológicas integrales."}"</p>
                </div>
             </div>

             {/* Área del Formulario de Agendamiento */}
             <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-main rounded-full flex items-center justify-center mb-4">
                   <span className="text-2xl">📅</span>
                </div>
                <p className="text-headingColor font-black uppercase mb-2">Formulario de Reserva</p>
                <p className="text-gray-400 text-sm font-medium px-8">
                  Aquí el usuario seleccionará la fecha y hora para tratar su proyecto de {selectedService?.name || "software"}.
                </p>
                <button className="mt-6 bg-gold text-black font-black px-8 py-3 rounded-full hover:shadow-xl transition-all uppercase text-sm">
                   Confirmar Disponibilidad
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;