import {useEffect, useState} from 'react';
import {Box, Typography, useMediaQuery} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import Grid from "@mui/material/Grid2";
import CustomPagination from "../CustomPagination";
import {useTheme} from "@mui/styles";


function Popular() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Checks if screen is smaller than 600px

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

// Access goods data from Redux store
    const dispatch = useDispatch();
    const {goods, status, error} = useSelector((state) => state.goods);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGoods());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    // Check if goods is defined and is an array
    if (!goods || !Array.isArray(goods)) {
        return <div>Loading...</div>;  // Show loading state or an empty message
    }

    // Filter for food items that are bestsellers
    const popularGoods = goods.filter(item => item.popularAnalyses);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    //Pagination
    const itemsPerPage = isSmallScreen ? 4 : 6; // Set items per page to 6
    const pageCount = Math.ceil(popularGoods.length / itemsPerPage);

    // Get the items for the current page
    const paginatedItems = popularGoods.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const imagePath = process.env.REACT_APP_IMAGE_PATH;


    return (

            <Box sx={{
                display: 'flex', gap: '55px', alignItems: "stretch", marginY: {xs: '44px', sm: '44px', md: '120px'}
            }}>
                {/* Left: Category Image */}
                <Box
                    flex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        height: {xs: '200px', sm: 'auto'},
                        minHeight: {sm: '250px'}, // Ensure a minimum height
                        cursor: 'pointer',
                        display: {xs: "none", sm: "none", md: "flex"}
                }}>
                    <img src={`${imagePath}${popularGoods?.[0]?.images?.[0]}`} alt="popular goods"
                         style={{width: '100%', objectFit: "cover", height: '100%', maxWidth: '523px'}}
                    />
                </Box>

                {/* Right: Product Carousel */
                }
                <Box sx={{textAlign: 'center', width: {xs: "100%", sm: "100%", md: "60%"}, marginY: '0'}}>
                    {/* Title and Pagination*/}
                    <Box display="flex" sx={{justifyContent: 'space-between', marginBottom: "40px"}}>
                        <Typography variant="h3" component="h2">Popular</Typography>
                        <CustomPagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Box>

                    {/* Product Grid */}
                    <Grid container spacing={2} justifyContent="space-between">
                        {paginatedItems.map((product) => (
                            <Grid item sx={{width: {xs: "47%", sm: "47%", md: "31%"}}}>
                                <Box
                                    component="img"
                                    src={`${imagePath}${product.images?.[0]}`}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        maxWidth: '202px',
                                        height: '248px',
                                        cursor: 'pointer',
                                        objectFit: 'cover',
                                        marginBottom: '8px',
                                    }}
                                    onClick={() => handleProductClick(product.id)}
                                />
                                <Box>
                                    <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                                    <Typography variant="body2">
                                        {product.group}
                                    </Typography>
                                    <Typography variant="subtitle1">${product.price}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

    );
}

export default Popular;


