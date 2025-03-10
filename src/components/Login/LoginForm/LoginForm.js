import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../../services/authService";
import {initializeFavorites} from "../../../app/redux/slices/favoritesSlice";
import Button from "../../Button/Button";
import {Box} from "@mui/material";
import './LoginForm.scss';


function LoginForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Call login function from service
            dispatch(initializeFavorites());
            navigate('/profile'); // Redirect to profile page on success
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };


    return (
        <Box>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={handleLogin}>
                <input className="login__input"
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="E-mail"
                       required
                />
                <input className="login__input"
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                       required
                />

                <div className="login__forgot">
                    <a href="">Forgot my password</a>
                </div>

                <Button type="submit" text="LOG IN"></Button>
            </form>
        </Box>
    );
}

export default LoginForm;

