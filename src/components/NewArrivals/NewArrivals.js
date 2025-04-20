import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Box, Typography} from '@mui/material';
import {useTheme} from "@mui/styles";
import {useMediaQuery} from "@mui/system";
import {fetchGoods} from "../../app/redux/slices/productsSlice";
import Button from '../Button/Button';
import WrapperSection from "../WrapperSection/WrapperSection";
import Card from "../Card/Card";
import {ReactComponent as LeftArrowIcon} from '../../assets/icons/slider_arrow_left.svg';
import {ReactComponent as RightArrowIcon} from '../../assets/icons/slider_arrow_right.svg';
import './NewArrivals.scss';
import Grid from "@mui/material/Grid2";
import {useNavigate} from "react-router-dom";


const NewArrivals = () => {
    const navigate = useNavigate();
    const sliderRef = useRef(null); // Create a reference for the slider

    // Access goods data from Redux store
    const dispatch = useDispatch();
    const {goods, status, error} = useSelector((state) => state.goods);

    // Settings for the carousel
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Checks if screen is smaller than 600px
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("lg"));

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchGoods());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading New Arrivals...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    // Check if goods is defined and is an array
    if (!goods || !Array.isArray(goods)) {
        return <div>Loading...</div>;  // Show loading state or an empty message
    }

    // filter the 10 newest products by arrival date
    const newArrivals = [...goods].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 10);

    const CustomPrevArrow = () => (
        <button onClick={() => sliderRef.current.slickPrev()}
                className="custom-prev">
            <LeftArrowIcon></LeftArrowIcon>
        </button>
    );

    const CustomNextArrow = () => (
        <button onClick={() => sliderRef.current.slickNext()}
                className="custom-next">
            <RightArrowIcon></RightArrowIcon>
        </button>
    );

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: isMediumScreen ? 3 : 4,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        adaptiveHeight: false,
    };

    const handleButtonClick = () => {
        navigate('/catalogue')
    }

    return (
        <WrapperSection>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: isSmallScreen ? '44px' : '120px',
                    marginBottom: isSmallScreen ? '44px' : '120px',
                }}
            >
                <Typography variant='h3' component='h2' sx={{marginBottom: {xs: '24px', sm: '24px', md: '44px'}}}>
                    New Arrivals
                </Typography>

                {isSmallScreen ?
                    <Grid container spacing={1} justifyContent="space-between">
                        {newArrivals.map((product, index) => (index < 4 ?
                                (<Grid item key={product.id} sx={{width: '47%'}}>
                                    <Card product={product}/>
                                </Grid>) : null
                        ))}
                    </Grid>
                    : <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            maxWidth: '1272px',
                            margin: '0 auto',
                        }}
                    >

                        <Box
                            sx={{
                                flexGrow: 1,
                                overflow: 'hidden',
                                margin: '0 auto',
                                padding: {md: '0 88px', lg: '0 128px'},
                            }}
                        >
                            <Slider {...settings} ref={sliderRef} sx={{margin: '0 auto', pr: 0}}>
                                {newArrivals.map((product) => (
                                    <div style={{margin: '0 auto'}}>
                                        <Card key={product.id} product={product}></Card>
                                    </div>
                                ))}
                            </Slider>
                        </Box>

                    </Box>}
                <Button type="submit" text="SEE MORE" className="arrivals__button" onClick={handleButtonClick}></Button>
            </Box>
        </WrapperSection>
    );
};

export default NewArrivals;