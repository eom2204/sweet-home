import Login from "../components/Login/Login";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import WrapperSection from "../components/WrapperSection/WrapperSection";

function LoginPage() {

    return (
        <>
            <WrapperSection>
                <Breadcrumb />
                <Login/>
            </WrapperSection>
        </>
    )
}

export default LoginPage;