import { styled } from "@mui/system";
import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Bestsellers from "../components/Bestsellers/Bestsellers";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import AboutUs from "../components/AboutUs/AboutUs";
import Popular from "../components/Popular/Popular";
import Categories from "../components/Categories/Categories";

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
      <Banner />
      {/*<ContentWrapper>*/}
      <Categories />
      <NewArrivals />
      <AboutUs />
      <Popular />
      <Brands />
      <Bestsellers />
      {/*</ContentWrapper>*/}
    </>
  );
}

export default HomePage;
