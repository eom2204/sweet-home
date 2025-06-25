import * as React from 'react';
import {useState} from 'react';
import {useSelector} from "react-redux";
import debounce from "lodash.debounce";
import {useNavigate} from "react-router-dom";
import './SearchBlock.scss';
import {generateSlug} from "../../../utils/generateSlus";


const SearchBlock = () => {
    // Access goods data from Redux store
    const {goods, status, error} = useSelector((state) => state.goods);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(goods);
    const [showSearchField, setShowSearchField] = useState(false);
    const navigate = useNavigate();
    const imagePath = process.env.REACT_APP_IMAGE_PATH;

    // Debounced filtering logic
    const debouncedFilter = debounce((query) => {
        const filtered = goods.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.brand.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
    }, 300); // 300ms delay

    // Immediate update for search term
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query); // Update input value immediately
        debouncedFilter(query); // Apply debounced filtering
    };

    const handleSearchClose = () => {
        setShowSearchField(false);
        setSearchTerm('');
        setFilteredItems(goods); // Reset the filtered list
    };

    const handleRedirect = (product) => {
        navigate(`/catalogue/${generateSlug(product.category)}/${generateSlug(product.name)}`);
    };


    return (
        <div className="search">
            <svg className="search__icon" width="16" height="16" viewBox="0 0 16 16" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
                    stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#FFF9F1" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round"/>
            </svg>

            <label>
                <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search..."
                    className="search__input"
                    value={searchTerm}
                    onFocus={() => setShowSearchField(true)}>
                </input>
            </label>


            {showSearchField &&
                (<div className='search__field'>

                        <div className='search__field__cards'>
                            {goods.slice(0, 3).map((product) => (
                                <div>
                                    <img
                                        src={`${imagePath}${product.images?.[0]}`}
                                        alt={product.name}
                                        className='search__field__cards-img'
                                        onClick={() => {
                                            handleRedirect(product);
                                            handleSearchClose()
                                        }}
                                    />
                                    <p className='search__field__cards-name'>{product.name}</p>
                                    <p className='search__field__cards-price'>{product.price}$</p>
                                </div>
                            ))}
                        </div>

                        {searchTerm && (
                            <ul className="search__field__list">
                                {filteredItems.length > 0 ? (
                                    filteredItems.slice(0, 9).map((item, index) => (
                                        <li className="search__field__list-item"
                                            key={index}
                                            onClick={() => {
                                                handleRedirect(item);
                                                handleSearchClose()
                                            }}>{item.name}
                                        </li>
                                    ))
                                ) : (
                                    <li>No item found</li>
                                )}
                            </ul>
                        )}

                        <div>
                            <button className='search__close-btn' onClick={handleSearchClose} type="button"
                                    aria-label="Close search">
                                <svg width="16" height="16" viewBox="0 0 10 10" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.474969 0.0794034C0.583625 -0.0264678 0.759791 -0.0264678 0.868446 0.0794034L9.91842 8.89746C10.0271 9.00333 10.0271 9.17498 9.91842 9.28085L9.52495 9.66425C9.41629 9.77012 9.24013 9.77012 9.13147 9.66425L0.0814917 0.846191C-0.027164 0.740319 -0.0271638 0.568668 0.0814919 0.462797L0.474969 0.0794034Z"
                                        fill="#A3A3A3"></path>
                                    <path
                                        d="M0.0815759 9.5372C-0.0270798 9.43133 -0.0270798 9.25968 0.0815759 9.15381L9.13155 0.335754C9.24021 0.229883 9.41638 0.229883 9.52503 0.335754L9.91851 0.719148C10.0272 0.825019 10.0272 0.99667 9.91851 1.10254L0.86853 9.9206C0.759875 10.0265 0.583709 10.0265 0.475053 9.9206L0.0815759 9.5372Z"
                                        fill="#A3A3A3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SearchBlock;