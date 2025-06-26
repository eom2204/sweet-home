import * as React from 'react';
import {useMediaQuery} from "@mui/system";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import aboutUsImgLarge from '../../assets/aboutUs_img_large.png';
import aboutUsImgSmall from '../../assets/aboutUs_img_small.png';
import './AboutUs.scss';


function AboutUs(props) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Typography component="h2" variant="h2">About us</Typography>
            {!isSmallScreen && (
                <img src={aboutUsImgLarge} alt='About Us' className='about_img'/>
            )}

            <div className='about_accordion'>
                <Accordion className='about_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">The widest range of beauty products
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            More than 4,500 brands and 249,000 products — our team knows what is relevant today and the
                            appearance of which brands will cause a stir among real connoisseurs of cosmetics and
                            perfumes. World bestsellers and novelties, exclusive premieres, rare fragrances, brands from
                            different parts of the planet — Sweet Home's range is constantly expanding, providing
                            opportunities for experimentation and making the boldest ideas a reality.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='about_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">Official partnership with top brands</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Official partnership with top brands Sweet Home is authorized and works under direct
                            contracts with the largest luxe brands: YSL, Lancome, Biotherm, Armani, Prada, Valentino,
                            Estee Lauder, Clinique... We are proud to cooperate with official suppliers and offer only
                            original products, unique collections and additional benefits from brands.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='about_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">Shopping with comfort</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Shopping with comfort Have you noticed that often the products you need are located on the
                            shopping card in the most inconvenient way? Your favorite fragrance is in one store, pillows
                            are in a separate chain of stores, children's goods are exclusively in children's stores. We
                            believe that tiring marathons to replenish stocks and long searches for good deals should
                            put an end to it! Sweet Home has collected in its assortment all categories, home goods from
                            the most remote corners of the planet and in any variations — from mass market to luxury. A
                            modern system of price control, monitoring of current novelties and mega-convenient delivery
                            will allow you to enjoy shopping, saving time for more important things. Over the years of
                            its existence, Sweet Home has become synonymous with comfortable shopping, we do not stop
                            and improve our service every day! Join Sweet Home and create a cozy story with us!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            {isSmallScreen && (
                <img src={aboutUsImgSmall} alt='About Us' className='about_img'/>
            )}
        </>
    )
}

export default AboutUs;