import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation(); // Get the current URL path
  const { id } = useParams(); // Get the product id from URL params

  const goods = useSelector((state) => state.goods.goods); // Access the goods list from Redux store

  const pathnames = location.pathname.split("/").filter((x) => x); // Break the path into segments

  const product = goods.find((item) => item.id === Number(id));

  return (
    <nav>
      <ol className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
          {pathnames.length > 0 && " > "}
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index + 1 === pathnames.length;

          return (
            <li key={to}>
              {isLast && product ? (
                <span>{product.name}</span>
              ) : (
                <Link to={to}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}{" "}
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
