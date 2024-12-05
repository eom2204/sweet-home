import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../app/redux/slices/categoriesSlice";
import { fetchGoods } from "../../app/redux/slices/productsSlice";
import "./catalogue.scss";
import Card from "../Card/Card.js";
import CustomPagination from "../CustomPagination.js";

function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedGroup(null);
    setCurrentPage(1);
  };

  const handleGroupClick = (groupId) => {
    setSelectedGroup(groupId);
    setCurrentPage(1);
  };

  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const {
    goods,
    status: goodsStatus,
    error: goodsError,
  } = useSelector((state) => state.goods);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
    if (goodsStatus === "idle") {
      dispatch(fetchGoods());
    }
  }, [categoriesStatus, goodsStatus, dispatch]);

  if (categoriesStatus === "loading" || goodsStatus === "loading")
    return <div>Loading...</div>;
  if (categoriesStatus === "failed") return <div>Error: {categoriesError}</div>;
  if (goodsStatus === "failed") return <div>Error: {goodsError}</div>;

  const filteredGoods = selectedGroup
    ? goods.filter((product) => product.groupId === selectedGroup)
    : selectedCategory
    ? goods.filter((product) => product.categoryId === selectedCategory)
    : goods;

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
        <ul>
          {categories
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((category) => (
              <li key={category.id}>
                <div
                  className={`list-element ${
                    selectedCategory === category.id ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </div>
                {selectedCategory === category.id && category.groups && (
                  <ul className="group-list">
                    {category.groups.map((group) => (
                      <li
                        key={group.id}
                        className={`group-list-element ${
                          selectedGroup === group.id ? "active" : ""
                        }`}
                        onClick={() => handleGroupClick(group.id)}
                      >
                        {group.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
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
      </section>
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
  );
}

export default Catalogue;
