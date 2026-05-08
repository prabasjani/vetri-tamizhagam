import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useOnboarding } from "../../context/OnboardingContext";
import ProgressBar from "../onboard/ProgressBar";
import OnboardFooter from "../onboard/OnboardFooter";
import PopupModel from "../onboard/PopupModel";
import api from "../../api/client";

export default function Step5() {
  const { step, formData, updateData, setStep } = useOnboarding();
  const [toggleModal, setToggleModal] = useState(false);
  const navigate = useNavigate();

  const interestsList = [
    "education",
    "health",
    "transport",
    "corruption",
    "infrastructure",
    "employment",
    "agriculture",
  ];

  const toggleInterest = (item) => {
    const exists = formData.interests.includes(item);

    if (exists) {
      updateData({
        interests: formData.interests.filter((i) => i !== item),
      });
    } else {
      updateData({
        interests: [...formData.interests, item],
      });
    }
  };

  const handleComplete = async () => {
    try {
      await api.put("/user/onboarding", {
        step: 5,
        data: { interests: formData.interests },
      });
      await api.post("/user/complete-onboarding");
      toast.success("Onboarding completed");
      setToggleModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error completing onboarding");
    }
  };

  return (
    <div>
      <div className="px-10 pt-7 w-full">
        <div className="flex items-center justify-between">
          <h5>Interests</h5>
          <h5>Step {step} of 5</h5>
        </div>

        <ProgressBar step={step} total={5} />
      </div>

      <div className="px-10 py-9">
        <div className="mb-8">
          <h5 className="text-secondary! tracking-widest uppercase!">
            STEP 0{step} - Interests
          </h5>
          <h2>Personal Interests</h2>
          <p>Choose your interest to develop our state TN.</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          {interestsList.map((item) => (
            <button
              key={item}
              onClick={() => toggleInterest(item)}
              className={`px-3 py-2 border border-border rounded-md cursor-pointer hover:border-primary-light transition-all duration-300 ${
                formData.interests.includes(item) ? "bg-primary text-white" : ""
              }`}
            >
              {item?.toUpperCase()}
            </button>
          ))}
        </div>

        <OnboardFooter handleNext={handleComplete} />
      </div>

      {toggleModal && <PopupModel setToggleModal={setToggleModal} />}
    </div>
  );
}
