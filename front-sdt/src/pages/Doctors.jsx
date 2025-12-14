import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios"; 
import Footer from "../components/Footer/Footer"; 

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
      const res = await axios.get(`${apiUrl}/doctors`);
      return res.data.doctors || res.data || [];
    } catch (error) {
      if (error.response) {
        toast.error("Fallo al cargar la lista de doctores. Error: " + error.response.status);
      } else {
        toast.error("Fallo de red o servidor no disponible. Por favor, inténtalo más tarde.");
      }
      throw error;
    }
  };


  if (isLoading) return <h1 className="text-center py-10 text-xl font-bold">Cargando Servicios....</h1>;
  





  return (



         
           
            



  );
};

export default DoctorList;