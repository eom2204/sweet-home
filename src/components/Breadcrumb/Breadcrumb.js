import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { generateSlug } from "../../utils/generateSlus.js";
import "./Breadcrumb.scss";

const Breadcrumb = () => {
  const location = useLocation();
  const { productSlug } = useParams();
  const goods = useSelector((state) => state.goods.goods);
  const categories = useSelector((state) => state.categories.categories);
  const pathnames = location.pathname.split("/").filter(Boolean);
  const product = productSlug
    ? goods.find((item) => item.name && generateSlug(item.name) === productSlug)
    : null;

  const slugToCategoryName = categories.reduce((map, cat) => {
    if (cat.name && typeof cat.name === "string") {
      const slug = generateSlug(cat.name);
      if (slug) {
        map[slug] = cat.name;
      }
    }
    return map;
  }, {});

  const formatText = (text) => {
    try {
      const decoded = decodeURIComponent(text);
      return decoded
        .split(/[-& ]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } catch {
      return text
        .split(/[-& ]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  };

  const breadcrumbSegments = [];

  if (pathnames.length >= 1 && pathnames[0] === "catalogue") {
    breadcrumbSegments.push({
      text: "Catalogue",
      to: "/catalogue",
      isLast: pathnames.length === 1,
    });

    if (pathnames.length >= 2) {
      const categorySlugFromPath = pathnames[1];

      const categoryName =
        slugToCategoryName[categorySlugFromPath] ||
        formatText(categorySlugFromPath);

      breadcrumbSegments.push({
        text: categoryName,
        to: `/catalogue/${categorySlugFromPath}`,
        isLast: pathnames.length === 2 && !product,
      });

      if (pathnames.length >= 3 && product) {
        breadcrumbSegments.push({
          text: product.name,
          to: location.pathname,
          isLast: true,
        });
      }
    }
  } else {
    pathnames.forEach((segment, index) => {
      breadcrumbSegments.push({
        text: formatText(segment),
        to: '/' + pathnames.slice(0, index + 1).join('/'),
        isLast: index === pathnames.length - 1,
      });
    });
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
          {breadcrumbSegments.length > 0 && " > "}
        </li>

        {breadcrumbSegments.map(({ text, to, isLast }, index) => (
          <li key={`${to}-${index}`}>
            {isLast ? <span>{text}</span> : <Link to={to}>{text}</Link>}
            {index < breadcrumbSegments.length - 1 && " > "}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
