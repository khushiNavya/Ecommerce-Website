import React from "react";
import { useSelector } from "react-redux";

const UseIsProductInWishlist = (id) => {
  const wishlistData = useSelector((store) => store.Product.wishlistData);
  return wishlistData[id] ? true : false;
};

export default UseIsProductInWishlist;