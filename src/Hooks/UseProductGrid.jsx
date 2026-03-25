import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductDataById } from "../app/ProductSlice";
import { addProductArrayByPage } from "../app/ProductSlice";

const UseProductGrid = (currentPage) => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const homePageMap = useSelector((state) => state.Product.homePageMap)
    async function getData() {
       
        let limit = 15;
        let skip = (currentPage - 1) * limit;
        console.log(" Api called for home page ", currentPage);
        try {
            let apiData = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            let jsonData = await apiData.json();
            setProductData(jsonData.products)
            dispatch(addProductArrayByPage({ pageNumber: currentPage, productArray: jsonData.products }))
            dispatch(addProductDataById(jsonData.products))
        }
        catch (err) {
            console.log(err);
            setError(true);
        }
        finally {
            setLoading(false);
        }

    }


    useEffect(function () {
        const cachedData = homePageMap[currentPage];
        if (!cachedData) {
            getData();
        } else {
            setLoading(false);
            setError(false);
            setProductData(cachedData);
        }

    }, [currentPage])

    return { loading, error, productData }
}

export default UseProductGrid;