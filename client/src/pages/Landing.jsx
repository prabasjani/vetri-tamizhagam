import React from "react";
import { useNavigate } from "react-router-dom";

import LandingImg from "../assets/tvk7.webp";
import Footer from "../layout/Footer";
import OnboardLayout from "../layout/OnboardLayout";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <OnboardLayout>
      <main className="px-10 py-20 flex items-center justify-center">
        <div className="">
          <img
            src={LandingImg}
            alt="Landing_image"
            className="w-100 overflow-hidden"
          />
        </div>

        <div className="w-2xl h-105 flex flex-col justify-center">
          <h4 className="font-caveat text-3xl text-center mb-6 text-primary/50">
            Vetri Tamizhagam
          </h4>
          <div className="flex flex-col items-center">
            <h1 className="text-5xl text-primary-light/75 font-garamond font-bold text-center">
              Your Voice, Your Rights,
              <br /> Your Government
            </h1>

            <p className="text-base! max-w-xl leading-8 text-center my-6">
              Access government schemes, submit applications, track status, and
              manage your documents — all from one unified, secure platform.
            </p>

            <button className="btn" onClick={() => navigate("/features")}>
              Get Started
            </button>
          </div>
        </div>

        <Footer />
      </main>
    </OnboardLayout>
  );
};

export default Landing;
