import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async () => {
        console.log('Entered Refresh')
        const response = await axios.get('http://localhost:8000/refresh', 
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        setAuth (prev => {
            console.log('Previous token',JSON.stringify(prev));
            console.log('New Token',response.data.accessToken);
            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        });

        return response.data.accessToken; }

    return refresh;
};

export default useRefreshToken;
