"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <Navbar />
      {children}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default ClientLayout;
