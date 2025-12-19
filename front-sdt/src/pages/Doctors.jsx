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


  });

  // FUNCIÓN CLAVE: Pasamos el objeto 'doctor' completo en el estado de navegación
  const navigateToBooking = (doctor) => {
    navigate(`/book-appointment/${doctor._id}`, { state: { doctorData: doctor } });
  };

  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold text-black">Cargando Servicios....</h1>;

  if (error) return <h1 className="text-center py-10 text-red-600 text-xl font-bold">Error cargando los Datos.</h1>;

  return (


            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;