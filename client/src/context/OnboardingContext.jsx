import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    email: "",
    password: "",

    // Step 2
    fullname: "",
    gender: "",
    dob: "",

    // Step 3
    mobile: "",
    state: "",
    district: "",
    constituency: "",

    // Step 4
    identityType: "",
    identityNumber: "",

    // Step 5
    interests: [],
  });

  // Update any field safely
  const updateData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // Reset onboarding (useful after completion/logout)
  const resetOnboarding = () => {
    setStep(1);
    setFormData({
      email: "",
      password: "",
      fullname: "",
      gender: "",
      dob: "",
      mobile: "",
      state: "",
      district: "",
      constituency: "",
      identityType: "",
      identityNumber: "",
      interests: [],
    });
  };

  // Restore session on refresh
  const restore = async () => {
    try {
      const res = await api.get("/user/profile");
      const user = res.data?.user;

      if (user) {
        // Move to next step
        setStep((user.onboardingStep || 1) + 1);

        // Restore form data
        setFormData((prev) => ({
          ...prev,
          fullname: user.fullname || "",
          gender: user.gender || "",
          dob: user.dob || "",
          state: user.state || "",
          district: user.district || "",
          constituency: user.constituency || "",
          identityType: user.identityType || "",
          interests: user.interests || [],
        }));
      }
    } catch (err) {
      console.log("No session " + err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    restore();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        formData,
        updateData,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Custom hook
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }

  return context;
};
