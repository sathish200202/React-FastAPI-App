import React from "react";
import MenPic from "../assets/men.jpg";
import WomenPic from "../assets/woomen.jpg";
import KidsPic from "../assets/kidss.jpg";
import MobilesPic from "../assets/mobile.jpg";
import LaptopPic from "../assets/laptop.jpg";
import GroceryPic from "../assets/grocery.jpg";
import FashionPic from "../assets/fashion.webp";
import HomePic from "../assets/electronics.jpeg";

const ProductNav = () => {
  return (
    <div className="mt-1 bg-white p-2 rounded-xl shadow-md">
      <ul className="flex justify-center gap-16 flex-wrap">
        {[
          { src: MenPic, alt: "Men" },
          { src: WomenPic, alt: "Women" },
          { src: KidsPic, alt: "Kids" },
          { src: MobilesPic, alt: "Mobiles" },
          { src: LaptopPic, alt: "Laptops" },
          { src: GroceryPic, alt: "Grocery" },
          { src: FashionPic, alt: "Fashion" },
          { src: HomePic, alt: "Home" },
        ].map((item, index) => (
          <li
            key={index}
            className="cursor-pointer flex flex-col items-center group"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="rounded-full w-20 h-20 transition-transform duration-300 group-hover:scale-110 shadow-md"
            />
            <span className="text-sm text-gray-700 mt-2">{item.alt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductNav;
