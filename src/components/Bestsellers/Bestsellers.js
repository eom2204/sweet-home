import './Bestsellers.scss';

import React, {useEffect, useState} from 'react';
import {Box, Pagination, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid2';
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../features/slices/productsSlice";
import CustomPagination from "../CustomPagination";


function Bestsellers() {

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

    console.log(bestsellers);


    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // const handleCategoryClick = () => {
    //     navigate(`/category/${bestsellers.categoryId}`);
    // };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{
            display: 'flex', gap: '55px', maxWidth: '1440', marginBottom: "10rem"
        }}>
            {/* Left: Category Image */}
            <Box
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    backgroundColor: 'grey.200', // for visibility
                    height: {xs: '200px', sm: 'auto'},
                    minHeight: {sm: '300px'}, // Ensure a minimum height
                    cursor: 'pointer',
                    //width: '40%'
                }}>
                <img src={`http://localhost:5000/public/${bestsellers?.[0]?.images?.[0]}`} alt="bestsellers"
                     style={{maxWidth: '100%', objectFit: "cover", maxHeight: '100%',}}
                />
            </Box>

            {/* Right: Product Carousel */}
            <Box width="60%">
                {/* Title and Pagination*/}
                <Box display="flex" alignItems="center" sx={{gap: "3.4rem", marginBottom: "40px"}}>
                    <Typography variant="h4" fontWeight="bold">
                        Bestsellers
                    </Typography>
                    <CustomPagination
                        count={Math.ceil(bestsellers.length / 3)}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Box>

                {/* Product Grid - 3 items in one row */}
                <Grid container spacing={3} sm={6} md={4}>
                    {bestsellers.slice((page - 1) * 3, page * 3).map((product) => (
                        <Grid key={product.id} sm={6} md={4}>
                            <Box sx={{maxWidth: '202px'}}>
                                <Box
                                    component="img"
                                    src={`http://localhost:5000/public/${product.images?.[0]}`}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: '248px',
                                        cursor: 'pointer',
                                        objectFit: 'cover',
                                        marginBottom: '8px',
                                    }}
                                    onClick={() => handleProductClick(product.id)}
                                />
                                {/* Product Details */}
                                <Box>
                                    <Typography variant="h6">{product.name}</Typography>
                                    {/*<Typography variant="body2">{product.description}</Typography>*/}
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {product.price}
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