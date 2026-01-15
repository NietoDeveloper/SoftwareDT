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