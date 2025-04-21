import axios from "@/api/axios";
import { useAuth } from "@/context/AuthContext"

const useRefreshToken = () => {
    const {setUser} = useAuth();

    const refresh = async () => {
         const response = await axios.get('auth/refresh',{
            withCredentials: true // Explicitly enable credentials
         });
        
        setUser(prev => {
           
            return {
                ...prev,
                accessToken: response.data.accessToken,
            
            };
        });
        return response.data.accessToken;
    };

    return refresh;

}

export default useRefreshToken;