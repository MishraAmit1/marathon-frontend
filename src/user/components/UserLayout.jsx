import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer.jsx";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-20 flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default UserLayout;
