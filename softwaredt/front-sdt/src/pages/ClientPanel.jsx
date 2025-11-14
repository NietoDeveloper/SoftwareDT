import React from 'react';
import UserContext from '../context/UserContext.jsx';  // Cambiado a import default
import { useContext } from 'react';  // Si no está, agrégalo

const ClientPanel = () => {
  const { user } = useContext(UserContext);  // Asumiendo que provee 'user'

  return (
    <div>
      <h1>Panel del Cliente</h1>
      {user ? (
        <p>Bienvenido, {user.name}. Aquí ves tus citas y datos.</p>
      ) : (
        <p>Cargando...</p>
      )}
      {/* Agrega más contenido optimizado, como lista de citas */}
    </div>
  );
};

export default ClientPanel;