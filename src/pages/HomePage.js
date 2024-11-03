import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import AboutUs from "../components/AboutUs/AboutUs";
import Popular from "../components/Popular/Popular";


function HomePage() {

    return (
        <>
            <Banner/>
            <NewArrivals/>
            <Popular/>
            <Brands/>
            <Bestsellers/>
            <AboutUs/>
        </>
    )
}

export default HomePage;