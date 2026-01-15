import { Link, useNavigate } from 'react-router-dom';
import { axiosAuth } from '../API/api';
import { UserContext } from '../context/UserContext'; 
import { useContext } from 'react';

const Profile = () => {
    const { setToken, setUser, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutFromApiAndState = async () => {
        try {

            await axiosAuth.post('/user/logout'); 

            handleLogout(); 
  
            navigate('/login'); 
        } catch (error) {
            console.error('Fallo la llamada al endpoint de logout. Limpiando sesión local.', error); 
            
            handleLogout(); 
            navigate('/login'); 
        }
    };

    return (
        <div className="absolute bg-white shadow-lg rounded-lg p-2 w-48 top-20 right-5 z-10 border border-gray-100">
            <ul className="flex flex-col text-sm">
                <li className="p-2 hover:bg-gray-100 rounded-md cursor-pointer transition duration-150">
 
                </li>
 
                <li 
                    className="p-2 hover:bg-red-50 rounded-md cursor-pointer transition duration-150 text-red-600 font-medium" 

                >
                    🚪 Cerrar Sesión
                </li>
            </ul>
        </div>
    )
}

export default Profile;