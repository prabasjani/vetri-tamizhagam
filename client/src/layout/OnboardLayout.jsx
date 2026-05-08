import React from "react";
import Header from "./Header";
import OnboardSidebar from "../components/onboard/OnboardSidebar";
import OnboardFooter from "../components/onboard/OnboardFooter";

const OnboardLayout = ({ children }) => {
  return (
    <div className="">
      <Header />

      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default OnboardLayout;
