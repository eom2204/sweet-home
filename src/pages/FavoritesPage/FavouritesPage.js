import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import {Container} from "@mui/system";
import Grid from "@mui/material/Grid2";
import Card from "../../components/Card/Card";
import "./FavoritesPage.scss";


function FavouritesPage() {
    const dispatch = useDispatch();
    const allGoods = useSelector((state) => state.goods.goods);
    const goodsStatus = useSelector((state) => state.goods.status); // Fetch status for goods
    const favoriteGoodsIds = useSelector((state) => state.favorites.favoriteItems);


    useEffect(() => {
        // Fetch all goods if not already loaded
        if (goodsStatus === "idle") {
            dispatch(fetchGoods());
        }
    }, [dispatch, goodsStatus]);

    // Filter goods based on updated Redux favorite IDs
    const favoriteGoods = allGoods.filter((good) => favoriteGoodsIds.includes(good.id));

    if (goodsStatus === "loading") {
        return <div>Loading your favorite goods...</div>;
    }

    if (goodsStatus === "failed") {
        return <div>Error: {error || "Failed to load goods"}</div>;
    }


    return (

        <Container className="favorite-goods-page">
            {favoriteGoods.length === 0 ?
                (<p>No favorite goods selected.</p>
                ) : (
                    <Grid container spacing={1}>
                        {favoriteGoods.map((product) => (
                            <Grid item key={product.id} sx={{maxWidth: "202px"}}>
                                <Card product={product}></Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            <h6 className="favorites_subtitle">You'll love it too</h6>
            <Grid container spacing={1}>
                {[...allGoods] // Create a shallow copy to avoid modifying the original array
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6)
                    .map((product) => (
                        <Grid item key={product.id} sx={{maxWidth: "202px"}}>
                            <Card product={product}></Card>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
}

export default FavouritesPage;