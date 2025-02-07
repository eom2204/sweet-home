import {Navigate} from 'react-router-dom';
import {AccessKey} from "../utils/AccessKey";
import {useEffect, useState} from "react";
import {getProtectedData} from "../services/protectedService";

const ProtectedRoute = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); //'null'means loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            try {
                await getProtectedData(); // Call the API to validate the token
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false); // If token is invalid, mark as not authenticated
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, []);

    if (loading) {
        // Show a loading spinner or placeholder while checking authentication
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;