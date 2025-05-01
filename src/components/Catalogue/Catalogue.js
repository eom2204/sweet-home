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
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceValue, setPriceValue] = useState(null);
  const [addingValue, setAddingValue] = useState(null);

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
    const map = categories.reduce((map, cat) => {
      if (cat.name && typeof cat.name === "string") {
        const slug = generateSlug(cat.name);
        if (slug) {
          map[slug] = cat.id;
          const encodedSlug = cat.name.replace(/\s+/g, "%20");
          map[encodedSlug] = cat.id;
        }
      }
      return map;
    }, {});
    return map;
  }, [categories]);

  const categoryIdToSlug = useMemo(() => {
    const map = categories.reduce((map, cat) => {
      if (cat.id && cat.name && typeof cat.name === "string") {
        const slug = generateSlug(cat.name);
        if (slug) {
          map[cat.id] = slug;
        }
      }
      return map;
    }, {});
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

  useEffect(() => {
    if (categoriesStatus === "succeeded" && categorySlug) {
      const normalizedSlug = decodeURIComponent(categorySlug);
      const id =
        categorySlugToId[normalizedSlug] ||
        categorySlugToId[generateSlug(normalizedSlug)];
      setSelectedCategory(id || null);
      if (id && normalizedSlug !== categoryIdToSlug[id]) {
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

  useEffect(() => {
    if (selectedCategory) {
      const slug = categoryIdToSlug[selectedCategory];
      if (slug && location.pathname !== `/catalogue/${slug}`) {
        navigate(`/catalogue/${slug}`);
      }
    } else if (!categorySlug && location.pathname !== "/catalogue") {
      navigate("/catalogue");
    }
  }, [selectedCategory, categoryIdToSlug, location, navigate, categorySlug]);

  if (categoriesStatus === "loading") return <div>Загрузка категорий...</div>;
  if (categoriesStatus === "failed")
    return <div>Ошибка загрузки категорий: {categoriesError}</div>;
  if (goodsStatus === "loading") return <div>Загрузка товаров...</div>;
  if (goodsStatus === "failed")
    return <div>Ошибка загрузки товаров: {goodsError}</div>;

  if (categorySlug && !selectedCategory && categoriesStatus === "succeeded") {
    return <div>Категория не найдена</div>;
  }

  // Фильтрация товаров по категории или группе
  let filteredGoods = selectedGroup
    ? goods.filter((product) => product.groupId === selectedGroup)
    : selectedCategory
    ? goods.filter((product) => product.categoryId === selectedCategory)
    : goods;

  // Сортировка
  filteredGoods = [...filteredGoods].sort((a, b) => {
    // Сортировка по цене
    if (priceValue === "lowest") {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
    } else if (priceValue === "higest") {
      if (a.price > b.price) return -1;
      if (a.price < b.price) return 1;
    }

    // Сортировка по дате
    if (addingValue === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (addingValue === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    return 0;
  });

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

  const handlePriceValueChange = (event) => {
    setPriceValue(event.target.value);
    setCurrentPage(1);
  };

  const handleAddingValueChange = (event) => {
    setAddingValue(event.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="container">
      <aside className="aside-list">
        <Breadcrumb />
        <Categories
          displayMode="list"
          setSelectedCategory={setSelectedCategory}
          setSelectedGroup={setSelectedGroup}
          selectedCategory={selectedCategory}
        />
      </aside>
      <section className="main-section">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="price-select-label">Price</InputLabel>
          <Select
            labelId="price-select-label"
            value={priceValue}
            onChange={handlePriceValueChange}
            sx={{
              "&::before": {
                borderBottom: "none",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "&::after": {
                borderBottom: "none",
              },
            }}
          >
            <MenuItem value={"higest"}>Highest</MenuItem>
            <MenuItem value={"lowest"}>Lowest</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="adding-select-label">Addings</InputLabel>
          <Select
            labelId="adding-select-label"
            value={addingValue}
            onChange={handleAddingValueChange}
            sx={{
              "&::before": {
                borderBottom: "none",
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: "none",
              },
              "&::after": {
                borderBottom: "none",
              },
            }}
          >
            <MenuItem value={"newest"}>Newest</MenuItem>
            <MenuItem value={"oldest"}>Oldest</MenuItem>
          </Select>
        </FormControl>

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
