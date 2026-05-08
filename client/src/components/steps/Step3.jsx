import { useState } from "react";
import { toast } from "sonner";

import { useOnboarding } from "../../context/OnboardingContext";
import OnboardFooter from "../onboard/OnboardFooter";
import ProgressBar from "../onboard/ProgressBar";
import api from "../../api/client";
import { tamilNaduData } from "../../constants";

export default function Step3() {
  const { step, formData, updateData, setStep } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const { mobile, state, district, constituency } = formData;
    try {
      setLoading(true);
      const res = await api.put("/user/onboarding", {
        step: 3,
        data: { mobile, state, district, constituency },
      });
      toast.success(res.data?.message || "Step 3 completed");
      setStep(4);
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
          <h5>Contact & Address</h5>
          <h5>Step {step} of 5</h5>
        </div>

        <ProgressBar step={step} total={5} />
      </div>

      <div className="px-10 py-9">
        <div className="mb-8">
          <h5 className="text-secondary! tracking-widest uppercase!">
            STEP 0{step} - Contact Details
          </h5>
          <h2>Contact & Address</h2>
          <p>Provide a valid Contact details like Address.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="mobile" className="form-label">
              Mobile <span className="form-required">*</span>
            </label>

            <input
              type="text"
              id="mobile"
              className="form-input"
              placeholder="+91 9876543210"
              value={formData.mobile}
              onChange={(e) => updateData({ mobile: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="state" className="form-label">
              State <span className="form-required">*</span>
            </label>

            <select
              id="state"
              className="form-input"
              value={formData.state}
              onChange={(e) => updateData({ state: e.target.value })}
            >
              <option value="">Select State</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="District" className="form-label">
              District <span className="form-required">*</span>
            </label>

            <select
              id="District"
              className="form-input"
              value={formData.district}
              onChange={(e) => {
                updateData({ district: e.target.value });
                updateData({ constituency: "" });
              }}
            >
              <option value="">Select District</option>

              {Object.keys(tamilNaduData).map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="Constituency" className="form-label">
              Constituency <span className="form-required">*</span>
            </label>

            <select
              id="Constituency"
              className="form-input"
              value={formData.constituency}
              onChange={(e) => updateData({ constituency: e.target.value })}
              disabled={!formData.district}
            >
              <option value="">Select Constituency</option>

              {formData.district &&
                tamilNaduData[formData.district].map((constituencyName) => (
                  <option key={constituencyName} value={constituencyName}>
                    {constituencyName}
                  </option>
                ))}
            </select>
          </div>
          <OnboardFooter handleNext={handleNext} />
        </div>
      </div>
    </div>
  );
}
