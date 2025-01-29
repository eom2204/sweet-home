import HomePage from '../pages/HomePage';
import CataloguePage from '../pages/CataloguePage';
import AboutUsPage from '../pages/AboutUsPage';
import DeliveryPage from '../pages/DeliveryPage';
import LoginPage from '../pages/LoginPage';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage';


// Array of children routes
export const childrenRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/catalogue', element: <CataloguePage /> },
    { path: '/aboutUs', element: <AboutUsPage /> },
    { path: '/delivery', element: <DeliveryPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/:categorySlug', element: <CategoryPage /> },
    { path: '/:categorySlug/:productName', element: <ProductPage /> },
];
