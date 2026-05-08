import { useState } from "react";
import { toast } from "sonner";

import { useOnboarding } from "../../context/OnboardingContext";
import api from "../../api/client";
import ProgressBar from "../onboard/ProgressBar";
import OnboardFooter from "../onboard/OnboardFooter";

export default function Step2() {
  const { step, formData, updateData, setStep } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const { fullname, gender, dob } = formData;
    try {
      setLoading(true);
      const res = await api.put("/user/onboarding", {
        step: 2,
        data: { fullname, gender, dob },
      });
      toast.success(res.data?.message || "Step 2 completed");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-10 pt-7 w-full">
        <div className="flex items-center justify-between">
          <h5>Personal Info</h5>
          <h5>Step {step} of 5</h5>
        </div>

        <ProgressBar step={step} total={5} />
      </div>

      <div className="px-10 py-9">
        <div className="mb-8">
          <h5 className="text-secondary! tracking-widest uppercase!">
            STEP 01 - Basic Details
          </h5>
          <h2>Personal Information</h2>
          <p>
            Please enter your legal name as it appears on your official
            government documents.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullname" className="form-label">
              Full Name (as per Aadhaar){" "}
              <span className="form-required">*</span>
            </label>

            <input
              type="text"
              id="fullname"
              placeholder="E.g... Prabanjan Annamalai"
              className="form-input"
              value={formData.fullname}
              onChange={(e) => updateData({ fullname: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="dob" className="form-label">
              Date of Birth <span className="form-required">*</span>
            </label>

            <input
              type="date"
              id="dob"
              className="form-input"
              value={formData.dob}
              onChange={(e) => updateData({ dob: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="gender" className="form-label">
              Gender <span className="form-required">*</span>
            </label>

            <select
              className="form-input"
              id="gender"
              value={formData.gender}
              onChange={(e) => updateData({ gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <OnboardFooter handleNext={handleNext} />
        </div>
      </div>
    </div>
  );
}
