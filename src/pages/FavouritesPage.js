import {useEffect, useState} from "react";
import {Container} from "@mui/system";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import Card from "../components/Card/Card";
import {getToken} from "../services/authService";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../app/redux/slices/productsSlice";
import {removeFavoriteAndSync} from "../app/redux/slices/favoritesSlice";


function FavouritesPage() {
    const dispatch = useDispatch();
    const allGoods = useSelector((state) => state.goods.goods);
    const goodsStatus = useSelector((state) => state.goods.status); // Fetch status for goods
    const [favoriteGoodsIds, setFavoriteGoodsIds] = useState([])
    const [favoriteGoods, setFavoriteGoods] = useState([]); // State to store fetched goods
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors


    useEffect(() => {
        const fetchFavoriteGoodsIds = async () => {
            try {
                setLoading(true);

                // Retrieve token from cookies
                const userToken = getToken();
                if (!userToken) {
                    throw new Error("No authentication token found");
                }

                // Send token to backend to fetch favorite goods
                const response = await axios.get('https://sweet-home-api-black.vercel.app/api/user/info', {
                    headers: {
                        Authorization: `Bearer ${userToken}`, // Send token
                    },
                });

                console.log(response.data);

                const goodsIds = response.data?.basket?.goodsIds || [];
                setFavoriteGoodsIds(goodsIds);

            } catch (err) {
                setError(err.message || "Failed to fetch favorite goods.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteGoodsIds();
    }, []); // Ensure the effect only runs when dispatch changes.

    useEffect(() => {
        // Fetch all goods if not already loaded
        if (goodsStatus === "idle") {
            dispatch(fetchGoods());
        }
    }, [dispatch, goodsStatus]);

    useEffect(() => {
        // Filter goods from Redux store based on favorite IDs
        if (favoriteGoodsIds.length > 0 && allGoods.length > 0) {
            const filteredGoods = allGoods.filter((good) => favoriteGoodsIds.includes(good.id));
            setFavoriteGoods(filteredGoods);
        }
    }, [favoriteGoodsIds, allGoods]);

    if (loading || goodsStatus === "loading") {
        return <div>Loading your favorite goods...</div>;
    }

    if (error || goodsStatus === "failed") {
        return <div>Error: {error || "Failed to load goods"}</div>;
    }

    console.log('favoriteGoods', favoriteGoods);

    return (
        <Container className="favorite-goods-page">
            <h1>My Favorite Goods</h1>
            {favoriteGoods.length === 0 ?
                (<p>No favorite goods selected.</p>
                ) : (
                    <Grid container spacing={1}>
                        {favoriteGoods.map((product) => (
                            <Grid item key={product.id}>
                                <Card product={product}></Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
        </Container>
    );
}

export default FavouritesPage;