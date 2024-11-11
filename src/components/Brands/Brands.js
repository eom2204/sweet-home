import {useEffect, useState} from "react";
import axios from "axios";
import {Box} from "@mui/material";


function Brands() {

    const [brands, setBrands] = useState([]);

    // Fetch brands from backend on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/brands');
                if (response && response.data) {
                    setBrands(response.data); // response is an array of brand objects
                }
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, []);

    // Check if there are any brands to display
    if (!brands.length) {
        return <p>Loading banners...</p>;
    }


    return(
        <Box sx={{textAlign:"center", marginBottom: "9.5rem"}}>
            <h1>
                Brands
            </h1>
            <Box sx={{display: "flex", flexWrap: {xs: "wrap", sm: "wrap", md: "nowrap"}, justifyContent: "space-between", gap: {md: "2.8rem"}, marginTop: "46px"}}>
                {brands.map((brand) => (
                    <Box key={brand.id} sx={{flexBasis: { xs: "50%", sm: "33.33%", md: "16.66%" }, justifyContent: "center", marginBottom: "48px"}}>
                        <img src={`http://localhost:5000/public/${brand.images}`} alt="brand"
                             style={{width: "100%", maxWidth: "152px"}}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Brands;