import {NavLink, Outlet} from 'react-router-dom';
import {logout} from '../../services/authService';
import {Box, List, ListItem, ListItemText} from '@mui/material';
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import WrapperSection from "../WrapperSection/WrapperSection";
import "./ProfileLayout.scss";


const ProfileLayout = () => {

    const handleDeleteAccount = () => {
        // Logic for deleting the account
        console.log('Delete account action');
    };

    const handleLogout = () => {
        logout();
    };


    return (
        <WrapperSection>
            <Breadcrumb></Breadcrumb>
            <Box sx={{display: 'flex'}}>
                {/* Sidebar */}
                <Box
                    sx={{
                        maxWidth: 240,
                        flexShrink: 0,
                    }}
                >
                    <List>
                        <ListItem button component={NavLink} to="/profile/cart" activeClassName="Mui-selected"
                                  className="profile_menu-item">
                            <ListItemText primary="My Orders"/>
                        </ListItem>
                        <ListItem button component={NavLink} to="/profile" activeClassName="Mui-selected"
                                  className="profile_menu-item">
                            <ListItemText primary="My Contacts"/>
                        </ListItem>
                        <ListItem button component={NavLink} to="/profile/favorites"
                                  activeClassName="Mui-selected" className="profile_menu-item">
                            <ListItemText primary="Wish List"/>
                        </ListItem>
                        <ListItem button onClick={handleDeleteAccount} className="profile_menu-item">
                            <ListItemText primary="Delete My Account"/>
                        </ListItem>
                        <ListItem button onClick={handleLogout} className="profile_menu-item">
                            <ListItemText primary="Exit"/>
                        </ListItem>
                    </List>
                </Box>

                {/* Main Content */}
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Outlet/>
                </Box>
            </Box>
        </WrapperSection>

    );
};

export default ProfileLayout;