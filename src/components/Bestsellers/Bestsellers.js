import {useEffect, useState} from 'react';
import {Box, Typography, useMediaQuery} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid2';
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../features/slices/productsSlice";
import CustomPagination from "../CustomPagination";
import {useTheme} from "@mui/styles";


function Bestsellers() {
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
    const bestsellers = goods.filter(item => item.bestsellers);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // const handleCategoryClick = () => {
    //     navigate(`/category/${bestsellers.categoryId}`);
    // };

    //Pagination
    const itemsPerPage = isSmallScreen ? 2 : 3;
    const pageCount = Math.ceil(bestsellers.length / itemsPerPage);

    // Get the items for the current page
    const paginatedItems = bestsellers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <Box sx={{
            display: 'flex', gap: '55px', alignItems: "stretch", maxWidth: '1440', marginBottom: "10rem"
        }}>
            {/* Left: Category Image */}
            <Box
                flex="1"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: {xs: '200px', sm: 'auto'},
                    minHeight: {sm: '250px'},
                    cursor: 'pointer',
                    display: {xs: "none", sm: "none", md: "flex"}
                }}>
                <img src={`http://localhost:5000/public/${bestsellers?.[0]?.images?.[0]}`} alt="bestsellers"
                     style={{width: '100%', objectFit: "cover", height: '100%', maxWidth: '523px', maxHeight:'462px'}}
                />
            </Box>

            {/* Right: Product Carousel */}
            <Box sx={{textAlign: 'center', width: {xs: "100%", sm: "100%", md: "60%"}, marginY: '0'}}>
                {/* Title and Pagination*/}
                <Box display="flex" sx={{gap: "20px", justifyContent: "space-between", marginBottom: "40px"}}>
                    <Typography variant="h4" fontWeight="bold">
                        Bestsellers
                    </Typography>
                    <CustomPagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Box>

                {/* Product Grid */}
                <Grid container spacing={2} justifyContent="space-between">
                    {paginatedItems.map((product) => (
                        <Grid item key={product.id} sx={{width: {xs: "47%", sm: "47%", md: "31%"}}}
                        >
                            <Box>
                                <Box
                                    component="img"
                                    src={`http://localhost:5000/public/${product.images?.[0]}`}
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
                                {/* Product Details */}
                                <Box marginBottom="0">
                                    <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                                    <Typography variant="body2">{product.group}</Typography>
                                    <Typography variant="subtitle1">
                                        ${product.price}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Bestsellers;