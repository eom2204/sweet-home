import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const { id } = useParams();
  const goods = useSelector((state) => state.goods.goods);
  const pathnames = location.pathname.split("/").filter(Boolean);
  const product = goods.find((item) => item.id === Number(id));

  const formatText = (text) => {
    try {
      const decoded = decodeURIComponent(text);
      return decoded.charAt(0).toUpperCase() + decoded.slice(1);
    } catch {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  };

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
          const displayText = formatText(value);

          return (
            <li key={`${to}-${index}`}>
              {isLast ? (
                <span>{product ? formatText(product.name) : displayText}</span>
              ) : (
                <Link to={to}>{displayText}</Link>
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
