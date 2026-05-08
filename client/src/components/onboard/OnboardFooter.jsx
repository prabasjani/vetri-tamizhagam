import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";
import { useOnboarding } from "../../context/OnboardingContext";

const OnboardFooter = ({ handleNext }) => {
  const { step } = useOnboarding();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-between py-5 px-10 border-t border-border fixed bottom-0 left-0 w-[calc(100vw-289px)] ml-72.25 z-50">
        <div className="flex items-center gap-2 text-muted text-[13px] font-ibm">
          <CiLock color="green" /> Secure & Encrypted Connection
        </div>
        <button
          type="button"
          className="btn flex items-center gap-2"
          disabled={loading}
          onClick={handleNext}
        >
          {loading
            ? "Creating Account..."
            : step === 1
              ? "Continue"
              : step === 5
                ? "Finish"
                : "Next"}
          <MdArrowRightAlt />
        </button>
      </div>
    </div>
  );
};

export default OnboardFooter;
