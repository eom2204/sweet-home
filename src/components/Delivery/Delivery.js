import * as React from 'react';
import {useMediaQuery} from "@mui/system";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import deliveryImgLarge from '../../assets/deliveryPage_img_large.png';
import deliveryImgSmall from '../../assets/deliveryPage_img_small.png';
import './Delivery.scss';


function Delivery(props) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Typography component="h2" variant="h2">Delivery</Typography>
            {!isSmallScreen && (
                <img src={deliveryImgLarge} alt='Delivery Terms' className='delivery_img'/>
            )}

            <div className='delivery_accordion'>
                <Accordion className='delivery_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">The delivery time
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component='p' variant='body1'>
                            <p className='delivery_accordion_paragraph'>
                                The delivery time of an online order from the moment of its creation is 10-12 working
                                days.</p>

                            <p>
                                When the shipping company receives your order, you will receive a confirmation text
                                message or an in-app notification. The text message also includes contact information
                                for the shipping company and an Express Waybill (EW) number (this service helps you find out
                                where your shipment is now). The courier will call you 15 minutes before delivery.</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='delivery_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">Track order</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component='p' variant='body1' sx={{
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                        }}>
                            <p className='delivery_accordion_paragraph'>You can track your order on the carrier's website:</p>

                            <p className='delivery_accordion_paragraph'>Nova poshta - https://novaposhta.ua/tracking</p>

                            <p className='delivery_accordion_paragraph'>Ukrposhta - https://track.ukrposhta.ua/tracking_UA.html</p>

                            <p className='delivery_accordion_paragraph'>This service will help you find out where your shipment is now. Write the number of the
                                express waybill and get information about the shipment.</p>

                            <p className='delivery_accordion_paragraph'>Please note that parcel tracking will be available after the order passes customs
                                control, which is why the track number does not work for the first few days after the
                                order is
                                shipped from the international warehouse.</p>

                            <p>When the online order is delivered to the carrier's branch, the cargo storage period is 5
                                days.</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='delivery_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">Support</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component='p' variant='body1'>
                            <p className='delivery_accordion_paragraph'>If you have any questions, please contact the Customer Service Department.</p>

                            <p>We draw your attention to the fact that when ordering goods in the retail chain of Sweet
                                Home stores, the delivery terms differ from online orders. The delivery service is
                                performed
                                according to the individual schedule of each store. Details can be found when placing an
                                order in a physical Sweet Home store. If the product is not available in the store, the
                                estimated date of its arrival at the store warehouse is fixed in the receipt itself at
                                the time of purchase.</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='delivery_accordion_head'>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="h3" variant="h3">Delivery regions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography component='p' variant='body1'>
                            <p className='delivery_accordion_paragraph'>Delivery regions Vinnytsia, Ivano-Frankivsk, Lviv, Ternopil, Volyn, Poltava, Cherkasy,
                                Zhytomyr, Kyiv, Kyiv, Odessa, Khmelnytskyi, Zakarpattia, Kropyvnytskii, Rivne,
                                Chernivtsi.</p>

                            <p className='delivery_accordion_paragraph'>Please note that if the order amount exceeds the equivalent of 150 euros (including
                                shipping and delivery costs), the cost of the parcel upon receipt will depend on the
                                additional
                                payment of tax.</p>

                            <p className='delivery_accordion_paragraph'>Unfortunately, delivery to retail stores is not available. We apologize for
                                the inconvenience. The possibility of trying on the item is not provided. Partial
                                redemption of items from the order is not possible.</p>

                            <p>If the order cannot be delivered to the specified address the first time, the courier
                                will try to do it again. If the parcel is not
                                delivered on the second attempt, it is returned to the online store.</p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            {isSmallScreen && (
                <img src={deliveryImgSmall} alt='About Us' className='about_img'/>
            )}
        </>
    )
}

export default Delivery;