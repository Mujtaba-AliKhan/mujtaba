"use client";
import React from "react";
import "../styles/Title.css";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import { RxSlash } from "react-icons/rx";

const Title = ({ title }) => {
  return (
    <div className="title-wrapper">
      <span className="title-symbol">
        <FaLessThan />
      </span>
      <span className="title-text">{title}</span>
      <span className="title-symbol">
        <RxSlash />
        <FaGreaterThan />
      </span>
    </div>
  );
};

export default Title;
