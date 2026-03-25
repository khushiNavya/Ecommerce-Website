import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { addProductDataById } from "../app/ProductSlice";
import { useState, useEffect } from "react";

const UseGetProductById = (id) => {
    const ProductDataMap = useSelector((state) => state.Product.ProductDataMap);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    async function getData() {
        try {
            let apiData = await fetch(`https://dummyjson.com/products/${id}`);
            let jsonData = await apiData.json();
            setProductData(jsonData);
            dispatch(addProductDataById([jsonData]));// saving the data in redux store 

        } catch (err) {
            setError({ msg: "Something went wrong!", err });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (id) {

            const cacheData = ProductDataMap[id];

            if (cacheData) {
                setLoading(false);
                setProductData(cacheData);
                setSelectedImage(cacheData.thumbnail);
            } else {
                getData();
            }
        } else {
            setError("Product Id not found");
            setLoading(false);
        }
    }, [id]);

    return { loading, error, productData };
}

export default UseGetProductById;