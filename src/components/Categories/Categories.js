import './Categories.scss';

import React, {useEffect} from "react";
import {fetchCategories} from "../../features/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1.5fr'
    },
    underRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }
}))

function Categories() {
    const cl = useStyles();

    const dispatch = useDispatch();
    const {categories, status, error} = useSelector((state) => state.categories);


    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;


    // Grid

    const images = [
        { src: '../../assets/example_image.png', title: 'Image 1' },
        { src: '../../assets/example_image.png', title: 'Image 2' },
        { src: '../../assets/example_image.png', title: 'Image 3' },
        { src: '../../assets/example_image.png', title: 'Image 4' },
        { src: '../../assets/example_image.png', title: 'Image 5' },
    ];

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


return (
    <div className="categories">
        {splitArray(images).map((row, i) => (
            <div key={i} className={row.length === 3 ? cl.row : cl.underRow}>
                {row.map((item, idx) => (
                    <div key={idx} className={cl.imageWrapper}>
                        <img src={item.src} alt={item.title} className="categories__img"/>
                        <div className="categories__img--title">{item.title}</div>
                    </div>
                ))}
            </div>
        ))}
    </div>)

    // return (
    //     <div className="categories">
    //         <ul className="categories__list">
    //             {categories.map(category => (
    //                 <li key={category.id}>{category.name}</li>
    //             ))}
    //         </ul>
    //     </div>




        // <section className="categories">
        //     <h2 className="categories__title">
        //         Catalogue
        //     </h2>
        //     <div className="categories__grid-container">
        //         <div className="categories__grid-item categories__grid-item--one">
        //             <img src={banner1} alt="image" className="categories__img"></img>
        //             <div className="categories__img--blur"></div>
        //             <div className="categories__img--title">Category 1</div>
        //             <svg className="categories__img--icon-heart" width="40" height="40" viewBox="0 0 40 40" fill="none"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <rect className="icon-background" width="40" height="40" rx="8" fill="#E0E0E0"
        //                       fillOpacity="0.5"/>
        //                 <path
        //                     d="M27.8428 12.543C25.7022 10.7188 22.5186 11.047 20.5538 13.0743L19.7842 13.8673L19.0147 13.0743C17.0538 11.047 13.8663 10.7188 11.7256 12.543C9.27251 14.6368 9.14361 18.3946 11.3389 20.6641L18.8975 28.4688C19.3858 28.9727 20.1788 28.9727 20.667 28.4688L28.2256 20.6641C30.4249 18.3946 30.296 14.6368 27.8428 12.543V12.543Z"
        //                     fill="#4F4F4F"/>
        //             </svg>
        //         </div>
        //
        //         <div className="categories__grid-item categories__grid-item--two">
        //             <img src={banner1} alt="image" className="categories__img"></img>
        //             <div className="categories__img--blur"></div>
        //             <div className="categories__img--title">Category 2</div>
        //             <svg className="categories__img--icon-heart" width="40" height="40" viewBox="0 0 40 40" fill="none"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <rect className="icon-background" width="40" height="40" rx="8" fill="#E0E0E0"
        //                       fillOpacity="0.5"/>
        //                 <path
        //                     d="M27.8428 12.543C25.7022 10.7188 22.5186 11.047 20.5538 13.0743L19.7842 13.8673L19.0147 13.0743C17.0538 11.047 13.8663 10.7188 11.7256 12.543C9.27251 14.6368 9.14361 18.3946 11.3389 20.6641L18.8975 28.4688C19.3858 28.9727 20.1788 28.9727 20.667 28.4688L28.2256 20.6641C30.4249 18.3946 30.296 14.6368 27.8428 12.543V12.543Z"
        //                     fill="#4F4F4F"/>
        //             </svg>
        //         </div>
        //
        //         <div className="categories__grid-item categories__grid-item--three">
        //             <img src={banner1} alt="image" className="categories__img"></img>
        //             <div className="categories__img--blur"></div>
        //             <div className="categories__img--title">3</div>
        //             <svg className="categories__img--icon-heart" width="40" height="40" viewBox="0 0 40 40" fill="none"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <rect className="icon-background" width="40" height="40" rx="8" fill="#E0E0E0"
        //                       fillOpacity="0.5"/>
        //                 <path
        //                     d="M27.8428 12.543C25.7022 10.7188 22.5186 11.047 20.5538 13.0743L19.7842 13.8673L19.0147 13.0743C17.0538 11.047 13.8663 10.7188 11.7256 12.543C9.27251 14.6368 9.14361 18.3946 11.3389 20.6641L18.8975 28.4688C19.3858 28.9727 20.1788 28.9727 20.667 28.4688L28.2256 20.6641C30.4249 18.3946 30.296 14.6368 27.8428 12.543V12.543Z"
        //                     fill="#4F4F4F"/>
        //             </svg>
        //         </div>
        //
        //         <div className="categories__grid-item categories__grid-item--four">
        //             <img src={banner1} alt="image" className="categories__img"></img>
        //             <div className="categories__img--blur"></div>
        //             <div className="categories__img--title">Category 1</div>
        //             <svg className="categories__img--icon-heart" width="40" height="40" viewBox="0 0 40 40" fill="none"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <rect className="icon-background" width="40" height="40" rx="8" fill="#E0E0E0"
        //                       fillOpacity="0.5"/>
        //                 <path
        //                     d="M27.8428 12.543C25.7022 10.7188 22.5186 11.047 20.5538 13.0743L19.7842 13.8673L19.0147 13.0743C17.0538 11.047 13.8663 10.7188 11.7256 12.543C9.27251 14.6368 9.14361 18.3946 11.3389 20.6641L18.8975 28.4688C19.3858 28.9727 20.1788 28.9727 20.667 28.4688L28.2256 20.6641C30.4249 18.3946 30.296 14.6368 27.8428 12.543V12.543Z"
        //                     fill="#4F4F4F"/>
        //             </svg>
        //         </div>
        //         <div className="categories__grid-item categories__grid-item--five">
        //             <img src={banner1} alt="image" className="categories__img"></img>
        //             <div className="categories__img--blur"></div>
        //             <div className="categories__img--title">Category 1</div>
        //             <svg className="categories__img--icon-heart" width="40" height="40" viewBox="0 0 40 40" fill="none"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <rect className="icon-background" width="40" height="40" rx="8" fill="#E0E0E0"
        //                       fillOpacity="0.5"/>
        //                 <path
        //                     d="M27.8428 12.543C25.7022 10.7188 22.5186 11.047 20.5538 13.0743L19.7842 13.8673L19.0147 13.0743C17.0538 11.047 13.8663 10.7188 11.7256 12.543C9.27251 14.6368 9.14361 18.3946 11.3389 20.6641L18.8975 28.4688C19.3858 28.9727 20.1788 28.9727 20.667 28.4688L28.2256 20.6641C30.4249 18.3946 30.296 14.6368 27.8428 12.543V12.543Z"
        //                     fill="#4F4F4F"/>
        //             </svg>
        //         </div>
        //
        //         <div className="categories__grid-item categories__grid-item--six">
        //             <img src={banner1} alt="image" className="categories__img"></img>
        //             <div className="categories__img--blur"></div>
        //             <div className="categories__img--title">Category 1</div>
        //             <svg className="categories__img--icon-heart" width="40" height="40" viewBox="0 0 40 40" fill="none"
        //                  xmlns="http://www.w3.org/2000/svg">
        //                 <rect className="icon-background" width="40" height="40" rx="8" fill="#E0E0E0"
        //                       fillOpacity="0.5"/>
        //                 <path
        //                     d="M27.8428 12.543C25.7022 10.7188 22.5186 11.047 20.5538 13.0743L19.7842 13.8673L19.0147 13.0743C17.0538 11.047 13.8663 10.7188 11.7256 12.543C9.27251 14.6368 9.14361 18.3946 11.3389 20.6641L18.8975 28.4688C19.3858 28.9727 20.1788 28.9727 20.667 28.4688L28.2256 20.6641C30.4249 18.3946 30.296 14.6368 27.8428 12.543V12.543Z"
        //                     fill="#4F4F4F"/>
        //             </svg>
        //         </div>
        //     </div>
        // </section>
}

export default Categories;