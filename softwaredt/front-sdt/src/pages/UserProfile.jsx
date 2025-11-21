import React, { useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 
import { FiCalendar, FiLogOut } from 'react-icons/fi'; // Importamos iconos modernos

const UserProfile = () => {
    const navigate = useNavigate();
    
    // Obtener el estado 'user' y la función 'handleLogout' del contexto
    const { user, handleLogout } = useContext(UserContext);

    // Manejar el caso si el contexto aún no tiene el usuario cargado
    if (!user) {
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

    // Función para ir al panel de citas
    const goToAppointments = () => {
        // Asumiendo que esta es la ruta para las citas del cliente
        navigate('/pages/clientappointments'); 
    };

    // Obtenemos la inicial del nombre para el avatar
    const userInitial = user.name ? user.name[0].toUpperCase() : 'U';

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-inter">
            {/* Contenedor del Perfil: Limpio, moderno y con mejores márgenes */}
            <div className="bg-white shadow-2xl rounded-xl p-8 max-w-sm w-full border border-gray-200 transition duration-300 transform hover:scale-[1.01]">
                <div className="flex flex-col items-center">
                    
                    {/* Avatar con Inicial (sin foto) */}
                    <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-extrabold mb-6 shadow-lg border-4 border-white ring-2 ring-indigo-300">
                        {userInitial}
                    </div>

                    {/* Nombre */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-1 truncate max-w-full text-center" title={user.name}>
                        {user.name}
                    </h2>
                    
                    {/* Correo Electrónico */}
                    <p className="text-sm text-gray-500 mb-8 truncate max-w-full text-center" title={user.email}>
                        {user.email}
                    </p>
                    
                    {/* Sección de Botones con Separación */}

                    {/* Botón Ir a mis Citas (Citas/Panel) */}
                    <button
                        onClick={goToAppointments}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 ease-in-out shadow-md hover:shadow-lg mb-4"
                    >
                        <FiCalendar className="w-5 h-5" />
                        Ir a mis Citas
                    </button>

                    {/* Botón Cerrar Sesión */}
                    <button
                        onClick={logoutAndRedirect}
                        className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                    >
                        <FiLogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;