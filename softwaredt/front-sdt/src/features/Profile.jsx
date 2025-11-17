import {Link, useNavigate} from 'react-router-dom';
import {axiosAuth} from '../API/api'; // ⬅️ CORRECCIÓN: Usar axiosAuth para el logout
import {AppContext} from '../context/UserContext';
import {useContext} from 'react';

const Profile = () => {
    const {setToken, setUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const response = await axiosAuth.post('/user/logout'); 

            if (response.status === 204) {
                setUser(null);
                setToken(null);
                localStorage.removeItem('accessToken'); 
                navigate('/');
            } else {
                // Aunque el backend envía 204 en caso de éxito, capturamos otros errores.
                console.log('Error logging out with status:', response.status);
            }
        } catch (error) {
            // El error 401 o de conexión también indica que la sesión terminó.
            // Es seguro limpiar el estado del frontend de todos modos.
            console.log('Error logging out. Cleaning local state.', error); 
            setUser(null);
            setToken(null);
            localStorage.removeItem('accessToken'); 
            navigate('/');
        }
    };

    return (
        <div className="relative bg-gray-300 max-w-80 h-32 top-24 right-32">
            <ul className="flex flex-col justify-between items-center text-center">
                <li className="text_para"> <Link to="/user/profile">Profile</Link></li>
                <li className="text_para" onClick={handleLogOut}>Log Out</li>
            </ul>
        </div>
    )
}

export default Profile;