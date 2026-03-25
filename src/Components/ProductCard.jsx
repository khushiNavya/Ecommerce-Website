import React, { useContext } from "react";
import StarIcons from "../Icons/StarIcons";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Store/ThemeProvider";
import Heart from "../Icons/Heart";
// import UseIsProductInWishlist from "../Hooks/UseIsProductInWishlist";
import UseWishlistproduct from "../Hooks/UseWishlistproduct";
const ProductCard = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const { title, price, discountPercentage, rating, brand, thumbnail, id } = data;
    const { isProductInWishlist, handleWishlist } = UseWishlistproduct(data);
    const light =
        "w-[20rem] h-[40vh] bg-gray-100 relative rounded-xl flex  items-center flex-col justify-start  overflow-hidden p-2";
    const dark =
        "w-[20rem] h-[40vh] bg-gray-400 relative rounded-xl flex  items-center flex-col justify-start  overflow-hidden p-2";
    return (

        <Link to={`/products/${id}`} className={theme == "light" ? light : dark}>
            <div
                onClick={(e) => {
                    // e.stopPropagation();
                    e.preventDefault()
                    handleWishlist();
                }}
                className="absolute right-3 top-3"
            >
                <Heart fill={isProductInWishlist ? "red" : "#A9A9A9"} />
            </div>
            <img
                src={thumbnail}
                className={
                    theme == "light"
                        ? "h-[70%] bg-white w-full rounded-xl"
                        : "h-[70%] bg-gray-300 w-full rounded-xl"
                }

            />

            <div className="w-full ">
                <p className={
                    theme == "light"
                        ? "text-xs pt-2 text-gray-400 min-h-6"
                        : "text-xs pt-2 text-white min-h-6"
                }>{brand}</p>
                <p className=" text-[15px]  text-black font-bold  overflow-hidden max-w-fit text-ellipsis whitespace-nowrap">
                    {title}
                </p>
                <div className="flex justify-start">
                    <p className="text-green-500 text-[13px] ">
                        {price}$
                    </p>


                    <p className="text-red-600 line-through ml-4 text-[13px]">
                        {discountPercentage}$
                    </p>
                </div>
                <div className="text-yellow-300 flex items-center">
                    <StarIcons />

                    <p className=" ml-1 text-[13px]">{rating}</p>
                </div>
                

            </div>
        </Link>


    )
}
export default ProductCard;