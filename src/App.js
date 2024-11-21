import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root";
import {createTheme} from "@mui/system";
import {ThemeProvider} from "@mui/styles";

import AdminDashboard from './pages/AdminDashboard'; // Admin page
import ProfilePage from './pages/ProfilePage'; // User profile page
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ProfileLayout from "./components/ProfileLayout";
import FavouritesPage from "./pages/FavouritesPage";
import CartPage from "./pages/CartPage";
import {childrenRoutes} from "./components/MainRoute";

import './App.scss';


function App() {

    const theme = createTheme({
        typography: {
            fontFamily: 'Inter, sans-serif',
            h1: {
                fontFamily: 'Inter, sans-serif',
            },
            h2: {
                fontFamily: 'Inter, sans-serif',
            },
            h3: {
                fontFamily: 'Inter, sans-serif',
            },
            h4: {
                fontFamily: 'Inter, sans-serif',
            },
        },
    });


    const router = createBrowserRouter([
            {
                path: '/',
                element: <Root/>,
                errorElement: <ErrorPage/>,
                children: childrenRoutes,
            },
            // Protected Routes for Logged-In Users
            {
                path: '/profile',
                element: (
                    <ProtectedRoute>
                        <ProfileLayout/>
                    </ProtectedRoute>

                ),
                children: [
                    {path: '', element: <ProfilePage/>}, // Default profile page
                    {path: 'favourites', element: <FavouritesPage/>}, // Favourites route
                    {path: 'cart', element: <CartPage/>}, // Cart route
                ]
            },

            // // Admin Routes
            // {
            //     path: '/admin',
            //     element: (
            //         <AdminRoute>
            //             <AdminDashboard/>
            //         </AdminRoute>
            //     ),
            // },
        ],
    )

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>

    );
}

export default App;
