import './BurgerMenu.scss';

import {useState} from 'react';


function BurgerMenu() {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (

        <div className="burger-menu">
            <button className="burger-menu__btn" onClick={toggleMenu}>
                <svg className="burger-menu__img" width="40" height="24" viewBox="0 0 40 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="2" fill="white"/>
                    <rect y="11" width="40" height="2" fill="white"/>
                    <rect y="22" width="40" height="2" fill="white"/>
                </svg>
            </button>

            <div>
                {isMenuVisible && (
                    <div className="burger-menu__list-wrapper">
                        <ul className="burger-menu__list">
                            <li className="burger-menu__list-item">
                                <a className="burger-menu__list-link" href="">Home</a>
                            </li>
                            <li className="burger-menu__list-item">
                                <a className="burger-menu__list-link" href="">Catalogue</a>
                            </li>
                            <li className="burger-menu__list-item">
                                <a className="burger-menu__list-link" href="">Popular</a>
                            </li>
                            <li className="burger-menu__list-item">
                                <a className="burger-menu__list-link" href="">Brands</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BurgerMenu;