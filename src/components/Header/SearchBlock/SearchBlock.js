import './SearchBlock.scss';

import {useState} from 'react';


const items = [
    'Living Room Sofa',
    'Dining Table',
    'Table Lamp',
    'Office Chair',
    'Kitchen Appliances',
    'Home Decor Art',
    'Garden Furniture',
];

const SearchBlock = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);
        console.log('query:', query);

        // Filter items based on the search term
        const filtered = items.filter(item => item.toLowerCase().includes(query));
        setFilteredItems(filtered);
        console.log('filtered:', filtered);
    };

    const clearSearch = () => {
        setSearchTerm('');
    }

    return (

        <div className="search">
            <div className="search-wrapper">
                <svg className="search__icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.9999 21L16.6499 16.65" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>

                <label>
                    <input onChange={handleSearch} type="text" placeholder="Search..." className="search__input"
                           value={searchTerm}></input>
                </label>

                <button className="search__clear-btn " onClick={clearSearch} type="button" aria-label="Clear search">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
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

            <button type="button" className="search__mobile-btn" aria-label="Open search">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                            stroke="#222133" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.9999 21L16.6499 16.65" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>

            {searchTerm && (
            <div className="search__list-wrapper">
                <ul className="search__list">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <li className="search__list-item" key={index}>
                                <a className="search__list-link" href="#">{item}</a>
                            </li>
                        ))
                    ) : (
                        <li>No item found</li>
                    )}
                </ul>
            </div>)}
        </div>
    )
}


export default SearchBlock;