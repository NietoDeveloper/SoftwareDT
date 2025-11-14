import React, { useState, useEffect, useContext } from 'react';
import { AppContext as UserContext } from '../context/UserContext';  // Cambiado a named import con alias
import { Link } from 'react-router-dom';
import axios from 'axios';

const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block mr-2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0A2.25 2.25 0 0 1 5.25 16.5h13.5A2.25 2.25 0 0 1 21 18.75m-16.5-7.5h.008v.008h-.008v-.008Zm2.25-2.25h.008v.008h-.008V9Zm2.25 0h.008v.008h-.008V9Zm2.25-2.25h.008v.008h-.008V6.75Zm-4.5 9h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Z" />
  </svg>
);

const fetchClientAppointments = async (clientId) => {
  try {
    const response = await axios.get(`/api/appointments/${clientId}`);
    return response.data;
  } catch (err) {
    throw new Error('Error al cargar citas');
  }
};

const ClientPanel = () => {
  const { user, loading: userLoading, logout } = useContext(UserContext) || { user: null, loading: false, logout: () => {} };
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && !userLoading) {
      setLoading(true);
      fetchClientAppointments(user.id)
        .then(setAppointments)
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => setLoading(false));
    } else if (!userLoading) {
      setLoading(false);
    }
  }, [user, userLoading]);

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/70">
        <p className="text-xl font-semibold text-blue-600 animate-pulse">Cargando datos...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50/70 p-8">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Acceso Denegado 🛑</h1>
        <p className="text-lg text-gray-600 mb-6">Por favor, inicia sesión para ver tu panel.</p>
        <Link to="/login" className="py-2 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Ir a Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-blue-100">
          <h1 className="text-4xl font-extrabold text-blue-700 flex items-center">
            <span className="text-5xl mr-3">👋</span> Panel de Cliente
          </h1>
          <button
            onClick={logout}
            className="py-2 px-4 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition duration-200"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis Datos 👤</h2>
              <div className="space-y-3 text-gray-600">
                <p className="border-b pb-2"><strong>Nombre:</strong> <span className="font-semibold text-gray-700">{user.name || 'Cliente'} {user.lastName || 'Apellido'}</span></p>
                <p className="border-b pb-2"><strong>Email:</strong> <span className="font-semibold text-gray-700">{user.email || 'cliente@ejemplo.com'}</span></p>
                <p><strong>ID Cliente:</strong> <span className="font-semibold text-gray-700 text-sm bg-gray-100 p-1 rounded">{user.id || 'N/A'}</span></p>
              </div>
            </div>

            <div className="p-6 bg-blue-600 rounded-xl shadow-xl text-white">
              <h3 className="text-xl font-bold mb-3">¿Necesitas otra cita?</h3>
              <p className="mb-4 text-blue-100">Agenda tu próxima sesión con nuestros ingenieros ahora mismo.</p>
              <Link
                to="/doctors"
                className="inline-block py-2 px-4 bg-white text-blue-600 font-bold rounded-lg shadow hover:bg-gray-100 transition duration-200"
              >
                Agendar Nuevo Servicio
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <CalendarIcon className="w-8 h-8 text-blue-500" />
              Próximas Sesiones ({appointments.length})
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-green-500 hover:border-blue-500 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-lg font-bold text-gray-800">
                        {appointment.date} <span className="text-green-600 ml-1">{appointment.time}</span>
                      </p>
                      <span className="text-sm font-medium bg-gray-100 text-gray-600 py-1 px-3 rounded-full">
                        ID: {appointment.id}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1">
                      <strong className="text-gray-900">Servicio:</strong> {appointment.service}
                    </p>
                    <p className="text-gray-500 text-sm">
                      <strong className="text-gray-700">Ingeniero:</strong> {appointment.engineer}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
                <p className="text-xl font-semibold text-gray-700">🎉 ¡No tienes sesiones programadas!</p>
                <p className="text-gray-500 mt-2">Es un buen momento para agendar tu primera cita.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPanel;