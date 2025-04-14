import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchGoods } from "../../app/redux/slices/productsSlice";
import { removeFromCartAndSync } from "../../app/redux/slices/cartSlice";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import { Box, Tooltip } from "@mui/material";
import Button from "../Button/Button";
import CartGoodsCounter from "./CartGoodsCounter";
import "./CartPopUp.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    backgroundColor: "#F6F3EC",
    maxWidth: "1251px",
    marginTop: "180px",
    maxHeight: "calc(100% - 200px)",
  },
}));

function CartPopUp({ open, handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allGoods = useSelector((state) => state.goods.goods);
  const goodsStatus = useSelector((state) => state.goods.status); // Fetch status for goods
  const cartGoodsIds = useSelector((state) => state.cart.cartItems);
  const [quantity, setQuantity] = useState({}); // quantity per product ID
  const imagePath = process.env.REACT_APP_IMAGE_PATH;

  useEffect(() => {
    //         // Fetch all goods if not already loaded
    if (goodsStatus === "idle") {
      dispatch(fetchGoods());
    }
  }, [dispatch, goodsStatus]);

  // Filter goods based on updated Redux favorite IDs
  const cartGoods = allGoods.filter((good) => cartGoodsIds.includes(good.id));

  const cartGoodsPrice = Math.round(
    cartGoods
      .reduce((acc, good) => acc + good.price * (quantity[good.id] || 1), 0)
      .toFixed(2)
  );

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const deleteFromCart = (productId) => {
    dispatch(removeFromCartAndSync(productId));
  }; // Removes from Redux & Backend)

  return (
    <React.Fragment>
      <BootstrapDialog
        className="cart"
        fullWidth="true"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="1250px"
      >
        <DialogTitle
          sx={{ margin: "24px", textAlign: "left", p: 0 }}
          id="customized-dialog-title"
        >
          Cart
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 16,
            top: 16,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "878px" },
                width: { xs: "100%", md: "70%" },
              }}
            >
              {cartGoods.length === 0 ? (
                <p>Please add goods to your cart.</p>
              ) : (
                <Grid container spacing={1} direction="column">
                  {cartGoods.map((product) => (
                    <Grid
                      item
                      key={product.id}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        borderBottom: "1px solid black",
                        padding: "24px",
                      }}
                    >
                      {/*<Card product={product}></Card>*/}
                      <div className="cart_product">
                        <img
                          src={`${imagePath}${product.images?.[0]}`}
                          alt={product.name}
                          className="cart_product-image"
                          onClick={() => handleProductClick(product.id)}
                        />
                        <p className="cart_product-price">{product.price}$</p>
                        <Tooltip title="Delete" placement="right">
                          <svg
                            className="cart_product-delete"
                            width="21"
                            height="21"
                            onClick={() => deleteFromCart(product.id)}
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 4H3.33333H14"
                              stroke="#222133"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.33301 3.99967V2.66634C5.33301 2.31272 5.47348 1.97358 5.72353 1.72353C5.97358 1.47348 6.31272 1.33301 6.66634 1.33301H9.33301C9.68663 1.33301 10.0258 1.47348 10.2758 1.72353C10.5259 1.97358 10.6663 2.31272 10.6663 2.66634V3.99967M12.6663 3.99967V13.333C12.6663 13.6866 12.5259 14.0258 12.2758 14.2758C12.0258 14.5259 11.6866 14.6663 11.333 14.6663H4.66634C4.31272 14.6663 3.97358 14.5259 3.72353 14.2758C3.47348 14.0258 3.33301 13.6866 3.33301 13.333V3.99967H12.6663Z"
                              stroke="#222133"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.66699 7.33301V11.333"
                              stroke="#222133"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.33301 7.33301V11.333"
                              stroke="#222133"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Tooltip>
                      </div>
                      <div className="cart_product-name">{product.name}</div>

                      <CartGoodsCounter
                        goodsCounter={quantity[product.id] || 1}
                        onChange={(newQty) =>
                          handleQuantityChange(product.id, newQty)
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: { xs: "100%", md: "315px" },
                minWidth: { xs: "100%", md: "315px" },
                width: { xs: "100%", md: "30%" },
                padding: "24px",
                marginLeft: { xs: 0, md: "5px" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid black",
                  paddingBottom: "12px",
                }}
              >
                <div className="cart_price">Order price</div>
                <div>{cartGoodsPrice}$</div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                  marginBottom: "32px",
                }}
              >
                <div className="cart_total-price">Total price</div>
                <div>{cartGoodsPrice}$</div>
              </Box>
              <Button
                className="cart_button"
                type="submit"
                //onClick={props.onClick}
                text="Checkout"
              />
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default CartPopUp;
