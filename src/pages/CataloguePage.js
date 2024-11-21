import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCategories} from "../app/redux/slices/categoriesSlice";


function CataloguePage() {

    const dispatch = useDispatch();
    const {categories, status, error} = useSelector((state) => state.categories);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <>
            <Breadcrumb/>
            <h1>Catalogue. Under construction. </h1>
            <aside>
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ul>
            </aside>
        </>

    )
}

export default CataloguePage;