import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import {Box, Drawer, List, ListItem, ListItemText} from '@mui/material';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Wrapper from "./Wrapper/Wrapper";

const ProfileLayout = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        // Logic for deleting the account
        console.log('Delete account action');
    };

    const handleLogout = () => {
        // Logic for logging out
        console.log('Logout action');
        // For example, clear the token from Redux and navigate to the login page
        navigate('/login');
    };

    return (
        <>
            <Header/>
            <Wrapper>
                <Box sx={{display: 'flex'}}>
                    {/* Sidebar */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {width: 240, boxSizing: 'border-box'},
                        }}
                    >
                        <List>
                            <ListItem button component={NavLink} to="/profile/cart" activeClassName="Mui-selected">
                                <ListItemText primary="My Orders"/>
                            </ListItem>
                            <ListItem button component={NavLink} to="/profile" activeClassName="Mui-selected">
                                <ListItemText primary="My Contacts"/>
                            </ListItem>
                            <ListItem button component={NavLink} to="/profile/favourites"
                                      activeClassName="Mui-selected">
                                <ListItemText primary="Wish List"/>
                            </ListItem>
                            <ListItem button onClick={handleDeleteAccount}>
                                <ListItemText primary="Delete My Account"/>
                            </ListItem>
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary="Exit"/>
                            </ListItem>
                        </List>
                    </Drawer>

                    {/* Main Content */}
                    <Box component="main" sx={{flexGrow: 1, p: 3}}>
                        {/* This will render the nested routes like /profile/cart, /profile/favourites */}
                        <h2>Profile Section</h2>
                        <Outlet/>
                    </Box>
                </Box>
            </Wrapper>
            <Footer/>
        </>
    );
};

export default ProfileLayout;