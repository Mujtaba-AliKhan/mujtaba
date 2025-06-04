"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/AboutMe.css";
import profileImage from "@/public/assets/about/mujtaba-dp.jpg";
import Title from "./Title";

const AboutMe = () => {
  return (
    <section className="home-about-section">
      <div className="home-about-container">
        <motion.div
          className="home-about-image"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src={profileImage}
            alt="Mujtaba Ali Khan"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="home-about-img"
            priority
          />
        </motion.div>
        <motion.div
          className="home-about-text"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2>
            <Title title="About Me" />
          </h2>
          <p className="home-about-description">
            I’m Mujtaba Ali Khan – a full-stack web developer focused on
            building clean, fast, and responsive digital experiences. Whether
            it's a sleek React.js frontend or a powerful Flask backend, I care
            about performance, usability, and polished design.
            <br />
            <br />
            My work is built with attention to detail – no bloat, no noise. Just
            thoughtful interfaces that feel smooth and get results.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
