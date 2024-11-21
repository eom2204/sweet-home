import {NavLink} from "react-router-dom";
import './MainNavigation.scss';


function MainNavigation() {

    return (
        <nav className="main-nav">
            <ul className="main-nav__list">
                <li className="main-nav__list-item">
                    <NavLink to={'/'} className={({isActive})=>`${isActive && 'active'} main-nav__list-link`} end>Home</NavLink>
                </li>
                <li className="main-nav__list-item">
                    <NavLink to={'/catalogue'}  className={({isActive})=>`${isActive && 'active'} main-nav__list-link`} end>Catalogue</NavLink>
                </li>
                <li className="main-nav__list-item">
                    <NavLink to={'/aboutUs'}
                             className={({isActive})=>`${isActive && 'active'} main-nav__list-link`} end>About Us</NavLink>
                </li>
                <li className="main-nav__list-item">
                    <NavLink to={'/delivery'}
                             className={({isActive})=>`${isActive && 'active'} main-nav__list-link`} end>Delivery</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default MainNavigation;