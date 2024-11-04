import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import AboutUs from "../components/AboutUs/AboutUs";
import Popular from "../components/Popular/Popular";
import Categories from "../components/Categories/Categories";


function HomePage() {

    return (
        <>
            <Banner/>
            <div style={{marginLeft: '5.25rem', marginRight: '5.25rem'}}>
                <Categories/>
                <NewArrivals/>
                <Popular/>
                <Brands/>
                <Bestsellers/>
                <AboutUs/>
            </div>

        </>
    )
}

export default HomePage;