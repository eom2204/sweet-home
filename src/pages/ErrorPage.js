import {Link} from "react-router-dom";

function ErrorPage() {

    return (
        <>
            <h1>Error Page</h1>
            <h2>Page not found</h2>
            <p>Please go to <Link to={'/'}>Home Page</Link></p>
        </>
    )
}

export default ErrorPage;