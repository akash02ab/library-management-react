import axios from "axios";
import { useEffect, useState } from "react";

function Categories() {
    let [loading, setLoading] = useState(true);
    let [categories, setCategories] = useState([]);
    const url = "http://localhost:8000/category";

    let getCategories = async () => {
        let response = await axios.get(url);
        console.log(response)
        setCategories(response.data);
        setLoading(false);
    };

    useEffect(() => {
        getCategories();
    }, []);
    
    return (
        <div>
            
        </div>
    )
}

export default Categories;
