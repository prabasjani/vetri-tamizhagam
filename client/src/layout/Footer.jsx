import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex items-center justify-between px-10 py-5 border-t border-border">
      <p className="text-xs!">
        © 2026 Tamizhaga Vettri Kazhagam, Government of Tamilnadu | Designed
        &amp; Developed by Prabanjan
      </p>
      <div className="flex items-center gap-5">
        <div className="trust-badge">
          <span className="trust-dot"></span>SSL Secured
        </div>
        <div className="trust-badge">
          <span className="trust-dot"></span>ISO 27001
        </div>
        <div className="trust-badge">
          <span className="trust-dot"></span>CERT-In Compliant
        </div>
      </div>
    </footer>
  );
};

export default Footer;
