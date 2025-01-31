import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@mui/styles";

import AdminDashboard from "./pages/AdminDashboard"; // Admin page
import ProfilePage from "./pages/ProfilePage"; // User profile page
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ProfileLayout from "./components/ProfileLayout";
import FavouritesPage from "./pages/FavoritesPage/FavouritesPage";
import FavoritesHandler from "./components/FavoritesHandler";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import { childrenRoutes } from "./components/MainRoute";

import "./App.scss";


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Inter, sans-serif",
      h1: {
        fontFamily: "Inter, sans-serif",
      },
      h2: {
        fontFamily: "Inter, sans-serif",
      },
      h3: {
        fontFamily: "Inter, sans-serif",
      },
      h4: {
        fontFamily: "Inter, sans-serif",
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: childrenRoutes,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ProfileLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <ProfilePage /> },
        { path: "favourites", element: <FavouritesPage /> },
        { path: "cart", element: <CartPage /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <FavoritesHandler/>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
