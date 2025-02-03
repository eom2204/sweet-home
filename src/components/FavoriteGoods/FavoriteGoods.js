import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addFavorite, fetchFavoriteGoods,
    removeFavoriteAndSync,
} from "../../app/redux/slices/favoritesSlice";
import './FavoriteGoods.scss';


function FavoriteGoods({itemId}) {
    const dispatch = useDispatch();

    // Get the list of favorite items from Redux
    const favoriteItems = useSelector((state) => state.favorites.favoriteItems);

    // State to track whether the heart is "active" or not
    const [isHeartActive, setIsHeartActive] = useState(false);

    // Check if the item is already in favorites when the component mounts
    // (Ensures the heart's state (isHeartActive) stays synchronized with the Redux state even if the store changes.)
    useEffect(() => {
        setIsHeartActive(favoriteItems.includes(itemId));
    }, [favoriteItems, itemId]);

    // Toggle the heart state on click
    const toggleHeart = async () => {

        // Dispatch actions to Redux based on the heart's state
        if (isHeartActive) {
            dispatch(removeFavoriteAndSync(itemId)); // Removes from Redux & Backend
        } else {
            dispatch(addFavorite(itemId)); // Add to favorites in Redux
            dispatch(fetchFavoriteGoods([...favoriteItems, itemId])); // Sync with backend
        }

        setIsHeartActive((prev) => !prev); // Toggle the local heart state
    };


    return (

        <svg className={`favourite__icon-heart ${isHeartActive ? 'active' : ''}`} onClick={toggleHeart} width="24"
             height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path className="favourite__icon-heart--color"
                  d="M20.1328 5.31681L20.1332 5.31715C20.5513 5.73504 20.8829 6.23121 21.1092 6.77731C21.3355 7.32341 21.4519 7.90875 21.4519 8.49987C21.4519 9.091 21.3355 9.67633 21.1092 10.2224C20.8829 10.7685 20.5513 11.2647 20.1332 11.6826L20.133 11.6828L19.073 12.7428L12.0001 19.8157L4.92723 12.7428L3.86723 11.6828C3.02307 10.8386 2.54883 9.69369 2.54883 8.49987C2.54883 7.30606 3.02307 6.16114 3.86723 5.31698C4.71138 4.47282 5.8563 3.99858 7.05012 3.99858C8.24394 3.99858 9.38886 4.47282 10.233 5.31698L11.293 6.37698C11.6835 6.7675 12.3167 6.7675 12.7072 6.37698L13.7672 5.31698L13.7674 5.31681C14.1853 4.89873 14.6815 4.56707 15.2276 4.34079C15.7737 4.11451 16.359 3.99805 16.9501 3.99805C17.5412 3.99805 18.1266 4.11451 18.6727 4.34079C19.2188 4.56707 19.715 4.89873 20.1328 5.31681Z"
                  stroke="#1D1D1D" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}

export default FavoriteGoods;