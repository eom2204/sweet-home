import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../app/redux/slices/categoriesSlice";
import {makeStyles} from "@mui/styles";
import WrapperSection from "../WrapperSection/WrapperSection";


const useStyles = makeStyles((theme) => ({
    listElement: {
        fontFamily: "Helvetica",
        fontSize: "24px",
        fontWeight: "400",
        lineHeight: "29.64px",
        letterSpacing: "1px",
        textAlign: "left",
        marginBottom: "16px",
        cursor: "pointer",
    },
    groupList: {
        listStyle: "none",
        marginBottom: "16px",
    },
    groupListElement: {
        fontFamily: "Helvetica",
        fontSize: "16px",
        fontWeight: "300",
        lineHeight: "20px",
        letterSpacing: "1px",
        textAlign: "left",
        cursor: "pointer",
    },
}));


function Categories({
                        displayMode,
                        setSelectedCategory,
                        setSelectedGroup,
                        selectedCategory,
                    }) {
    const cl = useStyles();
    const dispatch = useDispatch();

    const {categories, status, error} = useSelector(
        (state) => state.categories
    );


    const [selectedGroup, setSelectedLocalGroup] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategories());
        }
    }, [status, dispatch]);

    if (status === "loading") return <div>Loading...</div>;
    if (status === "failed") return <div>Error: {error}</div>;

    const handleCategoryClick = (categoryId) => {
        const newCategory = categoryId === selectedCategory ? null : categoryId;
        setSelectedCategory(newCategory);
        setSelectedGroup(null); // Reset selected group when category changes
    };

    const handleGroupClick = (groupId) => {
        const newGroup = groupId === selectedGroup ? null : groupId;
        setSelectedLocalGroup(newGroup);
        setSelectedGroup(newGroup);
    };


    return (
        <WrapperSection>
            <div className="categories">
                    <ul>
                        {categories
                            .slice()
                            .sort((a, b) => a.id - b.id)
                            .map((category) => (
                                <li key={category.id}>
                                    <div
                                        className={`${cl.listElement} ${
                                            selectedCategory === category.id ? "active" : ""
                                        }`}
                                        onClick={() => handleCategoryClick(category.id)}
                                    >
                                        {category.name}
                                    </div>
                                    {selectedCategory === category.id && category.groups && (
                                        <ul className={cl.groupList}>
                                            {category.groups.map((group) => (
                                                <li key={group.id}>
                                                    <div
                                                        className={`${cl.groupListElement} ${
                                                            selectedGroup === group.id ? "active" : ""
                                                        }`}
                                                        onClick={() => handleGroupClick(group.id)}
                                                    >
                                                        {group.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                    </ul>
            </div>
        </WrapperSection>
    );
}

export default Categories;
