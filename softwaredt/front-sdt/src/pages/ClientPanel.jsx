import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Verifica que la ruta y exportación sean correctas
import './ClientPanel.css'; // Debe existir en el mismo directorio

// Simulamos una llamada al backend (Node.js) para obtener las citas
const fetchClientAppointments = async (clientId) => {
  // En una aplicación real, harías un 'fetch' o 'axios.get' a tu API de Node.js
  console.log(`Simulando obtener citas para el cliente ID: ${clientId}`);

  // Datos simulados:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 'A001', 
          date: '2025-12-01', 
          time: '10:00 AM', 
          service: 'Análisis de Requisitos', 
          engineer: 'Ing. Laura Gómez' 
        },
        { 
          id: 'A002', 
          date: '2025-12-05', 
          time: '03:30 PM', 
          service: 'Revisión de Código', 
          engineer: 'Ing. David Flores' 
        },
        { 
          id: 'A003', 
          date: '2025-12-10', 
          time: '09:00 AM', 
          service: 'Despliegue en Servidor', 
          engineer: 'Ing. Laura Gómez' 
        },
      ]);
    }, 1000); // Retraso de 1 segundo para simular la carga
  });
};

const ClientPanel = () => {
  // 1. Obtener datos del usuario autenticado (cliente)
  const { user, loading: userLoading } = useContext(UserContext) || {}; 
  
  // 2. Estados para manejar las citas y la carga
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Efecto para cargar las citas al montar el componente
  useEffect(() => {
    // Es CRUCIAL que userLoading se haya resuelto y que user exista y sea cliente.
    if (!userLoading && user && user.isClient && user.id) {
      setLoading(true);
      fetchClientAppointments(user.id)
        .then(data => {
          setAppointments(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error al cargar citas:", err);
          setError("No se pudieron cargar las citas. Inténtalo de nuevo más tarde.");
          setLoading(false);
        });
    } else if (!userLoading && !user) {
      // Si la autenticación terminó y no hay usuario, deja de cargar.
      setLoading(false);
    }
  }, [user, userLoading]);

  // --- Renderizado Condicional ---

  if (userLoading || loading) {
    return <div className="client-panel-container loading">Cargando datos...</div>;
  }
  
  // Verifica si el usuario no está autenticado o no es un cliente (para ruta protegida)
  if (!user || !user.isClient) {
    return <div className="client-panel-container unauthorized">Acceso denegado. Por favor, inicia sesión como cliente.</div>;
  }

  return (
    <div className="client-panel-container">
      <h1 className="panel-title">👋 Panel de Cliente</h1>
      
      {/* Sección de Datos del Cliente */}
      <div className="client-info-card card">
        <h2 className="info-title">Mis Datos</h2>
        <p><strong>Nombre:</strong> {user.name || 'Cliente'} {user.lastName || 'Apellido'}</p>
        <p><strong>Email:</strong> {user.email || 'cliente@ejemplo.com'}</p>
        <p><strong>ID Cliente:</strong> {user.id || 'N/A'}</p>
      </div>

      <hr className="divider" />

      {/* Sección de Citas Pendientes */}
      <h2 className="appointments-title">📅 Mis Citas Pendientes</h2>
      
      {error && <p className="error-message">{error}</p>}

      {appointments.length > 0 ? (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card card">
              <p className="appointment-date-time">
                <strong>Fecha y Hora:</strong> {appointment.date} a las {appointment.time}
              </p>
              <p><strong>Servicio Solicitado:</strong> {appointment.service}</p>
              <p className="appointment-engineer">
                <strong>Ingeniero Asignado:</strong> {appointment.engineer}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-appointments">🎉 ¡No tienes citas pendientes!</p>
      )}
    </div>
  );
};

export default ClientPanel;