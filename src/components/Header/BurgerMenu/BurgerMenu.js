import {useState} from 'react';
import {Link} from "react-router-dom";
import './BurgerMenu.scss';


function BurgerMenu() {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    return (

        <div className="burger-menu">
            <button className="burger-menu__btn" onClick={toggleMenu}>
                {isMenuVisible ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3L12.8995 12.8995" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M3 13.0001L12.8995 3.10057" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M8 8H8.0001" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"/>
                    </svg>

                ) : (< svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12H15" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M1 8L15 8" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M1 4H15" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"/>
                </svg>)
                }
            </button>

            <div>
                {isMenuVisible && (
                    <div className="burger-menu__list-wrapper">
                        <ul className="burger-menu__list">
                            <li className="burger-menu__list-item" onClick={toggleMenu}>
                                <Link className="burger-menu__list-link" to="/">Home</Link>
                            </li>
                            <li className="burger-menu__list-item" onClick={toggleMenu}>
                                <Link className="burger-menu__list-link" to="/catalogue">Catalogue</Link>
                            </li>
                            <li className="burger-menu__list-item" onClick={toggleMenu}>
                                <Link className="burger-menu__list-link" to="/aboutUs">About us</Link>
                            </li>
                            <li className="burger-menu__list-item" onClick={toggleMenu}>
                                <Link className="burger-menu__list-link" to="/delivery">Delivery</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BurgerMenu;