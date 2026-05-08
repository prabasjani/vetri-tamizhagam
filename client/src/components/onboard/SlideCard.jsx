import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SlideCard = ({ slide }) => {
  return (
    <div className="p-10 h-full w-full transition-all duration-500">
      <h1 className="text-5xl text-primary-light/75 font-garamond mb-6">
        {slide.title}
      </h1>
      <p className="max-w-lg leading-8">{slide.desc}</p>
      <div className="mt-6">
        {slide.points.map((point) => (
          <p
            className="text-title! text-base! mb-4 flex items-center gap-2.5"
            key={point}
          >
            <IoIosCheckmarkCircle color="green" size={24} />
            {point}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SlideCard;
