import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoods } from "../../app/redux/slices/productsSlice";
import {
  addToCart,
  removeFromCartAndSync,
  syncCartWithBackend,
} from "../../app/redux/slices/cartSlice";
import { fetchCategories } from "../../app/redux/slices/categoriesSlice";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Button from "../Button/Button";
import Card from "../Card/Card";
import FavoriteGoods from "../FavoriteGoods/FavoriteGoods";
import { generateSlug } from "../../utils/generateSlus.js";
import "./Product.scss";

const Product = () => {
  const { categorySlug, productSlug } = useParams();
  const dispatch = useDispatch();
  const imagePath = process.env.REACT_APP_IMAGE_PATH;

  const {
    goods,
    status: goodsStatus,
    error: goodsError,
  } = useSelector((state) => state.goods);

  const { status, error } = useSelector((state) => state.categories);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (goodsStatus === "idle") {
      dispatch(fetchGoods());
    }
  }, [goodsStatus, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories("product"));
    }
  }, [status, dispatch]);

  // Проверка дубликатов имен
  useEffect(() => {
    if (goods.length > 0) {
      const nameCounts = goods.reduce((acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + 1;
        return acc;
      }, {});
      const duplicates = Object.entries(nameCounts).filter(
        ([name, count]) => count > 1
      );
      console.log("Product - Duplicate names:", duplicates);
    }
  }, [goods]);

  // Поиск продукта по productSlug
  const product = goods.find((item) => generateSlug(item.name) === productSlug);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product?.images?.[0]) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    setIsInCart(product && cartItems.includes(product.id));
  }, [cartItems, product]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [productSlug]);

  if (goodsStatus === "loading" || status === "loading") {
    return <div>Loading...</div>;
  }

  if (goodsStatus === "failed") {
    return <div>Error: {goodsError}</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCartAndSync(product.id));
    } else {
      dispatch(addToCart(product.id));
      dispatch(syncCartWithBackend(cartItems));
    }
    setIsInCart((prev) => !prev);
  };

  const buttonText = (
    <>
      <img src="/shoppingCart.svg" className="cart-icon" alt="shoppingCart" />
      <span className="button-text">
         {isInCart ? "Remove from cart" : "Add to cart"} 
      </span>
      <span className="button-price">{` ${product.price}$`}</span>
    </>
  );

  let randomProducts = [];
  if (goods.length > 0) {
    const shuffled = [...goods].sort(() => 0.5 - Math.random());
    randomProducts = shuffled.slice(0, 6);
  }

  return (
    <section className="wrapper-product-section">
      <Breadcrumb className="breadcrumb" />

      <article className="article-section">
        <div className="photo-section">
          <div className="small-photo-section">
            <ul>
              {Array.isArray(product.images) && product.images.length > 0 ? (
                product.images.map((image, index) => (
                  <li key={index} onClick={() => setSelectedImage(image)}>
                    <img
                      src={`${imagePath}${image}`}
                      alt={`Product ${product.name} - ${index}`}
                      className="image"
                      onError={() =>
                        console.error(
                          `Failed to load image: ${imagePath}${image}`
                        )
                      }
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
              src={`${imagePath}${selectedImage}`}
              alt={`Main - ${product.name}`}
              className="main-image"
              onError={() =>
                console.error(
                  `Failed to load main image: ${imagePath}${selectedImage}`
                )
              }
            />
          </div>
        </div>

        <div className="description-section">
          {product.createdAt > Date.now() - 30 * 24 * 60 * 60 * 1000 && (
            <p>New</p>
          )}
          <p className="description-header">{product.name}</p>
          <p className="description-header">{product.price}$</p>
          <div className="buttons-section">
            <Button
              type="button"
              className="add-button"
              text={buttonText}
              onClick={handleAddToCart}
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
               Shipping
            </p>
            <p className="information-text">
              <img
                src="/rotation.png"
                alt="packageimg"
                width="24px"
                height="24px"
              />
               You can return the product within 30 days
            </p>
          </div>
        </div>
      </article>

      <article className="low-description-section">
        <p className="low-description-text">
          <span className="description-name">Room: </span>
          <span className="product-description">{product.category}</span>
        </p>
        <p className="low-description-text">
          <span className="description-name">Product: </span>
          <span className="product-description">{product.group}</span>
        </p>
        <p className="low-description-text">
          <span className="description-name">Brand: </span>
          <span className="product-description">
            {product.brand
              ? product.brand.charAt(0).toUpperCase() + product.brand.slice(1)
              : ""}
          </span>
        </p>
      </article>

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
