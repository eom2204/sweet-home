import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {register} from "../services/authService";
import Button from "./Button/Button";

const RegistrationForm = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('user');  // Assuming 'user' is the default role
    const [error, setError] = useState('');

    const navigate = useNavigate();  // To redirect the user after successful registration

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the register function to send the registration request
            const response = await register(email, username, password);

            // If successful, redirect the user to the homepage or profile page
            navigate('/profile');
        } catch (err) {
            console.error('Registration failed:', err);
            setError('Registration failed. Please try again.');
        }
    };


    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" text="Register"></Button>
            </form>
        </div>
    );
};

export default RegistrationForm;