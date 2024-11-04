import './NewArrivals.scss';

import {useDispatch, useSelector} from 'react-redux';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useMediaQuery} from "@mui/system";
import {fetchGoods} from "../../features/slices/productsSlice";
import {useEffect} from "react";


const NewArrivals = () => {

    // Access goods data from Redux store
    const dispatch = useDispatch();
    const {goods, status, error} = useSelector((state) => state.goods);
    // Settings for the carousel
    const isLargeScreen = useMediaQuery('(min-width:1024px)');
    const isMediumScreen = useMediaQuery('(min-width:600px)');

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

    // Get products from Redux store and filter the 6 newest products by arrival date
    //const products = useSelector((state) => state.goods);
    const newArrivals = [...goods].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 10);


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: isLargeScreen ? 3 : isMediumScreen ? 2 : 1,
        slidesToScroll: 1,
        prevArrow: <button className="slick-prev">◀</button>,
        nextArrow: <button className="slick-next">▶</button>,
        adaptiveHeight: true,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMediumScreen ? 'row' : 'column',
                justifyContent: 'flex-start',
                alignItems: isMediumScreen ? 'flex-start' : 'center',
                //paddingLeft: '84px',
                //paddingRight: '84px',
                //maxWidth: '1440',
            }}
        >
            {/* Left Side: Title and Button */}
            <Box sx={{ position: 'relative', flex: 1, textAlign: 'left' }}>
                <Typography variant={isMediumScreen ? 'h4' : 'h5'} sx={{ mb: '48px' }}>
                    New Arrivals
                </Typography>
                <Button
                    variant="outlined"
                    size="large"
                    sx={{ mt: '48px', position: 'absolute', left: 0, bottom: 0 }}
                    className="button"
                >
                    SEE MORE
                </Button>
            </Box>

            {/* Right Side: Carousel */}
            <Box
                sx={{
                    flex: 3,
                    ml: '62px',
                    maxWidth: '1200px',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        '.slick-list': {
                            maxWidth: '100%',
                            height: 'auto',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <Slider {...settings}>
                        {newArrivals.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row', // Ensure row alignment
                                    width: '100%', // Set width to fill container
                                    maxWidth: '202px', // Optional max width to keep the items compact
                                    margin: '0 24px',
                                    maxHeight: '248px',
                                    boxShadow: 'none',
                                    background: 'transparent',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ width: '100%', objectFit: 'cover'}}
                                    image={`http://localhost:5000/public/${product.images?.[0]}`}
                                    alt={product.name}
                                />
                                <CardContent
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography variant="h6" noWrap>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" noWrap>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        ${product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Slider>
                </Box>
            </Box>
        </Box>
    );
};

export default NewArrivals;
