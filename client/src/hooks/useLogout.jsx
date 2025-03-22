import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';

const useLogout = () => {
  const axios = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axios.patch('http://localhost:8000/Logout', {
        Headers: { 'Content-Type': 'application/json' },
        Email: auth?.data?.Email,
      });
      if (response.status === 200) {
        console.log('Logged out successfully');
        setAuth(null);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;