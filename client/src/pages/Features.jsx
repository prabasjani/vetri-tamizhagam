import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { features } from "../constants";
import FeatureImg from "../assets/tvk8.webp";
import OnboardLayout from "../layout/OnboardLayout";
import SlideFooter from "../components/onboard/SlideFooter";
import SlideCard from "../components/onboard/SlideCard";

import { MdArrowRightAlt } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Features = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? features.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === features.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slide = features[currentIndex];

  const navigate = useNavigate();

  return (
    <OnboardLayout>
      <main>
        <div className="py-5 flex justify-end">
          <button
            className="text-[13px] font-semibold text-muted py-2.5 px-6 flex items-center gap-1.5 cursor-pointer hover:text-title"
            onClick={() => navigate("/onboarding")}
          >
            Skip introduction <MdArrowRightAlt />
          </button>
        </div>

        <div className="px-10 flex items-center justify-center">
          <div className="">
            <img
              src={FeatureImg}
              alt="Landing_image"
              className="w-100 overflow-hidden"
            />
          </div>

          <div className="w-2xl h-105 ">
            <SlideCard slide={slide} />
          </div>
        </div>

        <SlideFooter
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          currentIndex={currentIndex}
        />
      </main>
    </OnboardLayout>
  );
};

export default Features;
