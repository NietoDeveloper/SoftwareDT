import { Link, useNavigate } from 'react-router-dom';
import { axiosAuth } from '../API/api';
import { UserContext } from '../context/UserContext'; 
import { useContext } from 'react';

const Profile = () => {
    const { setToken, setUser, handleLogout } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutFromApiAndState = async () => {
        try {

    )
}

export default Profile;