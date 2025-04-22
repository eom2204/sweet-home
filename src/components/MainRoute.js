import HomePage from "../pages/HomePage";
import CataloguePage from "../pages/CataloguePage";
import AboutUsPage from "../pages/AboutUsPage";
import DeliveryPage from "../pages/DeliveryPage";
import LoginPage from "../pages/LoginPage";
// import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";
import NotFound from "../pages/NotFound";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfileLayout from "./ProfileLayout/ProfileLayout";
import ProfilePage from "../pages/ProfilePage";
import FavouritesPage from "../pages/FavoritesPage/FavouritesPage";

// Array of children routes
export const childrenRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
  { path: "/", element: <HomePage /> },
  { path: "/catalogue/:categorySlug", element: <CataloguePage /> },
  { path: "/catalogue", element: <CataloguePage /> },
  { path: "/aboutUs", element: <AboutUsPage /> },
  { path: "/delivery", element: <DeliveryPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/catalogue/:categorySlug/:productSlug", element: <ProductPage /> },
  {
    path: "/error",
    element: <ErrorPage />,
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
      { path: "favorites", element: <FavouritesPage /> },
    ],
  },
];
