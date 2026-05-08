import React from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/tvk3.png";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="bg-primary px-10 h-16 flex items-center justify-between border-b-4 border-secondary">
      <div className="flex items-center gap-4">
        <img src={Logo} alt="TVK Flag" className="w-10 h-10" />
        <div>
          <h1 className="text-white text-base font-semibold font-ibm uppercase">
            <span className="text-secondary">Vetri</span> Tamizhagam
          </h1>
          <p className="text-neutral-300! uppercase tracking-widest! text-[10px]! font-ibm-mono!">
            Government of Tamilnadu · Digital Services
          </p>
        </div>
      </div>
      <div className="header-actions">
        {window.location.pathname === "/onboarding" ? null : isAuthenticated ? (
          <button
            className="text-[13px] text-neutral-300 hover:text-neutral-100 cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-[13px] text-neutral-300 hover:text-neutral-100"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
