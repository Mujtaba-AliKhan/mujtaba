"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Hero.css";
import SplitText from "./SplitText";

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);
  return (
    <motion.section
      className="hero-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.video
        ref={videoRef}
        className="hero-video-bg"
        src="/assets/hero/hero-bg.mp4"
        autoPlay
        preload="auto"
        muted
        loop
        playsInline
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5 }}
      />

      <div className="hero-inner">
        {/* Heading */}
        <h1 className="hero-heading">
          <SplitText
            text="MUJTABA ALI KHAN"
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words, chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </h1>

        {/* Subheading */}
        <p className="hero-subheading">
          <SplitText
            text="Full-Stack Web Developer | React.js & Flask Specialist"
            className="hero-subheading"
            delay={40}
            duration={0.01}
            ease="none"
            splitType="words, chars"
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}
            threshold={0.1}
            rootMargin="-100px"
            timelineDelay={1.5}
          />
        </p>

        {/* CTA Button */}
        <motion.div
          className="hero-cta-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.5 }}
        >
          <a href="#projects" className="hero-cta">
            Explore Projects
          </a>
          <a href="#contact" className="hero-cta">
            Connect with Me
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
