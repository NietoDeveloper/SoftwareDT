import { Link, useNavigate } from 'react-router-dom';
import { axiosAuth } from '../API/api';
// 🛠️ CORRECCIÓN CLAVE: Cambiar AppContext por UserContext
import { UserContext } from '../context/UserContext'; 
import { useContext } from 'react';

const Profile = () => {
    // 🛠️ Corrección: Usar UserContext al consumir el contexto
    // También obtenemos handleLogout, ya que es la función que deberíamos usar.
    const { setToken, setUser, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    // 💡 BUENA PRÁCTICA: Usar la función handleLogout ya definida en el contexto.
    // Esto asegura que la lógica de limpieza de estado y localStorage sea consistente.
    // Sin embargo, mantendremos la llamada a la API de logout aquí.

    const logoutFromApiAndState = async () => {
        try {
            // 1. Llamada a la API de backend
            await axiosAuth.post('/user/logout'); 
            
            // 2. Limpieza de estado local (usa la lógica del contexto)
            handleLogout(); 
            
            // 3. Redirección
            navigate('/login'); // Es más común redirigir a /login después de cerrar sesión
        } catch (error) {
            // 🚨 Importante: Si la API de logout falla (ej. token caducado), 
            // igual debemos limpiar la sesión localmente para evitar que el usuario se quede "colgado".
            console.error('Fallo la llamada al endpoint de logout. Limpiando sesión local.', error); 
            
            handleLogout(); 
            navigate('/login'); 
        }
    };

    return (
        <div className="absolute bg-white shadow-lg rounded-lg p-2 w-48 top-20 right-5 z-10 border border-gray-100">
            <ul className="flex flex-col text-sm">
                <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150">
                    <Link to="/user/profile" className="w-full block text-gray-700 font-medium">
                        👤 Mi Perfil
                    </Link>
                </li>
                <hr className="my-1 border-gray-200" />
                <li 
                    className="p-2 hover:bg-red-50 rounded-md cursor-pointer transition duration-150 text-red-600 font-medium" 
                    onClick={logoutFromApiAndState}
                >
                    🚪 Cerrar Sesión
                </li>
            </ul>
        </div>
    )
}

export default Profile;