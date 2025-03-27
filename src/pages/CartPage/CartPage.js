// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {fetchGoods} from "../../app/redux/slices/productsSlice";
// import {Container} from "@mui/system";
// import Grid from "@mui/material/Grid2";
// import Card from "../../components/Card/Card";
// import "./CartPage.scss";
//
//
// function CartPage() {
//     const dispatch = useDispatch();
//     const allGoods = useSelector((state) => state.goods.goods);
//     const goodsStatus = useSelector((state) => state.goods.status); // Fetch status for goods
//     const cartGoodsIds = useSelector((state) => state.cart.cartItems);
//
//
//     useEffect(() => {
//         // Fetch all goods if not already loaded
//         if (goodsStatus === "idle") {
//             dispatch(fetchGoods());
//         }
//     }, [dispatch, goodsStatus]);
//
//     // Filter goods based on updated Redux favorite IDs
//     const cartGoods = allGoods.filter((good) => cartGoodsIds.includes(good.id));
//
//     if (goodsStatus === "loading") {
//         return <div>Loading goods in Cart...</div>;
//     }
//
//     if (goodsStatus === "failed") {
//         return <div>Error: {"Failed to load goods in Cart"}</div>;
//     }
//
//
//     return (
//
//         <Container className="favorite-goods-page">
//             {cartGoods.length === 0 ?
//                 (<p>No favorite goods selected.</p>
//                 ) : (
//                     <Grid container spacing={1}>
//                         {cartGoods.map((product) => (
//                             <Grid item key={product.id} sx={{maxWidth: "202px"}}>
//                                 <Card product={product}></Card>
//                             </Grid>
//                         ))}
//                     </Grid>
//                 )}
//             <h6 className="favorites_subtitle">You'll love it too</h6>
//             <Grid container spacing={1}>
//                 {[...allGoods] // Create a shallow copy to avoid modifying the original array
//                     .sort(() => Math.random() - 0.5)
//                     .slice(0, 6)
//                     .map((product) => (
//                         <Grid item key={product.id} sx={{maxWidth: "202px"}}>
//                             <Card product={product}></Card>
//                         </Grid>
//                     ))}
//             </Grid>
//         </Container>
//     );
// }
//
// export default CartPage;