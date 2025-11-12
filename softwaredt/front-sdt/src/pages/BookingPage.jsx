import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/UserContext";
import doctorimg from '../assets/images/feature-img.png';
import { toast } from "react-toastify";


const BookAppointment = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const location = useLocation();

  const [doctor, setDoctor] = useState(location.state?.doctorData || null);
  const { token, user, setAppointmentDetails } = useContext(AppContext);
  const [appointment, setAppointment] = useState({ appointmentDate: '' });


  useEffect(() => {
    let isMounted = true;
    
    // Si el doctor ya está cargado y su ID coincide con el parámetro de la URL, salimos.
    if (doctor && doctor._id === doctorId) {
        return;
    }

    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/doctor/profile/${doctorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (isMounted) {
          setDoctor(response.data);
        }
        
      } catch (error) {
        toast.error("Error al obtener perfil del doctor.");
      }
    };
    
    // Solo hacemos fetch si no tenemos el doctor o si el ID no coincide (navegación directa).
    if (!doctor || doctor._id !== doctorId) {
        fetchDoctor();
    }
    
    return () => {
      isMounted = false;
    };
  }, [doctorId, token, doctor]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!appointment.appointmentDate) {
      toast.error("Por favor, selecciona una fecha para la cita.");
      return;
    }

    try {
      const formData = {
        appointmentDate: new Date(appointment.appointmentDate),
        user: user._id
      };
      
      const response = await axios.post(`http://localhost:8080/api/user/appointment/${doctorId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
          }
      });

      setAppointmentDetails(response.data.newAppointment);
      toast.success('¡Cita agendada con éxito! Procediendo al pago.');
      navigate('/checkout');

    } catch(error) {
      const errorMessage = error.response?.data?.message || "Error al agendar la cita.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="container py-10">
        {doctor ? (
        <div className="flex flex-col md:flex-row justify-around ">

          <div className="flex flex-col">
            <div className="flex pb-4">
              <img src={doctorimg} alt="doctorimg" className="w-44 h-44 rounded-lg" />
              <div className="flex flex-col px-6 pt-4">
                <p className="bg-teal-500/70 opacity-80 rounded-md p-2 cursor-pointer">{doctor.specialization}</p>
                <h3 className="text-xl">{doctor.name}</h3>
                <h3 className="">{doctor.rating}</h3>
              </div> 
            </div>

            <div className="flex justify-between pl-4 border-b-2">
               <h3 >Sobre</h3>
               <h3>Retroalimentacion</h3>
             </div>
          </div>
          
          <div className="shadow-2xl w-72 rounded-xl">
            <div className="flex flex-col items-center py-4">
              <h2 className="text-2xl">Ticket Precio: <span>${doctor.ticketPrice}</span></h2>
              <h2 className="text-xl py-4 underline">Available Slots:</h2>
              {doctor.timeSlots}
              <div>
                <form className="flex flex-col py-8" onSubmit={handleBooking} >
                  <label htmlFor="date" className="text-xl underline">Pick a date:</label>
                  <input 
                    type="date" 
                    id="date" 
                    required 
                    onChange={(e) => setAppointment({ ...appointment, appointmentDate: e.target.value })} 
                  />
                  <button className="btn mt-4" type="submit">Agenda Cita</button>
                </form>
              </div>
            </div>
          </div>

        </div>
        ) : (
         <p className="text-center text-red-500">Cargando Perfil del Doctor...</p>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;