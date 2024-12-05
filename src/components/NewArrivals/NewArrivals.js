import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import {useTheme} from "@mui/styles";
import {useMediaQuery} from "@mui/system";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import Button from '../Button/Button';
import './NewArrivals.scss';


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

    const imagePath = process.env.REACT_APP_IMAGE_PATH;

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: isSmallScreen ? 2 : 4,
        slidesToScroll: 1,
        prevArrow: <button className="slick-prev">◀</button>,
        nextArrow: <button className="slick-next">▶</button>,
        adaptiveHeight: true,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: isSmallScreen ? '44px' : '120px',
                marginBottom: isSmallScreen ? '44px' : '120px',
                //justifyContent: 'space-between',
                //alignItems: isSmallScreen ? 'center' : 'flex-start',
                // gap: '62px',
                //textAlign: 'center',
            }}
        >
            <Typography variant='h3' component='h2' sx={{ marginBottom: {xs: '24px', sm: '24px', md: '44px' }}}>
                New Arrivals
            </Typography>


            {/* Right Side: Carousel */}
            <Box
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    width: '100%',
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
                                    image={`${imagePath}${product.images?.[0]}`}
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
            <Button type="submit" text="SEE MORE" className="arrivals__button"></Button>
        </Box>
    );
};

export default NewArrivals;
