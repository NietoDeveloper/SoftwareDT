import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link } from "react-router-dom";

const ClientAppointmentsPanel = () => {
  const { user } = useContext(UserContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments/user/${user.id}`);
        if (!response.ok) throw new Error("Error al cargar citas");
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchAppointments();
  }, [user]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Panel de Citas</h1>
      <ul className="space-y-4">
        {appointments.map((appt) => (
          <li key={appt.id} className="border p-2">
            <p>Fecha: {appt.date}</p>
            <p>Doctor: {appt.doctorName}</p>
            <Link to={`/appointment-confirmation/${appt.id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientAppointmentsPanel;