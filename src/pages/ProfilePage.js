import LogoutButton from "../components/LogoutButton";
import { useEffect, useState } from 'react';
import { getProtectedData } from '../services/protectedService';
// retrieve the user’s protected data,
// such as profile details or order history, using the token.

const ProfilePage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await getProtectedData();  // Make the API call to get protected data
                setProfileData(data);
            } catch (err) {
                console.error('Failed to load profile:', err);
                setError('Failed to load profile data');
            }
        };

        fetchProfileData(); // Fetch data when the component is mounted
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {profileData ? (
                <div>
                    <p>Email: {profileData.email}</p>
                    <p>Username: {profileData.username}</p>
                    <p>Role: {profileData.role}</p>
                    <LogoutButton />
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;
