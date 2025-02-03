import { logout } from '../services/authService';

const LogoutButton = () => {

    const handleLogout = () => {
        logout();  // Remove the token from cookies
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;