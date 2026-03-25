import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCategoryProductsData } from "../app/ProductSlice";

const UseProductCategory = (category) => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
   
    const categoryMap = useSelector((state) => state.Product.categoryMap);
    async function getData() {
        try {
            console.log("Api caleld ", category);
            let apiData = await fetch(
                `https://dummyjson.com/products/category/${category}`,
            );
            let jsonData = await apiData.json();
            setProductData(jsonData.products);
            dispatch(
                addCategoryProductsData({
                    category: category,
                    productArray: jsonData.products,
                }),
            );
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const cacheData = categoryMap[category];
        if (cacheData) {
            setLoading(false);
            setProductData(cacheData);
        } else {
            getData();
        }
    }, []);
    return { productData, loading };
};

export default UseProductCategory;