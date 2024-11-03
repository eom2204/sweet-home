import './Footer.scss';
import logo_main from "../../assets/logo_main.svg";


function Footer() {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-container__item">
                    <img src={logo_main} alt="Sweet shop" className="footer-container__logo"></img>
                </div>
                <div className="footer-container__item">
                    <h5 className="footer-container__title">For customers:</h5>
                    <ul className="footer-container__list">
                        <li className="footer-container__list-item">
                            <a href="" className="footer-container__list-item--link">Guarantee</a>
                        </li>
                        <li className="footer-container__list-item">
                            <a href="" className="footer-container__list-item--link">Order payment</a>
                        </li>
                        <li className="footer-container__list-item">
                            <a href="" className="footer-container__list-item--link">Delivery conditions</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-container__item">
                    <h5 className="footer-container__title">Follow us:</h5>
                    <ul className="footer-container__socials">
                        <li className="footer-container__socials-item">
                            <a href="https://facebook.com" className="footer-container__list-item--link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M27 8H23.4545C21.8874 8 20.3844 8.63214 19.2762 9.75736C18.168 10.8826 17.5455 12.4087 17.5455 14V17.6H14V22.4H17.5455V32H22.2727V22.4H25.8182L27 17.6H22.2727V14C22.2727 13.6817 22.3972 13.3765 22.6189 13.1515C22.8405 12.9264 23.1411 12.8 23.4545 12.8H27V8Z"
                                        stroke="#C9CDD6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </li>
                        <li className="footer-container__socials-item">
                            <a href="https://instagram.com" className="footer-container__list-item--link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M14.2856 9.07141C11.4058 9.07141 9.07129 11.4059 9.07129 14.2857V25.7143C9.07129 28.594 11.4058 30.9286 14.2856 30.9286H25.7141C28.5939 30.9286 30.9284 28.594 30.9284 25.7143V14.2857C30.9284 11.4059 28.5939 9.07141 25.7141 9.07141H14.2856ZM8.07129 14.2857C8.07129 10.8536 10.8535 8.07141 14.2856 8.07141H25.7141C29.1462 8.07141 31.9284 10.8536 31.9284 14.2857V25.7143C31.9284 29.1463 29.1462 31.9286 25.7141 31.9286H14.2856C10.8535 31.9286 8.07129 29.1463 8.07129 25.7143V14.2857ZM20.6465 15.9229C19.7994 15.7973 18.9343 15.942 18.1741 16.3364C17.414 16.7308 16.7976 17.3549 16.4126 18.1198C16.0275 18.8848 15.8935 19.7517 16.0296 20.5971C16.1656 21.4426 16.5648 22.2237 17.1704 22.8293C17.7759 23.4348 18.557 23.834 19.4025 23.97C20.248 24.1061 21.1148 23.9721 21.8798 23.5871C22.6447 23.202 23.2688 22.5856 23.6632 21.8255C24.0576 21.0654 24.2023 20.2002 24.0767 19.3531C23.9486 18.489 23.5459 17.6891 22.9282 17.0714C22.3106 16.4537 21.5106 16.0511 20.6465 15.9229ZM17.7136 15.4488C18.6604 14.9575 19.738 14.7773 20.7932 14.9337C21.8695 15.0934 22.866 15.5949 23.6353 16.3643C24.4047 17.1337 24.9063 18.1301 25.0659 19.2064C25.2223 20.2616 25.0421 21.3392 24.5508 22.2861C24.0595 23.2329 23.2822 24.0007 22.3294 24.4803C21.3765 24.9599 20.2968 25.1268 19.2436 24.9573C18.1904 24.7879 17.2175 24.2906 16.4633 23.5364C15.709 22.7821 15.2118 21.8092 15.0423 20.756C14.8728 19.7029 15.0397 18.6231 15.5193 17.6703C15.9989 16.7174 16.7667 15.9401 17.7136 15.4488ZM26.2856 13.2143C26.0094 13.2143 25.7856 13.4381 25.7856 13.7143C25.7856 13.9904 26.0094 14.2143 26.2856 14.2143H26.2965C26.5726 14.2143 26.7965 13.9904 26.7965 13.7143C26.7965 13.4381 26.5726 13.2143 26.2965 13.2143H26.2856Z"
                                          fill="#C9CDD6"/>
                                </svg>
                            </a>
                        </li>
                        <li className="footer-container__socials-item">
                            <a href="https://linkedin.com" className="footer-container__list-item--link">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M9.09521 11C9.09521 9.94687 9.94109 9.09998 10.9762 9.09998C12.0112 9.09998 12.8571 9.94687 12.8571 11C12.8571 12.0531 12.0112 12.9 10.9762 12.9C9.94109 12.9 9.09521 12.0531 9.09521 11ZM10.9762 8.09998C9.38131 8.09998 8.09521 9.40211 8.09521 11C8.09521 12.5978 9.38131 13.9 10.9762 13.9C12.571 13.9 13.8571 12.5978 13.8571 11C13.8571 9.40211 12.571 8.09998 10.9762 8.09998ZM25.2619 16.3C23.5014 16.3 21.8122 17.0049 20.5661 18.2609C19.3199 19.5171 18.619 21.2217 18.619 23V30.9H22.3809V23C22.3809 22.2321 22.6835 21.4949 23.2233 20.9508C23.7633 20.4065 24.4965 20.1 25.2619 20.1C26.0273 20.1 26.7605 20.4065 27.3004 20.9508C27.8403 21.4949 28.1428 22.2321 28.1428 23V30.9H31.9047V23C31.9047 21.2217 31.2039 19.5171 29.9577 18.2609C28.7116 17.0049 27.0224 16.3 25.2619 16.3ZM25.2619 15.3C23.2336 15.3 21.2892 16.1122 19.8562 17.5567C18.4233 19.001 17.619 20.9591 17.619 23V31.4C17.619 31.6761 17.8429 31.9 18.119 31.9H22.8809C23.1571 31.9 23.3809 31.6761 23.3809 31.4V23C23.3809 22.4948 23.5801 22.0111 23.9333 21.6551C24.2863 21.2992 24.7643 21.1 25.2619 21.1C25.7594 21.1 26.2374 21.2992 26.5905 21.6551C26.9437 22.0111 27.1428 22.4948 27.1428 23V31.4C27.1428 31.6761 27.3667 31.9 27.6428 31.9H32.4047C32.6809 31.9 32.9047 31.6761 32.9047 31.4V23C32.9047 20.9591 32.1005 19.001 30.6676 17.5567C29.2346 16.1122 27.2902 15.3 25.2619 15.3ZM8.09521 17C8.09521 16.7238 8.31907 16.5 8.59521 16.5H13.3571C13.6333 16.5 13.8571 16.7238 13.8571 17V31.4C13.8571 31.6761 13.6333 31.9 13.3571 31.9H8.59521C8.31907 31.9 8.09521 31.6761 8.09521 31.4V17ZM9.09521 17.5V30.9H12.8571V17.5H9.09521Z"
                                          fill="#C9CDD6"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-container__item">
                    <h5 className="footer-container__title">Location:</h5>
                    <ul className="footer-container__list">
                        <li className="footer-container__list-item">Lviv, Tsentralna street, 19</li>
                        <li className="footer-container__list-item">Kyiv, Taras Shevchenko square, 11/2</li>
                    </ul>
                </div>
            </div>
            <div className="footer__copyright">
                <p className="footer__copyright--text">Sweet Home &copy; 2024 All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;