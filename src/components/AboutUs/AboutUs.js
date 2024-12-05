import './AboutUs.scss';

import qualityGoods_img from '../../assets/ok_img.png';
import fastDelivery_img from '../../assets/fastDelivery_img.png';
import currentOffers_img from '../../assets/currentOffers_img.png';
import trustedPartner_img from '../../assets/trustedPartner_img.png';
import {Link} from "react-router-dom";


function AboutUs() {

    return (
        <section className="about">
            <h2 className="about__title">About us</h2>
            <div className="">
                <ul className="about-container">
                    <li className="about-container__item">
                        <a href="" className="about-container__link">
                            <img src={qualityGoods_img} alt="" className="about-container__img"/>
                            <p className="about-container__title">Quality goods</p>
                        </a>
                    </li>
                    <li className="about-container__item">
                        <Link to="/delivery" className="about-container__link">
                            <img src={fastDelivery_img} alt="" className="about-container__img"/>
                            <p className="about-container__title">Fast delivery</p>
                        </Link>
                    </li>
                    <li className="about-container__item">
                        <a href="" className="about-container__link">
                            <img src={currentOffers_img} alt="" className="about-container__img"/>
                            <p className="about-container__title">Current offers</p>
                        </a>
                    </li>
                    <li className="about-container__item">
                        <a href="" className="about-container__link">
                            <img src={trustedPartner_img} alt="" className="about-container__img"/>
                            <p className="about-container__title">Trusted partners</p>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default AboutUs;