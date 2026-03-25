import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard"

import { ThemeContext } from "../Store/ThemeProvider";
import ProductCardSkelton from "../Components/ProductCardSkelton"
import UseProductGrid from "../Hooks/UseProductGrid";
const ProductGrid = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { theme } = useContext(ThemeContext);
    const { loading, error, productData } = UseProductGrid(currentPage);

    if (loading) {
        return <ProductCardSkelton />
    }
    if (error) {
        return <p>...APi Failed</p>
    }


    let checkedBtn = "join-item btn btn-square btn-blue bg-blue-700"
    let uncheckedBtn = "join-item btn btn-square"
    const light = "flex justify-center items-center flex-col w-screen"
    const dark = "flex justify-center items-center flex-col w-screen bg-gray-500"
    return (
        <div className={theme == "light" ? light : dark}>
            <div className="flex justify-evenly min-h-screen w-screen gap-5 mt-7  flex-wrap ">
                {
                    productData.map((pObj) => (<ProductCard key={pObj.id} data={pObj} />))
                }
            </div>
            <div className="join mt-10 mb-10">
                <input
                    onClick={() => {
                        setCurrentPage(1);
                    }}
                    className={currentPage == 1 ? checkedBtn : uncheckedBtn}
                    type="radio"
                    name="options"
                    aria-label="1"

                />
                <input
                    onClick={() => {
                        setCurrentPage(2);
                    }}
                    className={currentPage == 2 ? checkedBtn : uncheckedBtn} type="radio" name="options" aria-label="2" />
                <input
                    onClick={() => {
                        setCurrentPage(3);
                    }}
                    className={currentPage == 3 ? checkedBtn : uncheckedBtn} type="radio" name="options" aria-label="3" />
                <input
                    onClick={() => {
                        setCurrentPage(4);
                    }}
                    className={currentPage == 4 ? checkedBtn : uncheckedBtn} type="radio" name="options" aria-label="4" />
            </div>
        </div>


    )
}
export default ProductGrid;