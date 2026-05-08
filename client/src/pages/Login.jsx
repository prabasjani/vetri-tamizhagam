import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import OnboardLayout from "../layout/OnboardLayout";
import Footer from "../layout/Footer";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const Login = () => {
  const { login, loading, setLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login({
      email,
      password,
    });

    if (!result.success) {
      setLoading(false);
      toast.error(result.message);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      if (result.user.hasCompletedOnboarding) {
        navigate("/dashboard", {
          replace: true,
        });
        toast.success(result.message);
      } else {
        navigate("/onboarding", { replace: true });
      }
    }, 1500);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <OnboardLayout>
      <div className="flex justify-center items-center mt-32">
        <div className="border border-border hover:shadow-2xl p-6 rounded-md w-115 gap-y-2">
          <div className="pb-6 border-b border-border">
            <h1 className="text-xl! text-primary font-bold mb-2.5 font-ibm tracking-wider">
              <span className="text-secondary">VETRI</span> TAMIZHAGAM
            </h1>

            <p className="font-ibm-mono! text-[13px]!">
              Login to Access your Account
            </p>
          </div>
          <form className="flex flex-col space-y-4 mt-6" onSubmit={handleLogin}>
            <input
              className="form-input"
              placeholder="E.g...prabanjan@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="form-input"
              type="password"
              placeholder="Min. 8 characters"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn" type="submit">
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="font-ibm-mono! mt-4 text-[13px]">
            Create an Account?{" "}
            <Link to="/onboarding" className="text-title font-semibold">
              Register
            </Link>
          </p>
        </div>

        <Footer />
      </div>
    </OnboardLayout>
  );
};

export default Login;
