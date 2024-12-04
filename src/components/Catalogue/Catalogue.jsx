import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../app/redux/slices/categoriesSlice";
import { fetchGoods } from "../../app/redux/slices/productsSlice";
import "./catalogue.scss";
import Card from "../Card/Card";

function Catalogue() {
  const dispatch = useDispatch();

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

  return (
    <section className="container">
      <aside className="aside-list">
        <Breadcrumb />
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="list-element">
              {category.name}
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
          {goods.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
}

export default Catalogue;
