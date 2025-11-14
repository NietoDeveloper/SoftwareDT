import React from 'react';

const UserProfile = () => {
  // Datos simulados del usuario. En una aplicación real, usarías
  // el hook 'useState' o Redux/Context para obtener esta información.
  const user = {
    name: 'Ana García',
    email: 'ana.garcia@softcompany.com',
    role: 'Desarrolladora Senior',
  };

  const goToClientPanel = () => {
    // Lógica de navegación: Aquí es donde integrarías un router (como react-router-dom)
    // para cambiar a la ruta del componente ClientPanel.jsx.
    console.log('Navegando al panel de clientes (ClientPanel.jsx)...');
    // Ejemplo de navegación con un router simulado:
    // navigate('/client-panel');
  };

  // Icono de Usuario (SVG inline para evitar dependencias)
  const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  // Icono de Correo (SVG inline)
  const MailIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );

  // Icono de Flecha (SVG inline)
  const ChevronRight = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

  return (
    <div className="flex items-center justify-center p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-xl border border-gray-100">
        
        {/* Cabecera del Perfil */}
        <div className="flex flex-col items-center border-b pb-4 mb-4">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 ring-2 ring-indigo-300">
            <UserIcon className="w-8 h-8"/>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {user.name}
          </h1>
          <p className="text-sm text-indigo-500 font-medium mt-1">
            {user.role}
          </p>
        </div>

        {/* Detalles del Usuario */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-indigo-50 rounded-lg">
            <MailIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase text-indigo-600">
                Correo Electrónico
              </p>
              <p className="text-sm font-medium text-gray-800 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={goToClientPanel}
          className="mt-6 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-semibold rounded-xl shadow-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <span className="mr-2">Ir a Panel de Clientes</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;