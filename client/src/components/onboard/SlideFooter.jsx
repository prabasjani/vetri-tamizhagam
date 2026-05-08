import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { features } from "../../constants";

const SlideFooter = ({ prevSlide, nextSlide, currentIndex }) => {
  return (
    <div className="py-6 px-10 border-t border-border fixed bottom-0 left-0 w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        {features.map((feat) => (
          <span
            className={`h-2 rounded-full ${currentIndex + 1 === feat.id ? "w-6 bg-primary" : "w-2 bg-muted"} transition-all duration-300`}
            key={feat.id}
          ></span>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          className="py-2.5 px-6 rounded-md border border-primary text-xs font-semibold text-primary hover:bg-primary hover:text-white cursor-pointer transition-all duration-200"
          onClick={prevSlide}
        >
          Back
        </button>
        <button
          className="py-2.5 px-6 rounded-md border border-secondary bg-secondary/75 hover:bg-secondary text-xs font-semibold cursor-pointer flex items-center gap-1.5"
          onClick={nextSlide}
        >
          Next <MdArrowRightAlt />
        </button>
      </div>
    </div>
  );
};

export default SlideFooter;
