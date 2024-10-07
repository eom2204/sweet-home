import './Banner.scss';

import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.png';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const banners = [
        banner1,banner2
    ];

    return (
        <Slider {...settings}>
            {banners.map((banner, index) => (
                <div key={index}>
                    <img src={banner} alt={`banner-${index}`} style={{ width: '100%', maxHeight: '560px' }} />
                </div>
            ))}
        </Slider>
    );
}

export default Banner;