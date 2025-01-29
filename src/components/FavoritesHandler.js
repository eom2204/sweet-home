import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { syncFavoritesWithBackend } from '../app/redux/slices/favoritesSlice';


const FavoritesHandler = () => {
    const dispatch = useDispatch();
    const favoriteItems = useSelector((state) => state.favorites.favoriteItems);

    // Sync favorites with the backend when the favoriteItems array changes
    useEffect(() => {
        if (favoriteItems.length > 0) {
            dispatch(syncFavoritesWithBackend(favoriteItems));
        }
    }, [favoriteItems, dispatch]);

    return null; // This component handles syncing and doesn't render anything
};

export default FavoritesHandler;
