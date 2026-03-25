import React, {  useContext, useState } from "react";
import ChevronDown from "../Icons/ChevronDown";
import ChevronUp from "../Icons/ChevronUp";
import { ThemeContext } from "../Store/ThemeProvider";

const ProductReviews = ({ reviews }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const {theme}=useContext(ThemeContext)
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      <div className="space-y-6">
        {reviews.map((review, index) => {
          return (
            <ReviewAccordian
              review={review}
              index={index}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviews;

const ReviewAccordian = ({ review, index, setActiveIndex, activeIndex }) => {
  let { reviewerName, rating, comment } = review;
  const {theme}=useContext(ThemeContext)

  return (
    <div key={index} className={theme=="light"?"border rounded-lg p-4 bg-gray-50":"border rounded-lg p-4 bg-gray-400"}>
      <div
        onClick={() => {
          activeIndex == index ? setActiveIndex(null) : setActiveIndex(index);
        }}
        className="flex justify-between"
      >
        <div className="flex">
          <h4 className="font-semibold pr-5">{reviewerName}</h4>
          <span className="text-yellow-500">⭐ {rating}</span>
        </div>
        {index == activeIndex ? <ChevronUp /> : <ChevronDown />}
      </div>
      {index == activeIndex && <p className="text-gray-600 mt-2">{comment}</p>}
    </div>
  );
};