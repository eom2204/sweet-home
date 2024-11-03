import './Breadcrumb.scss';

import { Link, useLocation, useParams } from 'react-router-dom';


const Breadcrumb = () => {
    const location = useLocation();  // Get the current URL path
    const { categorySlug } = useParams();  // Get dynamic params like categorySlug

    const pathnames = location.pathname.split('/').filter(x => x);  // Break the path into segments

    return (
        <nav>
            <ol className="breadcrumb">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    // Create the link for each part of the path
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return (
                        <li key={to}>
                            {index + 1 === pathnames.length && categorySlug ? (
                                <span>{categorySlug}</span>  // Active category slug
                            ) : (
                                <Link to={to}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)} {/* Capitalize */}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;