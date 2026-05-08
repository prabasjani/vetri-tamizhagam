import React from "react";
import Header from "./Header";

const UserLayout = ({ children }) => {
  return (
    <div className="">
      <Header />

      <div className="min-h-screen">{children}</div>
    </div>
  );
};

export default UserLayout;
