import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import localBrands from "../../data/brands.json";


function Brands() {

    const [brands, setBrands] = useState([]);

    // Fetch brands from backend on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('/api/brands');
                if (response && response.data) {
                    setBrands(response.data); // Use server data if available
                }
            } catch (error) {
                console.error('Error fetching brands; using local data:', error);
                setBrands(localBrands); // Use local JSON as fallback
            }
        };

        fetchBrands();
    }, []);

    // Check if there are any brands to display
    if (!brands.length) {
        return <p>Loading banners...</p>;
    }

    const imagePath = process.env.REACT_APP_IMAGE_PATH;

    return(
        <Box sx={{textAlign:"center", marginY: {xs: '44px', sm: '44px', md: '120px'}}}>
            <Typography variant="h3" component="h2">
                Brands
            </Typography>
            <Box sx={{display: "flex", flexWrap: {xs: "wrap", sm: "wrap", md: "nowrap"}, justifyContent: "space-between", gap: {md: "2.8rem"}, marginTop: "46px"}}>
                {brands.map((brand) => (
                    <Box key={brand.id} sx={{flexBasis: { xs: "50%", sm: "33.33%", md: "16.66%" }, justifyContent: "center", marginBottom: "48px"}}>
                        <img src={`${imagePath}${brand.images}`} alt="brand"
                             style={{width: "100%", maxWidth: "152px"}}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Brands;