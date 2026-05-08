import { useState } from "react";
import { toast } from "sonner";

import api from "../../api/client";
import { useOnboarding } from "../../context/OnboardingContext";
import OnboardFooter from "../onboard/OnboardFooter";
import ProgressBar from "../onboard/ProgressBar";

import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Step4() {
  const { step, formData, updateData, setStep } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const { identityType, identityNumber } = formData;
    try {
      setLoading(true);
      const res = await api.put("/user/onboarding", {
        step: 4,
        data: { identityType, identityNumber },
      });
      toast.success(res.data?.message || "Step 4 completed");
      setStep(5);
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
          <h5>Identity</h5>
          <h5>Step {step} of 5</h5>
        </div>

        <ProgressBar step={step} total={5} />
      </div>

      <div className="px-10 py-9">
        <div className="mb-8">
          <h5 className="text-secondary! tracking-widest uppercase!">
            STEP 0{step} - KYC Verification
          </h5>
          <h2>Identity Documents</h2>
          <p>
            Your identity will be verified against government records. Documents
            are encrypted and not stored beyond verification.
          </p>
        </div>

        <div className="p-4 w-full border border-border bg-gray-300/40 rounded-md">
          <p className="text-[13px]! text-title flex! items-center! gap-2">
            <AiOutlineExclamationCircle size={16} /> Acceptable ID proofs:
            Aadhaar Card, Voter ID, or Driving Licence.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="identity" className="form-label">
              Identity Proof <span className="form-required">*</span>
            </label>

            <select
              className="form-input"
              id="identity"
              onChange={(e) => updateData({ identityType: e.target.value })}
            >
              <option value="">Select ID</option>
              <option value="aadhaar">Aadhaar</option>
              <option value="voterId">Voter ID</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="identity-number" className="form-label">
              ID Number <span className="form-required">*</span>
            </label>

            <input
              id="identity-number"
              className="form-input"
              placeholder="ID Number"
              onChange={(e) => updateData({ identityNumber: e.target.value })}
            />
          </div>
          <OnboardFooter handleNext={handleNext} />
        </div>
      </div>
    </div>
  );
}
