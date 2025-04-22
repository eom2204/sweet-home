import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { fetchGoods } from "../../app/redux/slices/productsSlice";
import "./catalogue.scss";
import Card from "../Card/Card.js";
import CustomPagination from "../CustomPagination.js";
import Categories from "../Categories/Categories.js";
import { fetchCategories } from "../../app/redux/slices/categoriesSlice.js";
import { generateSlug } from "../../utils/generateSlus.js";

function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    goods,
    status: goodsStatus,
    error: goodsError,
  } = useSelector((state) => state.goods);

  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const categorySlugToId = useMemo(() => {
    console.log("Raw Categories:", categories);
    const map = categories.reduce((map, cat) => {
      if (cat.name && typeof cat.name === "string") {
        const slug = generateSlug(cat.name);
        if (slug) {
          map[slug] = cat.id;
          const encodedSlug = cat.name.replace(/\s+/g, "%20");
          map[encodedSlug] = cat.id;
        }
      } else {
        console.warn("Category missing name:", cat);
      }
      return map;
    }, {});
    console.log("categorySlugToId:", map);
    return map;
  }, [categories]);

  const categoryIdToSlug = useMemo(() => {
    const map = categories.reduce((map, cat) => {
      if (cat.id && cat.name && typeof cat.name === "string") {
        const slug = generateSlug(cat.name);
        if (slug) {
          map[cat.id] = slug;
        }
      } else {
        console.warn("Category missing id or name:", cat);
      }
      return map;
    }, {});
    console.log("categoryIdToSlug:", map);
    return map;
  }, [categories]);

  useEffect(() => {
    if (goodsStatus === "idle") {
      dispatch(fetchGoods());
    }
  }, [goodsStatus, dispatch]);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  // Установка selectedCategory после успешной загрузки категорий
  useEffect(() => {
    console.log("categorySlug:", categorySlug);
    if (categoriesStatus === "succeeded" && categorySlug) {
      const normalizedSlug = decodeURIComponent(categorySlug); // Декодируем %20
      const id =
        categorySlugToId[normalizedSlug] ||
        categorySlugToId[generateSlug(normalizedSlug)];
      console.log("Setting selectedCategory to:", id);
      setSelectedCategory(id || null);
      // Перенаправляем на правильный slug, если используется некорректный формат
      if (id && normalizedSlug !== categoryIdToSlug[id]) {
        console.log("Redirecting to correct slug:", categoryIdToSlug[id]);
        navigate(`/catalogue/${categoryIdToSlug[id]}`, { replace: true });
      }
    } else if (!categorySlug) {
      setSelectedCategory(null);
    }
  }, [
    categorySlug,
    categorySlugToId,
    categoryIdToSlug,
    categoriesStatus,
    navigate,
  ]);

  // Навигация при изменении selectedCategory
  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
    if (selectedCategory) {
      const slug = categoryIdToSlug[selectedCategory];
      console.log("Slug:", slug);
      if (slug && location.pathname !== `/catalogue/${slug}`) {
        console.log("Navigating to /catalogue/", slug);
        navigate(`/catalogue/${slug}`);
      }
    } else if (!categorySlug && location.pathname !== "/catalogue") {
      console.log("Navigating to /catalogue");
      navigate("/catalogue");
    }
  }, [selectedCategory, categoryIdToSlug, location, navigate, categorySlug]);

  // Обработка состояний загрузки и ошибок
  if (categoriesStatus === "loading") return <div>Загрузка категорий...</div>;
  if (categoriesStatus === "failed")
    return <div>Ошибка загрузки категорий: {categoriesError}</div>;
  if (goodsStatus === "loading") return <div>Загрузка товаров...</div>;
  if (goodsStatus === "failed")
    return <div>Ошибка загрузки товаров: {goodsError}</div>;

  // Обработка несуществующей категории
  if (categorySlug && !selectedCategory && categoriesStatus === "succeeded") {
    return <div>Категория не найдена</div>;
  }

  const filteredGoods = selectedGroup
    ? goods.filter((product) => product.groupId === selectedGroup)
    : selectedCategory
    ? goods.filter((product) => {
        console.log(
          "product.categoryId:",
          typeof product.categoryId,
          product.categoryId
        );
        console.log(
          "selectedCategory:",
          typeof selectedCategory,
          selectedCategory
        );
        return product.categoryId === selectedCategory;
      })
    : goods;

  console.log("Filtered goods length:", filteredGoods.length);

  const itemsPerPage = 24;
  const totalItems = filteredGoods.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = filteredGoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <section className="container">
      <aside className="aside-list">
        <Breadcrumb />
        <Categories
          displayMode="list"
          setSelectedCategory={setSelectedCategory}
          setSelectedGroup={setSelectedGroup}
        />
      </aside>
      <section className="main-section">
        <div className="select-section">
          <select name="sort" id="sort" className="select">
            <option value="sort">Sort by</option>
            <option value="value2">value2</option>
            <option value="value3">value3</option>
          </select>
          <select name="price" id="price" className="select">
            <option value="price">Price</option>
            <option value="maximum">max</option>
            <option value="minimum">min</option>
          </select>
          <select name="colors" id="colors" className="select">
            <option value="colors">Colors</option>
            <option value="red">red</option>
            <option value="black">black</option>
          </select>
        </div>
        <div className="cards-section">
          {currentItems.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <section className="pagination-section">
          {totalPages > 1 && (
            <CustomPagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          )}
        </section>
      </section>
    </section>
  );
}

export default Catalogue;
