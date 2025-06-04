"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
    }
  }, [darkMode]);

  return (
    <nav className="navbar-container">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          {darkMode ? (
            <img src="/assets/logo/mujtaba-logo-dark.png" alt="Mujtaba Logo" />
          ) : (
            <img src="/assets/logo/mujtaba-logo.png" alt="Mujtaba Logo" />
          )}
        </Link>
        <div className="navbar-menu">
          <Link href="/" className="navbar-menu-item">
            Home
          </Link>
          <Link href="/about-me" className="navbar-menu-item">
            About Me
          </Link>
          <Link href="/projects" className="navbar-menu-item">
            Projects
          </Link>
          <Link href="/lets-connect" className="navbar-menu-item">
            Let's Connect
          </Link>
        </div>
        <div className="navbar-icons">
          <div
            className="navbar-toggle-wrapper"
            onClick={() => setDarkMode(!darkMode)}
          >
            <motion.div
              className={`navbar-toggle-thumb ${darkMode ? "dark" : "light"}`}
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              {darkMode ? <FiMoon /> : <FiSun />}
            </motion.div>
          </div>

          <div
            className={`navbar-hamburger ${isMenuOpen ? "opened" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Main Menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="42" height="42" viewBox="0 0 100 100">
              <path
                className="navbar-line navbar-line1"
                d="M 20,29 H 80 C 80,29 95,29 95,67 C 95,78 91,82 85,82 C 79,82 75,75 75,75 L 25,25"
              />
              <path className="navbar-line navbar-line2" d="M 20,50 H 80" />
              <path
                className="navbar-line navbar-line3"
                d="M 20,71 H 80 C 80,71 95,71 95,33 C 95,22 91,18 85,18 C 79,18 75,25 75,25 L 25,75"
              />
            </svg>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ y: "-200%" }}
            animate={{ y: 0 }}
            exit={{ y: "-200%" }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              About Me
            </Link>
            <Link href="/projects" onClick={() => setIsMenuOpen(false)}>
              Projects
            </Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
