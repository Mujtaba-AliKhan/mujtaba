"use client";
import React from "react";
import Navbar from "./Navbar";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout">
      <Navbar />
      {children}
    </div>
  );
};

export default ClientLayout;
