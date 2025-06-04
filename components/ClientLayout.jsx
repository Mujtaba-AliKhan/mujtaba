"use client";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default ClientLayout;
