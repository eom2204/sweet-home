import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteGoods from "../FavoriteGoods/FavoriteGoods";
import CartGoods from "../CartGoods/CartGoods";
import "./Card.scss";
import { generateSlug } from "../../utils/generateSlus.js";

const Card = ({ product }) => {
  const { id, name, price, images, group, discount, category } = product;

  const navigate = useNavigate();
  const imagePath = process.env.REACT_APP_IMAGE_PATH;

  const categorySlug = category ? generateSlug(category) : "unknown";
  const productSlug = name ? generateSlug(name) : "unknown";

  // Отладка
  console.log("Card - Product data:", { id, name, category });
  console.log("Card - Category Slug:", categorySlug);
  console.log("Card - Product Slug:", productSlug);
  console.log(
    "Card - Navigating to:",
    `/catalogue/${categorySlug}/${productSlug}`
  );

  const handleCardClick = () => {
    navigate(`/catalogue/${categorySlug}/${productSlug}`);
  };

  const originalPrice =
    discount > 0 ? Math.round((price / (1 - discount / 100)).toFixed(2)) : null;

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={`${imagePath}${images[0]}`} alt={name} loading="lazy" />
        <CartGoods itemId={product.id} />
        <FavoriteGoods itemId={product.id} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-category">{group}</p>
        <div className="card-price">
          <span
            className={`card-price-current ${discount > 0 ? "discounted" : ""}`}
          >
            {price}$
          </span>
          {discount > 0 && (
            <span className="card-price-original">{originalPrice}$</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
