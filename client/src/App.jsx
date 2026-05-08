import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import Onboarding from "./pages/Onboarding";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <div className="">
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
