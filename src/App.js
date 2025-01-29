import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root";
import {createTheme} from "@mui/system";
import {ThemeProvider} from "@mui/styles";

import FavoritesHandler from "./components/FavoritesHandler";
import ProfilePage from './pages/ProfilePage'; // User profile page
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from "./pages/CartPage";
import {childrenRoutes} from "./components/MainRoute";

import './App.scss';
import ProfileLayout from "./components/ProfileLayout";
import FavouritesPage from "./pages/FavouritesPage";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeFavorites} from "./app/redux/slices/favoritesSlice";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Initialize favorites after user login
        dispatch(initializeFavorites());
    }, [dispatch]);


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
                    {path: 'favorites', element: <FavouritesPage/>},// Favourites route
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
            <FavoritesHandler/>
            <RouterProvider router={router}/>
        </ThemeProvider>

    );
}

export default App;
