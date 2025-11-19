import React, { useContext } from 'react'; // 👈 1. Importar useContext
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // 👈 2. Importar UserContext

const UserProfile = () => {
    const navigate = useNavigate();
    
    // 👈 3. Obtener el estado 'user' y la función 'handleLogout' del contexto
    const { user, handleLogout } = useContext(UserContext);

    // 4. Manejar el caso si el contexto aún no tiene el usuario cargado
    if (!user) {
        // Podrías devolver un spinner, o una tarjeta de carga simple
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-gray-600">Cargando perfil...</div>
            </div>
        );
    }
    
    // Función para manejar el cierre de sesión
    const logoutAndRedirect = () => {
        handleLogout(); // Limpia el token y el usuario del estado y localStorage
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    };

    const goToClientPanel = () => {
        navigate('/client/dashboard'); 
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-sm w-full transition duration-300 hover:shadow-2xl">
                <div className="flex flex-col items-center">
                    {/* El resto del código usa el objeto 'user' del contexto */}
                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                        {/* Aseguramos que 'user.name' exista antes de acceder al índice [0] */}
                        {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-1 truncate max-w-full" title={user.name}>
                        {user.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-6 truncate max-w-full" title={user.email}>
                        {user.email}
                    </p>
                    
                    <button
                        onClick={goToClientPanel}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-md hover:shadow-lg mb-3"
                    >
                        Ir a Panel de Cliente
                    </button>

                    {/* Botón de Cerrar Sesión Añadido */}
                    <button
                        onClick={logoutAndRedirect}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;