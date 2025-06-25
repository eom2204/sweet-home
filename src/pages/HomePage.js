import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import AboutUsImages from "../components/AboutUsImages/AboutUsImages";
import Popular from "../components/Popular/Popular";
import CategoriesHome from "../components/CategoriesHome/CategoriesHome";

// const ContentWrapper = styled('div')(({ theme }) => ({
//     marginX: '5.25rem',
//
//     // Responsive breakpoints using MUI theme
//     [theme.breakpoints.down('md')]: {
//         marginX: '2rem',
//     },
//     [theme.breakpoints.down('sm')]: {
//         marginX: '10px',
//     },
// }));

function HomePage() {
    return (
        <>
            <Banner/>
            {/*<ContentWrapper>*/}
            <CategoriesHome/>
            <NewArrivals/>
            <AboutUsImages/>
            <Popular/>
            <Brands/>
            <Bestsellers/>
            {/*</ContentWrapper>*/}
        </>
    );
}

export default HomePage;
