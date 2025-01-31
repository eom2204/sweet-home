import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {register} from "../../../services/authService";
import Button from "../../Button/Button";
import {Box} from "@mui/material";
import './RegistrationForm.scss';

function RegistrationForm() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();  // To redirect the user after successful registration

    const username = `${name} ${surname}`.trim();

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
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input className="registration__input"
                       type="email"
                       name="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="E-mail"
                       required
                />
                <div className="registration__input-div">
                    <input className="registration__input registration__input-div--name"
                           type="text"
                           name="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Name"
                           required
                    />
                    <input className="registration__input registration__input-div--surname"
                           type="text"
                           name="surname"
                           value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                           placeholder="Surname"
                           required
                    />
                </div>
                <input className="registration__input"
                       type="password"
                       name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Password"
                       required
                />

                <div className="registration__checkbox">
                    <label className="registration__checkbox--item" htmlFor="firstDiscount">
                        <input className="registration__checkbox--input" type="checkbox" id="firstDiscount" name="firstDiscount"/>
                        <span className="registration__checkbox--checkmark"></span>
                        <p className="registration__checkbox--text">
                            Yes, I want to receive a 15% discount code for my first order and stay up to date with all the
                        best deals.
                        </p>
                    </label>
                    <label className="registration__checkbox--item" htmlFor="userAgreement">
                        <input className="registration__checkbox--input" type="checkbox" id="userAgreement" name="userAgreement" required/>
                        <span className="registration__checkbox--checkmark"></span>
                        <p className="registration__checkbox--text">
                            I have read and agree to the Privacy Policy.
                        </p>
                    </label>
                </div>

                <Button type="submit" text="SIGN UP"></Button>
            </form>
        </Box>
    );
};

export default RegistrationForm;