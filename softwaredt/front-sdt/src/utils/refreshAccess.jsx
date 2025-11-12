import { axiosAuth } from "../API/api";

const refreshAccessToken = async (setToken, handleLogout) => {
    try {

        const response = await axiosAuth.get('/user/refresh'); 
        
        const { accessToken } = response.data;
        
        setToken(prev => { 
            console.log(JSON.stringify(prev));
            return { ...prev, accessToken };
        });
        
        return accessToken;
        
    } catch (error) {
        console.error("Error refreshing access token: Session expired or invalid refresh token.", error);
        
        if (handleLogout && error.response && error.response.status === 401) {
            handleLogout();
        }
        
        throw error;
    }
};

export default refreshAccessToken;