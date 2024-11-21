import {useEffect, useState} from 'react';
import {Box, Typography, useMediaQuery} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid2';
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import CustomPagination from "../CustomPagination";
import {useTheme} from "@mui/styles";

import './Bestsellers.scss';


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

    const imagePath = process.env.REACT_APP_IMAGE_PATH;


    return (
        <Box sx={{
            display: 'flex', gap: '55px', alignItems: "stretch", marginY: {xs: '44px', sm: '44px', md: '120px'
        }}}>
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
                <img src={`${imagePath}${bestsellers?.[0]?.images?.[0]}`} alt="bestsellers"
                     style={{width: '100%', objectFit: "cover", height: '100%', maxWidth: '523px', maxHeight:'462px'}}
                />
            </Box>

            {/* Right: Product Carousel */}
            <Box sx={{textAlign: 'center', width: {xs: "100%", sm: "100%", md: "60%"}, marginY: '0'}}>
                {/* Title and Pagination*/}
                <Box display="flex" sx={{justifyContent: "space-between", marginBottom: "40px"}}>
                    <Typography variant="h3" component="h2">
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
                                <svg className="bestsellers--icon-heart" width="22" height="19" viewBox="0 0 22 19" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.4663 2.31681L19.4667 2.31715C19.8848 2.73504 20.2164 3.23121 20.4427 3.77731C20.669 4.32341 20.7854 4.90875 20.7854 5.49987C20.7854 6.091 20.669 6.67633 20.4427 7.22244C20.2164 7.76854 19.8848 8.26471 19.4667 8.6826L19.4665 8.68277L18.4065 9.74277L11.3336 16.8157L4.26072 9.74277L3.20072 8.68277C2.35657 7.83861 1.88232 6.69369 1.88232 5.49987C1.88232 4.30606 2.35657 3.16114 3.20072 2.31698C4.04488 1.47282 5.1898 0.998582 6.38362 0.998582C7.57743 0.998582 8.72235 1.47282 9.56651 2.31698L10.6265 3.37698C11.017 3.7675 11.6502 3.7675 12.0407 3.37698L13.1007 2.31698L13.1009 2.31681C13.5188 1.89873 14.0149 1.56707 14.5611 1.34079C15.1072 1.11451 15.6925 0.998047 16.2836 0.998047C16.8747 0.998047 17.4601 1.11451 18.0062 1.34079C18.5523 1.56707 19.0485 1.89873 19.4663 2.31681Z"
                                        stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>

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