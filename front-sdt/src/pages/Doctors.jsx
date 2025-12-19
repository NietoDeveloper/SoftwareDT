import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";

// Icono optimizado
const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      // Eliminamos el exceso de headers manuales, React Query ya maneja el cache eficientemente
      const res = await axios.get(`${apiUrl}/doctors`);
      
      // Ajuste según lo que vimos en tu consola (res.data suele ser donde están los datos)
      return res.data.doctors || res.data; 
    } catch (error) {
      toast.error("Error al conectar con el servidor");
      throw error;
    }
  };

  const { data: doctors = [], error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  // FUNCIÓN CLAVE: Pasamos el objeto 'doctor' completo en el estado de navegación
  const navigateToBooking = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, { state: { doctorData: doctor } });
  };

  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold text-black">Cargando Servicios....</h1>;

  if (error) return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos.</h1>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-8 max-w-screen-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-black">Servicios</h1>
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">Escoge Un Servicio</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="group bg-white rounded-lg p-6 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center w-full max-w-[280px] h-[550px] shadow-lg hover:shadow-2xl hover:translate-y-[-10px] hover:bg-yellow-50 text-black"
              onClick={() => navigateToBooking(doctor)} // Pasamos el objeto completo
            >


              <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center group-hover:bg-amber-500 transition-colors mt-6">
                <ArrowRightIcon className="text-black group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;