import React from "react";
import { useOnboarding } from "../../context/OnboardingContext";

const OnboardSidebar = ({ onboarding }) => {
  const { stepNo, stepLabel, subLabel } = onboarding || {};
  const { step } = useOnboarding();
  return (
    <div className="flex items-center gap-4 pb-7">
      <div
        className={`w-8 h-8 rounded-full border border-[#ffffff80] flex items-center justify-center ${stepNo === step && "bg-secondary transition-all duration-300"}`}
      >
        <span
          className={`text-[#ffffff80] font-semibold text-[13px] ${stepNo === step && "text-primary!"}`}
        >
          {stepNo}
        </span>
      </div>
      <div className="">
        <h4
          className={`font-ibm font-semibold text-[13px] ${stepNo === step ? "text-white" : "text-[#ffffff80]"} `}
        >
          {stepLabel}
        </h4>
        <p
          className={`font-ibm-mono! text-[11px]! text-[#ffffff80]! ${stepNo === step && "text-white"}`}
        >
          {subLabel}
        </p>
      </div>
    </div>
  );
};

export default OnboardSidebar;
