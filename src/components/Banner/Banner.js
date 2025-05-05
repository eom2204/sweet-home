import {useEffect, useState} from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import localBanners from '../../data/banner.json'; // Import the local JSON file
import './Banner.scss';


// Custom Next and Previous Arrows
const CustomNextArrow = ({onClick}) => (
    <div className="banner-slider__next-arrow" onClick={onClick}>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="#422F21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const CustomPrevArrow = ({onClick}) => (
    <div className="banner-slider__prev-arrow" onClick={onClick}>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13L1 7L7 1" stroke="#422F21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

//Slider settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <CustomNextArrow/>,
    prevArrow: <CustomPrevArrow/>,
    dotsClass: "banner-slider__dots",
};


function Banner() {
    const [banners, setBanners] = useState([]);

    // Fetch banners from backend on component mount or fallback to local data
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('/api/banner'); // Adjust URL to your endpoint
                if (response && response.data) {
                    setBanners(response.data); // Use server data if available
                }
            } catch (error) {
                console.error('Error fetching banners; using local data:', error);
                setBanners(localBanners); // Use local JSON as fallback
            }
        };

        fetchBanners();
    }, []);

    // Check if there are any banners to display
    if (!banners.length) {
        return <p>Loading banners...</p>;
    }

    const imagePath = process.env.REACT_APP_IMAGE_PATH;

    return (
        <Slider {...settings}>
            {banners.slice(0, 4).map((banner, index) => (
                <div className="banner" key={banner.id}>
                    <h3
                        className={`banner__title ${index === 3 ? 'banner__title--special' : ''}`}
                        dangerouslySetInnerHTML={{__html: banner.title}}
                    ></h3>
                    <img className="banner__image"
                         src={`${imagePath}${banner.img}`}
                         alt="banner"
                    />
                </div>
            ))}
        </Slider>

    );
}

export default Banner;
