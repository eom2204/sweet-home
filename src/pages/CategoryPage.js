import {Link, useParams} from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";


function CategoryPage() {

    const { categorySlug } = useParams();  // Extract the categorySlug from the URL
    const params = useParams();

    const categories = [
        {id: 'category_1', title: 'Category 1'},
        {id: 'category_2', title: 'Category 2'},
        {id: 'category_3', title: 'Category 3'},
    ]

    return (
        <>
            <Breadcrumb />
            <h1>Category: {categorySlug}</h1>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        <Link to={`/${category.id}`}>{category.title}</Link>
                    </li>
                    ))}
            </ul>

            {params.categorySlug}
        </>

    )
}

export default CategoryPage;