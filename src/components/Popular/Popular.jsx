import './Popular.scss';
import React, {useEffect, useState} from 'react';
import {Box, CssBaseline, extendTheme, Pagination, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../features/slices/productsSlice";
import Grid from "@mui/material/Grid2";
import CustomPagination from "../CustomPagination";


function Popular() {

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


    const itemsPerPage = 6; // Set items per page to 6
    const pageCount = Math.ceil(popularGoods.length / itemsPerPage);

    // Get the items for the current page
    const paginatedItems = popularGoods.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

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
                    }}>
                    <img src={`http://localhost:5000/public/${popularGoods?.[0]?.images?.[0]}`} alt="popular goods"
                         style={{maxWidth: '100%', objectFit: "cover", maxHeight: '100%',}}
                    />
                </Box>
                {/*// sx={{width: "40%"}}>*/}

                {/* Right: Product Carousel */
                }
                <Box sx={{textAlign: 'center', mt: 4, mb: 4, width: "60%", marginY: '0'}}>
                    {/* Title and Pagination*/}
                    <Box sx={{display: 'flex', justifyContent: 'space between', alignItems: 'center', gap: '20px', marginBottom: "40px"}}>
                        <Typography variant="h4" fontWeight="bold">Popular</Typography>
                        <CustomPagination
                            count={Math.ceil(popularGoods.length / 3)}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Box>

                    {/* Product Grid - 3 items in one row */}
                    <Grid container spacing={2}>
                        {paginatedItems.map((product) => (
                            <Grid size={3} key={product.id} sx={{width: '30%'}}>
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
                                <Box>
                                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{product.name}</Typography>
                                    {/*<Typography variant="body2" color="text.secondary" sx={{my: 1}}>*/}
                                    {/*    {product.description}*/}
                                    {/*</Typography>*/}
                                    <Typography variant="subtitle1" color="primary">${product.price}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

    );
}

export default Popular;


