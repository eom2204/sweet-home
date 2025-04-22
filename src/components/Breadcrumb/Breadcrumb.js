import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Breadcrumb.scss";
import { generateSlug } from "../../utils/generateSlus.js";

const Breadcrumb = () => {
  const location = useLocation();
  const { productSlug } = useParams();
  const goods = useSelector((state) => state.goods.goods);
  const categories = useSelector((state) => state.categories.categories);
  const pathnames = location.pathname.split("/").filter(Boolean);
  const product = productSlug
    ? goods.find((item) => generateSlug(item.name) === productSlug)
    : null;

  // Создаем маппинг slug -> name для категорий
  const slugToCategoryName = categories.reduce((map, cat) => {
    if (cat.name && typeof cat.name === "string") {
      const slug = cat.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      map[slug] = cat.name;
    }
    return map;
  }, {});

  // Форматирование текста
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

  // Определяем сегменты
  const isProductPage = !!productSlug && product;
  const breadcrumbSegments = [];

  if (pathnames[0] === "catalogue") {
    breadcrumbSegments.push({ value: "catalogue", to: "/catalogue" });
  }

  if (isProductPage && pathnames[1]) {
    const categorySlug = pathnames[1];
    if (slugToCategoryName[categorySlug]) {
      breadcrumbSegments.push({
        value: categorySlug,
        to: `/catalogue/${categorySlug}`,
      });
    }
    breadcrumbSegments.push({
      value: product.name,
      to: location.pathname,
      isLast: true,
    });
  }

  // Отладка
  console.log("Breadcrumb - Pathnames:", pathnames);
  console.log("Breadcrumb - isProductPage:", isProductPage);
  console.log("Breadcrumb - slugToCategoryName:", slugToCategoryName);
  console.log("Breadcrumb - productSlug:", productSlug);
  console.log("Breadcrumb - Product:", product);
  console.log("Breadcrumb - BreadcrumbSegments:", breadcrumbSegments);

  return (
    <nav>
      <ol className="breadcrumb">
        <li>
          <Link to="/">Home</Link>
          {breadcrumbSegments.length > 0 && " > "}
        </li>
        {breadcrumbSegments.map(({ value, to, isLast }, index) => {
          const displayText =
            slugToCategoryName[value] ||
            (isLast ? formatText(value) : formatText(value));

          return (
            <li key={`${to}-${index}`}>
              {isLast ? (
                <span>{displayText}</span>
              ) : (
                <Link to={to}>{displayText}</Link>
              )}
              {index + 1 < breadcrumbSegments.length && " > "}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
