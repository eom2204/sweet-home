import './SignUpBenefits.scss';
import {Box, Typography} from "@mui/material";
import Button from "../Button/Button";

function SignUpBenefits() {
    return (

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '328px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '48px',
                textAlign: 'left'
            }}>
                <Typography variant="subtitle1" sx={{marginBottom: "32px"}}>Benefits</Typography>
                <Box sx={{display: "flex", marginBottom: "45px", width: "100%"}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                            stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 6L12 13L2 6" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <Typography variant="subtitle1" sx={{marginLeft: "22px"}}>Підпишись на розсилку та отримай знижку на перше
                        замовлення</Typography>
                </Box>
                <Box sx={{display: 'flex', marginBottom: "45px", width: '100%'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                            stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.9999 20.9999L16.6499 16.6499" stroke="#222133" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.5 9.25L10.375 13.375L8.5 11.5" stroke="#222133" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <Typography variant="subtitle1" sx={{marginLeft: "22px"}}>Ease of tracking orders</Typography>
                </Box>
                <Box sx={{display: 'flex', marginBottom: "45px", width: '100%'}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4V10H7" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path
                            d="M3.51 14.9999C4.15839 16.8403 5.38734 18.4201 7.01166 19.5013C8.63598 20.5825 10.5677 21.1065 12.5157 20.9944C14.4637 20.8823 16.3226 20.1401 17.8121 18.8797C19.3017 17.6193 20.3413 15.9089 20.7742 14.0063C21.2072 12.1037 21.0101 10.1119 20.2126 8.33105C19.4152 6.55019 18.0605 5.07674 16.3528 4.13271C14.6451 3.18868 12.6769 2.82521 10.7447 3.09707C8.81245 3.36892 7.02091 4.26137 5.64 5.63995L1 9.99995"
                            stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 7V13L16 15" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                    <Typography variant="subtitle1" sx={{marginLeft: "22px"}}>Easy access to order history</Typography>
                </Box>
            </Box>
    );
}

export default SignUpBenefits;