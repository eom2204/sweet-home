import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import {generateSlug} from "../../utils/generateSlus";
import {Box, Typography, useMediaQuery} from '@mui/material';
import {useTheme} from "@mui/styles";
import Grid from '@mui/material/Grid2';
import {Container} from "@mui/system";
import CustomPagination from "../CustomPagination";
import WrapperSection from "../WrapperSection/WrapperSection";
import Card from "../Card/Card";
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

    const handleImageClick = (product) => {
        navigate(`/catalogue/${generateSlug(product.category)}/${generateSlug(product.name)}`);
    };

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
        <Container className='bestsellers' sx={{maxWidth: {lg: 'none'}}}>
            <WrapperSection>
                <Box sx={{
                    display: 'flex',
                    gap: {md: '10px', lg: '55px'},
                    alignItems: "stretch",
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
                        <img
                            src={`${imagePath}${bestsellers?.[0]?.images?.[0]}`}
                            alt="bestsellers"
                            style={{width: '100%', objectFit: "cover", height: '100%', maxWidth: '523px', maxHeight: '462px'}}
                            onClick={() => handleImageClick(bestsellers?.[0])}
                        />
                    </Box>


                    {/* Right: Product Carousel */}
                    <Box sx={{textAlign: 'center', width: {xs: "100%", sm: "100%", md: "60%"}, marginY: '0'}}>
                        {/* Title and Pagination*/}
                        <Box display="flex" sx={{justifyContent: "space-between", marginBottom: "40px"}}>
                            <Typography variant="h3" component="h2">
                                Bestsellers
                            </Typography>

                            {!isSmallScreen ? <CustomPagination
                                count={pageCount}
                                page={page}
                                onChange={handlePageChange}
                            /> : ''}
                        </Box>

                        {/* Product Grid */}
                        <Grid container spacing={2} justifyContent="space-between">
                            {paginatedItems.map((product) => (
                                <Grid item key={product.id} sx={{width: {xs: "47%", sm: "47%", md: "31%"}}}
                                >
                                    <Box sx={{
                                        maxWidth: '202px',
                                        height: '248px',
                                        marginBottom: '8px',
                                        position: 'relative'
                                    }}>
                                        <Card product={product}></Card>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
                {isSmallScreen ? <CustomPagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                /> : ''}
            </WrapperSection>
        </Container>
    );
}

export default Bestsellers;