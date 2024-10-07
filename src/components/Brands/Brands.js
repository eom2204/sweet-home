import './Brands.scss';

import logo_1 from '../../assets/logo_1.png'

function Brands() {

    return(
        <section className="brands">
            <h2 className="brands__title">
                Brands
            </h2>
                <ul className="brands__list">
                    <li className="brands__list-item"><a className="brands__list-link" href=""><img className="brands__list-image" src={logo_1} alt=""/></a></li>
                    <li className="brands__list-item"><a className="brands__list-link" href=""><img className="brands__list-image" src={logo_1} alt=""/></a></li>
                    <li className="brands__list-item"><a className="brands__list-link" href=""><img className="brands__list-image" src={logo_1} alt=""/></a></li>
                    <li className="brands__list-item"><a className="brands__list-link" href=""><img className="brands__list-image" src={logo_1} alt=""/></a></li>
                    <li className="brands__list-item"><a className="brands__list-link" href=""><img className="brands__list-image" src={logo_1} alt=""/></a></li>
                    <li className="brands__list-item"><a className="brands__list-link" href=""><img className="brands__list-image" src={logo_1} alt=""/></a></li>
                </ul>
        </section>
    )
}

export default Brands;