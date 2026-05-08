import React from "react";

import OnboardLayout from "../layout/OnboardLayout";
import { onboardingSteps } from "../constants";
import { useOnboarding } from "../context/OnboardingContext";
import OnboardSidebar from "../components/onboard/OnboardSidebar";
import OnboardFooter from "../components/onboard/OnboardFooter";

import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import Step4 from "../components/steps/Step4";
import Step5 from "../components/steps/Step5";

const Onboarding = () => {
  const { step } = useOnboarding();

  return (
    <OnboardLayout>
      <main className="flex">
        <div className="w-72 bg-primary h-screen py-10 px-7">
          <h4 className="font-ibm-mono tracking-widest text-sm text-[#ffffff80] mb-8">
            REGISTRATION
          </h4>

          <div className="">
            {onboardingSteps.map((onboarding) => (
              <OnboardSidebar onboarding={onboarding} key={onboarding.stepNo} />
            ))}
          </div>
        </div>
        <div className=" w-[calc(100vw-289px)]">
          <div className="mt-6">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}
            {step === 5 && <Step5 />}
          </div>
        </div>
      </main>
    </OnboardLayout>
  );
};

export default Onboarding;
