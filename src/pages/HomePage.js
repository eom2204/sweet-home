import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import AboutUs from "../components/AboutUs/AboutUs";
import Popular from "../components/Popular/Popular";
import Categories from "../components/Categories/Categories";
import {styled} from "@mui/system";


const ContentWrapper = styled('div')(({ theme }) => ({
    marginLeft: '5.25rem',
    marginRight: '5.25rem',

    // Responsive breakpoints using MUI theme
    [theme.breakpoints.down('md')]: {
        marginLeft: '2rem',
        marginRight: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        marginRight: '10px',
    },
}));

function HomePage() {

    return (
        <>
            <Banner/>
            <ContentWrapper>
                <Categories/>
                <NewArrivals/>
                <Popular/>
                <Brands/>
                <Bestsellers/>
                <AboutUs/>
            </ContentWrapper>

        </>
    )
}

export default HomePage;