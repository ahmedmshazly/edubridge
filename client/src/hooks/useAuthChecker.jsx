// hooks/useAuthChecker.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuthChecker = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.expiresAt) {
                const now = new Date().getTime();
                if (now >= user.expiresAt) {
                    localStorage.removeItem('user'); // Clear stored user data
                    navigate('/login'); // Redirect to login page
                }
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [navigate]);
};

export default useAuthChecker;
