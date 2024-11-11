//import './NewArrivals.scss';

import {useDispatch, useSelector} from 'react-redux';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useMediaQuery} from "@mui/system";
import {fetchGoods} from "../../features/slices/productsSlice";
import {useEffect} from "react";
import Button from '../Button/Button';
import {useTheme} from "@mui/styles";


const NewArrivals = () => {

    // Access goods data from Redux store
    const dispatch = useDispatch();
    const {goods, status, error} = useSelector((state) => state.goods);

    // Settings for the carousel
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Checks if screen is smaller than 600px

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

    // filter the 10 newest products by arrival date
    const newArrivals = [...goods].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 10);


    const settings = {
        dots: false,
        infinite: false,
        //speed: 500,
        slidesToShow: isSmallScreen ? 2 : 3,
        slidesToScroll: 1,
        prevArrow: <button className="slick-prev">◀</button>,
        nextArrow: <button className="slick-next">▶</button>,
        adaptiveHeight: true,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isSmallScreen ? 'center' : 'flex-start',
                gap: '62px',
            }}
        >
            {/* Left Side: Title and Button */}
            <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', textAlign: 'left',
                width: {xs: "100%", sm: "100%", md: "40%"}}}>
                <Typography variant={isSmallScreen ? 'h4' : 'h5'} sx={{ mb: '48px' }}>
                    New Arrivals
                </Typography>
                <Button type="submit" text="SEE MORE"></Button>
            </Box>

            {/* Right Side: Carousel */}
            <Box
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: {xs: "100%", sm: "100%", md: "60%"},
                }}
            >

                    <Slider {...settings}>
                        {newArrivals.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column', // Ensure row alignment
                                    width: '100%',
                                    maxWidth: '202px',
                                    boxShadow: 'none',
                                    background: 'transparent',
                                    textAlign: 'center',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ width: '100%',
                                        objectFit: 'cover',
                                        //maxWidth: '202px',
                                        height: '248px',
                                        cursor: 'pointer',
                                        marginBottom: '8px',}}
                                    image={`http://localhost:5000/public/${product.images?.[0]}`}
                                    alt={product.name}
                                />
                                <CardContent
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        padding: 0,
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
                                    <Typography variant="body2">
                                        {product.group}
                                    </Typography>
                                    <Typography variant="subtitle1">${product.price}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Slider>

            </Box>
        </Box>
    );
};

export default NewArrivals;
