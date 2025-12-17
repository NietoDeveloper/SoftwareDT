import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer/Footer";

const ArrowRightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const DoctorList = () => {
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await axios.get(
        `${apiUrl}/doctors?_cache=${Date.now()}&random=${Math.random()}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0",
            Pragma: "no-cache",
            Expires: "0",
            "If-None-Match": "",
            "If-Modified-Since": "",
          },
        }
      );
      console.log("API response (debe ser 200 con datos):", res.status, res.data);
      return res.data.doctors || res.data || [];
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error ${error.response.status}: ${
            error.response.data.message || "Fallo desconocido."
          }`
        );
      } else {
        toast.error("Fallo de red. Verifica backend.");
      }
      throw error;
    }
  };

  const {
    data: doctors = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
    initialData: [],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading)
    return (
      <h1 className="text-center py-10 text-xl font-bold text-black">
        Cargando Doctores....
      </h1>
    );

  if (error) {
    const errorMessage = error.response
      ? `HTTP ${error.response.status}: ${
          error.response.data.message || "Error desconocido."
        }`
      : error.message;
    return (
      <h1 className="text-center py-10 text-red-600 text-xl font-bold">
        Error cargando los Datos. {errorMessage}
      </h1>
    );
  }



export default DoctorList;