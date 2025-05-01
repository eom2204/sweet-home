import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../app/redux/slices/categoriesSlice";
import {makeStyles} from "@mui/styles";
import {generateSlug} from "../../utils/generateSlus";
import WrapperSection from "../WrapperSection/WrapperSection";
import "./CategoriesHome.scss";


const useStyles = makeStyles((theme) => ({
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1.5fr',
        gap: '25px',
        marginBottom: '25px',
        maxHeight: '160px',
        height: 'auto',
        [theme.breakpoints.down('md')]: {
            gap: '16px',
            marginBottom: '16px',
        },
    },
    underRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '25px',
        marginBottom: {xs: '16px', sm: '16px', md: '25px'},
        maxHeight: '160px',
        height: 'auto',
        [theme.breakpoints.down('md')]: { // Apply for screens smaller than "md"
            gap: '16px',
            marginBottom: '16px',
        },
    }
}))

function CategoriesHome() {
    const cl = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {categories, status, error} = useSelector((state) => state.categories); // Listening state


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;


    // Grid 3 in a row and 2 in a row
    function splitArray(arr) {
        return arr.reduce((acu, _, index) => {
            if (index % 5 === 0) {
                acu.push(arr.slice(index, index + 3));
            } else if (index % 5 === 3) {
                acu.push(arr.slice(index, index + 2));
            }
            return acu;
        }, []);
    }

    // const categorySlug = category ? generateSlug(category) : "unknown";
    // const productSlug = name ? generateSlug(name) : "unknown";
    //
    // const handleCategoryClick = () => {
    //     navigate(`/catalogue/${categorySlug}`);
    // };

    const imagePath = process.env.REACT_APP_IMAGE_PATH;


    return (
        <WrapperSection>
            <div className="categories">
                {splitArray(categories).map((row, i) => (
                    <div key={i} className={row.length === 3 ? cl.row : cl.underRow}>
                        {row.map((item, idx) => (
                            <div key={idx} className={cl.imageWrapper}>
                                <Link
                                    to={`/catalogue/${generateSlug(item.name)}`}>
                                    <img
                                        src={`${imagePath}${item.image}`}
                                        alt={item.title}
                                        className="categories__img"/>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </WrapperSection>
    )
}

export default CategoriesHome;