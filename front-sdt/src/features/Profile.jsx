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

            </ul>
        </div>
    )
}

export default Profile;