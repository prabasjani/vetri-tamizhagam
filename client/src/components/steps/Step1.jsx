import { useState } from "react";
import { toast } from "sonner";
import { useOnboarding } from "../../context/OnboardingContext";
import api from "../../api/client";
import ProgressBar from "../onboard/ProgressBar";
import OnboardFooter from "../onboard/OnboardFooter";

export default function Step1() {
  const { step, formData, updateData, setStep } = useOnboarding();
  const [loading, setLoading] = useState(false);

  //   Validation
  const validate = () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }

    // Password check
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  // Submit
  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const res = await api.post("/auth/register", {
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });
      toast.success(res.data?.message || "Registration Successful");
      setStep(2); // move to next step
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-10 pt-7 w-full">
        <div className="flex items-center justify-between">
          <h5>Account Setup</h5>
          <h5>Step {step} of 5</h5>
        </div>

        <ProgressBar step={step} total={5} />
      </div>

      <div className="px-10 py-9">
        <div className="mb-8">
          <h5 className="text-secondary! tracking-widest">
            STEP 01 - ACCOUNT CREDENTIALS
          </h5>
          <h2>Setup Your Account</h2>
          <p>
            Choose a secure username and password to access the portal. Review
            your information before submitting.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="form-label">
              Email Address <span className="form-required">*</span>
            </label>

            <input
              type="email"
              id="email"
              placeholder="E.g... prabanjan@gmail.com"
              className="form-input"
              value={formData.email}
              onChange={(e) => updateData({ email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="form-label">
              Password <span className="form-required">*</span>
            </label>

            <input
              type="password"
              id="password"
              placeholder="Min. 8 Characters"
              className="form-input"
              value={formData.password}
              onChange={(e) => updateData({ password: e.target.value })}
            />
          </div>
        </div>
      </div>

      <OnboardFooter handleNext={handleSubmit} />
    </div>
  );
}
