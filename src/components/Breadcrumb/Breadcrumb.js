import { Link, useLocation, useParams } from "react-router-dom";
import "./Breadcrumb.scss";


const Breadcrumb = () => {
  const location = useLocation(); // Get the current URL path
  const { categorySlug } = useParams(); // Get dynamic params like categorySlug

  const pathnames = location.pathname.split("/").filter((x) => x); // Break the path into segments

  return (
    <nav>
      <ol className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
          {pathnames.length > 0 && " > "}
        </li>
        {pathnames.map((value, index) => {
          // Create the link for each part of the path
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index + 1 === pathnames.length;

          return (
            <li key={to}>
              {isLast && categorySlug ? (
                <span>{categorySlug}</span> // Active category slug
              ) : (
                <Link to={to}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}{" "}
                  {/* Capitalize */}
                </Link>
              )}
              {!isLast && " > "}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
