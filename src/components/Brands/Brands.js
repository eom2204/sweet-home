

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
        <Box sx={{textAlign:"center", paddingX:"5.25rem", marginBottom: "9.5rem"}}>
            <h1>
                Brands
            </h1>
            <Box sx={{display: "flex", justifyContent: "space-between", gap: "3.8rem", marginTop: "46px"}}>
                {brands.map((brand) => (
                    <Box key={brand.id}>
                        <img src={`http://localhost:5000/public/${brand.images}`} alt="brand"
                             style={{width: '100%'}}/>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Brands;