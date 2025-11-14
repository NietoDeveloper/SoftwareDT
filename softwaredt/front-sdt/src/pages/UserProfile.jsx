import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  // Datos de usuario simulados
  const user = {
    name: "UserProfile.jsx",
    email: "user.profile@empresa.com"
  };

  const goToClientPanel = () => {
    navigate('/client-panel'); // Asegúrate de que esta ruta coincida con la ruta de tu Router para ClientPanel.jsx
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-sm w-full transition duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
            {user.name[0]}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1 truncate max-w-full" title={user.name}>
            {user.name}
          </h2>
          <p className="text-sm text-gray-500 mb-6 truncate max-w-full" title={user.email}>
            {user.email}
          </p>
          
          <button
            onClick={goToClientPanel}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-md hover:shadow-lg"
          >
            Ir a Panel de Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;