import './NewArrivals.scss';

import { useSelector } from 'react-redux';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useMediaQuery} from "@mui/system";

const NewArrivals = () => {
    //Test

        const products = [
            {
                id: 1,
                name: 'Product 1',
                description: 'Description for Product 1',
                price: 29.99,
                image: 'https://via.placeholder.com/150x150?text=Product+1',
                arrivalDate: '2024-10-01',
            },
            {
                id: 2,
                name: 'Product 2',
                description: 'Description for Product 2',
                price: 29.0,
                image: 'https://via.placeholder.com/150x150?text=Product+2',
                arrivalDate: '2024-10-02',
            },
            {
                id: 3,
                name: 'Product 3',
                description: 'Description for Product 3',
                price: 26.90,
                image: 'https://via.placeholder.com/150x150?text=Product+3',
                arrivalDate: '2023-09-21',
            },
            {
                id: 4,
                name: 'Product 4',
                description: 'Description for Product 4',
                price: 9.99,
                image: 'https://via.placeholder.com/150x150?text=Product+3',
                arrivalDate: '2024-10-02',
            },
            {
                id: 5,
                name: 'Product 5',
                description: 'Description for Product 5',
                price: 890.99,
                image: 'https://via.placeholder.com/150x150?text=Product+4',
                arrivalDate: '2024-10-05',
            },
            {
                id: 6,
                name: 'Product 6',
                description: 'Description for Product 6',
                price: 2.99,
                image: 'https://via.placeholder.com/150x150?text=Product+5',
                arrivalDate: '2024-10-05',
            },
            {
                id: 7,
                name: 'Product 7',
                description: 'Description for Product 7',
                price: 19.99,
                image: 'https://via.placeholder.com/150x150?text=Product+6',
                arrivalDate: '2024-10-01',
            },
            {
                id: 8,
                name: 'Product 8',
                description: 'Description for Product 8',
                price: 8.99,
                image: 'https://via.placeholder.com/150x150?text=Product+7',
                arrivalDate: '2024-10-04',
            },

        ];



    // Get products from Redux store and filter the 6 newest products by arrival date
    //const products = useSelector((state) => state.products);
    const newArrivals = [...products].sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)).slice(0, 6);

    // Settings for the carousel
    const isLargeScreen = useMediaQuery('(min-width:1024px)');
    const isMediumScreen = useMediaQuery('(min-width:600px)');

    const settings = {
        dots: false,
        infinite: true,
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
                paddingLeft: '84px',
                paddingRight: '84px',
                maxWidth: '1440',
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
                                    maxWidth: '350px', // Optional max width to keep the items compact
                                    margin: '0 24px',
                                    boxShadow: 'none',
                                    background: 'transparent',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ width: '50%', objectFit: 'contain', marginRight: '24px' }}
                                    image={product.image}
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
