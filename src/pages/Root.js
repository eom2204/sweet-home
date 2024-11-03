import {Outlet} from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Wrapper from "../components/Wrapper/Wrapper";


function Root() {

    return (
        <>
            <Header/>
            <Wrapper>
                <Outlet/>
            </Wrapper>
            <Footer/>
        </>
    )
}

export default Root;