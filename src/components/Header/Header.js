import './Header.scss';
import logo_main from "../../assets/logo_main.svg";

import BurgerMenu from "./BurgerMenu/BurgerMenu";
import MainNavigation from "./MainNavigation/MainNavigation";
import SearchBlock from "./SearchBlock/SearchBlock";
import {Link} from "react-router-dom";


function Header() {

    return (

        <header className="header__menu">
            <div className="header__menu--wrapper">
                <a aria-label="SweetHome" className="header__logo active" href="/">
                    <img src={logo_main} alt="Sweet home" className="header__logo"></img>
                </a>

                <MainNavigation/>

                <SearchBlock/>

                <div className="header__icons">
                    <Link to={"/login"} aria-label="Open profile" aria-current="page"
                          className="header__icons-profile  active">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Feather / other / person / user">
                                <path id="Vector"
                                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                      stroke="#F6F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Vector_2"
                                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                      stroke="#F6F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                    </Link>
                    <Link aria-label="Open favorite" className="header__icons-favorite " to="/profile/favourites">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Feather / action / main / heart">
                                <path id="Vector"
                                      d="M20.1328 5.31681L20.1332 5.31715C20.5513 5.73504 20.8829 6.23121 21.1092 6.77731C21.3355 7.32341 21.4519 7.90875 21.4519 8.49987C21.4519 9.091 21.3355 9.67633 21.1092 10.2224C20.8829 10.7685 20.5513 11.2647 20.1332 11.6826L20.133 11.6828L19.073 12.7428L12.0001 19.8157L4.92723 12.7428L3.86723 11.6828C3.02307 10.8386 2.54883 9.69369 2.54883 8.49987C2.54883 7.30606 3.02307 6.16114 3.86723 5.31698C4.71138 4.47282 5.8563 3.99858 7.05012 3.99858C8.24394 3.99858 9.38886 4.47282 10.233 5.31698L11.293 6.37698C11.6835 6.7675 12.3167 6.7675 12.7072 6.37698L13.7672 5.31698L13.7674 5.31681C14.1853 4.89873 14.6815 4.56707 15.2276 4.34079C15.7737 4.11451 16.359 3.99805 16.9501 3.99805C17.5412 3.99805 18.1266 4.11451 18.6727 4.34079C19.2188 4.56707 19.715 4.89873 20.1328 5.31681Z"
                                      stroke="#F6F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                        <span className="header__icons_favorite-counter">0</span>
                    </Link>
                    <Link aria-label="Open cart" className="header-icons__cart cart-icon" to="/profile/cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Feather / other / shop / shopping cart">
                                <path id="Vector"
                                      d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                                      stroke="#F6F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Vector_2"
                                      d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                                      stroke="#F6F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path id="Vector_3"
                                      d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                                      stroke="#F6F1EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                        <span className="header__icons_cart-counter">0</span>
                    </Link>
                </div>

                <BurgerMenu/>

            </div>
            <div className="header__sale">
                <p className="header__sale-text">OCTOBER SALE -50% FOR PILLOWS, CANDLES AND VASES</p>
            </div>
        </header>
    )
}

export default Header;
