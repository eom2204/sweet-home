import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteGoods from "../FavoriteGoods/FavoriteGoods";
import "./Card.scss";
import CartGoods from "../CartGoods/CartGoods";

const Card = ({ product }) => {
  const { name, price, images, group, discount, category } = product;
  const navigate = useNavigate();

  const originalPrice = Math.round(
    discount > 0 ? (price / (1 - discount / 100)).toFixed(2) : null
  );
  const imagePath = process.env.REACT_APP_IMAGE_PATH;

  const handleCardClick = () => {
    navigate(`/catalogue/${category}/${product.id}`);
  };

  return (

    <div className="card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={`${imagePath}${images[0]}`} alt={name} loading={"lazy"} />
        <CartGoods itemId={product.id}/>
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
