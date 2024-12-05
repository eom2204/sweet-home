import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Remove the token from cookies
        navigate('/login');  // Redirect to the login page
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;