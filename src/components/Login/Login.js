// login logic and store the token in Cookies

import {useState} from 'react';
import Button from '../Button/Button';
import {Box, Typography} from "@mui/material";
import SignUpBenefits from "../SignUpBenefits/SignUpBenefits";
import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";


function Login() {

    // State to track which form is currently visible
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

    // Functions to show each form
    const showLoginForm = () => setIsLoginFormVisible(true);
    const showRegistrationForm = () => setIsLoginFormVisible(false);


    return (
        <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row', md: 'row'}, marginTop: "168px"}}>
            <Box sx={{
                width: {xs: '100%', sm: '100%', md: '50%'},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid black',
            }}>
                <Box sx={{maxWidth: '416px', width: '100%', textAlign: 'center'}}>
                    <Typography variant="h5" sx={{marginBottom: "32px"}}>Already have an account?</Typography>

                    {isLoginFormVisible ?
                        (<LoginForm/>) :
                        (<Button type="button" text="LOG IN" onClick={showLoginForm}></Button>)
                    }

                    <Box>
                        <Typography sx={{marginTop: "32px", marginBottom: "18px"}}>or continue with</Typography>
                        <Box sx={{display: "flex", gap: "16px", justifyContent: "center"}}>
                            <a href="">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black"/>
                                    <g clipPath="url(#clip0_149_2734)">
                                        <path
                                            d="M21.5737 16.5261C19.9751 17.0807 18.5964 18.1333 17.6402 19.5294C16.684 20.9254 16.2007 22.5913 16.2613 24.2823C16.3219 25.9734 16.9231 27.6004 17.9767 28.9245C19.0303 30.2485 20.4808 31.1998 22.115 31.6386C23.4399 31.9805 24.828 31.9955 26.16 31.6824C27.3666 31.4113 28.4822 30.8316 29.3975 29.9999C30.3501 29.1078 31.0415 27.973 31.3975 26.7174C31.7844 25.352 31.8532 23.916 31.5987 22.5199H24.1587V25.6061H28.4675C28.3814 26.0984 28.1968 26.5682 27.9249 26.9874C27.653 27.4067 27.2993 27.7668 26.885 28.0461C26.3588 28.3942 25.7657 28.6283 25.1437 28.7336C24.5199 28.8496 23.8801 28.8496 23.2562 28.7336C22.624 28.6029 22.0259 28.3419 21.5 27.9674C20.6552 27.3694 20.0208 26.5198 19.6875 25.5399C19.3485 24.5416 19.3485 23.4594 19.6875 22.4611C19.9248 21.7614 20.317 21.1243 20.835 20.5974C21.4277 19.9833 22.1782 19.5444 23.0039 19.3287C23.8297 19.1131 24.6989 19.129 25.5162 19.3749C26.1547 19.5709 26.7386 19.9133 27.2212 20.3749C27.7071 19.8915 28.1921 19.407 28.6762 18.9211C28.9262 18.6599 29.1987 18.4111 29.445 18.1436C28.7082 17.458 27.8433 16.9244 26.9 16.5736C25.1821 15.9499 23.3025 15.9331 21.5737 16.5261Z"
                                            fill="#222133"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_149_2734">
                                            <rect width="16" height="16" fill="white" transform="translate(16 16)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                            <a href="">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="black"/>
                                    <g clipPath="url(#clip0_149_2735)">
                                        <path
                                            d="M27.7231 25L28.1676 22.1045H25.3891V20.2255C25.3891 19.4335 25.7771 18.661 27.0216 18.661H28.2846V16.196C28.2846 16.196 27.1386 16.0005 26.0426 16.0005C23.7546 16.0005 22.2591 17.3875 22.2591 19.898V22.105H19.7156V25.0005H22.2591V32.0005H25.3891V25.0005L27.7231 25Z"
                                            fill="#222133"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_149_2735">
                                            <rect width="16" height="16" fill="white" transform="translate(16 16)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </Box>
                    </Box>
                </Box>
            </Box>


            <Box sx={{width: {xs: '100%', sm: '100%', md: '50%'}, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                <Box sx={{maxWidth: '416px', width: '100%', textAlign: 'center'}}>
                    <Typography variant="h5" sx={{marginBottom: "48px"}}>Is this your first visit?</Typography>

                    {isLoginFormVisible ?
                        (<>
                            <Button type="button" text="SIGN UP" onClick={showRegistrationForm}></Button>
                            <SignUpBenefits/>
                        </>) :
                        (<RegistrationForm/>)
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default Login;