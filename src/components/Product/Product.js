import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../../app/redux/slices/productsSlice";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Button from "../Button/Button";
import Card from "../Card/Card";
import FavoriteGoods from "../FavoriteGoods/FavoriteGoods";

import "./Product.scss";
const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    goods,
    status: goodsStatus,
    error: goodsError,
  } = useSelector((state) => state.goods);

  useEffect(() => {
    if (goodsStatus === "idle") {
      dispatch(fetchGoods());
    }
  }, [goodsStatus, dispatch]);

  console.log(goods);

  const product = goods.find((item) => item.id === Number(id));

  console.log(goods);

  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] || ""
  );

  if (goodsStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (goodsStatus === "failed") {
    return <div>Error: {goodsError}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  if (product.createdAt > Date.now(-30)) {
    return;
  }

  const handleAddToCart = () => {
    // Add your add to cart logic here
    console.log("Added to cart:", product.name);
  };

  const buttonText = (
    <>
      <img src="/shoppingCart.svg" className="cart-icon"></img>
      <span className="button-text"> Add to cart </span>
      <span className="button-price">{product.price}$</span>
    </>
  );

  let randomProducts = [];
  if (goods.length > 0) {
    const shuffled = [...goods].sort(() => 0.5 - Math.random());
    randomProducts = shuffled.slice(0, 6);
  }

  return (
    <section className="wrapper-section">
      <Breadcrumb />

      {/* make component "Photo Section" */}
      <article className="article-section">
        <div className="photo-section">
          <div className="small-photo-section">
            <ul>
              {Array.isArray(product.images) ? (
                product.images.map((image, index) => (
                  <li key={index} onClick={() => setSelectedImage(image)}>
                    <img
                      src={image}
                      alt={`Product ${product.name} - ${index}`}
                      className="image"
                    />
                  </li>
                ))
              ) : (
                <li>No images available</li>
              )}
            </ul>
          </div>
          <div>
            <img
              src={selectedImage}
              alt={`Main - ${product.name}`}
              className="main-image"
            />
          </div>
        </div>

        {/* MAKE DESCRIPTION COMPONENT */}

        <div className="description-section">
          {product.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
            <p>New</p>
          )}
          <p className="description-header">{product.name}</p>
          <p className="description-header">{product.price}$</p>
          <p className="description-color">color: </p>
          <div className="buttons-section">
            <Button
              type="button"
              className="add-button"
              text={buttonText}
              onClick={handleAddToCart()}
            ></Button>
            <div className="favorite-goods-section">
              <FavoriteGoods
                itemId={product.id}
                className="favorite-goods-btn"
              />
            </div>
          </div>
          <div className="free-shopping">Free shopping over $300</div>
          <div className="information-section">
            <p className="information-text">
              <img
                src="/package.png"
                alt="packageimg"
                width="24px"
                height="24px"
              />
              &nbsp;Shipping
            </p>
            <p className="information-text">
              <img
                src="/rotation.png"
                alt="packageimg"
                width="24px"
                height="24px"
              />
              &nbsp;You can return the product within 30 days
            </p>
          </div>
        </div>
      </article>

      {/* CAN MAKE RANDOM SECTION COMPONENT */}
      <article className="random-section">
        <p className="random-section-header">You'll love it too</p>
        <div className="card-section">
          {randomProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Product;
