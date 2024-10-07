import './Header.scss';
import logo_1 from "../../assets/logo_1.png";

import SearchBlock from "./SearchBlock/SearchBlock";
import BurgerMenu from "./BurgerMenu/BurgerMenu";


function Header() {

    return (

        <header className="header__menu">
            <div className="header__menu--wrapper">
                <a aria-label="SweetHome" className="header__logo active" href="/">
                    <img src={logo_1} alt="Sweet shop" className="header__logo"></img>
                </a>

                <nav className="header-nav">
                    <ul className="header-nav__list">
                        <li className="header-nav__list-item">
                            <a href="online_store/src/components/Header/Header#"
                               className="header-nav__list-link">HOME</a>
                        </li>
                        <li className="header-nav__list-item">
                            <a href="online_store/src/components/Header/Header#"
                               className="header-nav__list-link">CATALOGUE</a>
                        </li>
                        <li className="header-nav__list-item">
                            <a href="online_store/src/components/Header/Header#"
                               className="header-nav__list-link">POPULAR</a>
                        </li>
                        <li className="header-nav__list-item">
                            <a href="online_store/src/components/Header/Header#"
                               className="header-nav__list-link">BRANDS</a>
                        </li>
                    </ul>
                </nav>

                <SearchBlock></SearchBlock>

                <div className="header__icons">
                    <a aria-label="Open profile" aria-current="page"
                       className="header__icons-profile  active" href="/">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                                stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                    <a aria-label="Open favorite" className="header__icons-favorite " href="/cabinet/favorites">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
                                stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="header__icons_favorite-counter">0</span></a>
                    <a aria-label="Open cart" className="header-icons__cart cart-icon" href="/cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                                stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                                stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                                stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="header__icons_cart-counter">0</span>
                    </a>
                </div>

                <BurgerMenu></BurgerMenu>
            </div>
            <div className="header__sale-block">
                <p>sale sale sale sale sale sale sale sale sale sale sale</p>
            </div>
        </header>
    )
}

export default Header;
