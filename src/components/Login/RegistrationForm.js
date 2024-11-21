import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {register} from "../../services/authService";
import Button from "../Button/Button";
import {Box} from "@mui/material";

function RegistrationForm () {

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
        <Box>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input className="registration__input"
                       type="email"
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="E-mail"
                       required
                />
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {/*<input*/}
                {/*    type="text"*/}
                {/*    name="username"*/}
                {/*    value={username}*/}
                {/*    onChange={(e) => setUsername(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                <input className="registration__input"
                       type="password"
                       name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                       required
                />

                <Button type="submit" text="SIGN UP"></Button>
            </form>
        </Box>
    );
};

export default RegistrationForm;