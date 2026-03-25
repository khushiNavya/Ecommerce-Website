import React, { useState, useRef, useEffect } from "react";
import image1 from "../Assets/image1.webp";
import image2 from "../Assets/image2.webp";
import image3 from "../Assets/image3.webp";
import image4 from "../Assets/image4.webp";
import ArrowLeft from "../Icons/ArrowLeft";
import ArrowRight from "../Icons/ArrowRight";
import { useNavigate } from "react-router-dom";

let images = [
    { image: image1, url: "beauty" },
    { image: image2, url: "fragrances" },
    { image: image3, url: "furniture" },
    { image: image4, url: "groceries" },
];

const Carousal = () => {
    const navigation = useNavigate();
    const [activeIndex, setActiveIndex] = useState(1);
    const timerRef = useRef(null);

    function handleLeft(e) {
        e.stopPropagation();
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    }

    function handleRight(e) {
        e.stopPropagation();
        setActiveIndex((activeIndex + 1) % images.length);
    }

    function clearTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }

    function addTimer() {
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 3000);
    }

    useEffect(() => {
        clearTimer();
        addTimer();
        return clearTimer;
    }, []);

    function handleMouseEnter() {
        clearTimer();
    }

    function handleMouseLeave() {
        clearTimer();
        addTimer();
    }

    function handleClick() {
        navigation(`/category/${images[activeIndex].url}`);
    }

    return (
        <div
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="h-[45vh] w-screen relative"
        >
            <div
                onClick={(e) => handleLeft(e)}
                className="bg-white left-0 top-[20vh] h-10 w-8 flex justify-center items-center absolute ml-2 rounded-2xl"
            >
                <ArrowLeft />
            </div>

            <div className="h-full w-full">
                <img
                    className="h-full w-full object-cover"
                    src={images[activeIndex].image}
                    alt=""
                />
            </div>

            <div
                onClick={(e) => handleRight(e)}
                className="bg-white right-0 top-[20vh] h-10 w-8 flex justify-center items-center absolute mr-6 rounded-2xl"
            >
                <ArrowRight />
            </div>
        </div>
    );
};

export default Carousal;