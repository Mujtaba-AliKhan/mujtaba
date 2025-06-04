"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/Loader.css";

const assetsToLoad = [
  "/assets/hero/hero-bg.mp4",
  "/assets/logo/mujtaba-logo-dark.png",
  "/assets/logo/mujtaba-logo.png",
  "/assets/about/mujtaba-dp.jpg",
];

const fetchWithProgress = (url, onProgress) =>
  fetch(url)
    .then((res) => {
      const contentLength = res.headers.get("content-length");
      //   if (!contentLength || !res.body) return res.blob();
      if (!contentLength || !res.body) {
        onProgress(1);
        return res.blob();
      }

      const reader = res.body.getReader();
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      return new Response(
        new ReadableStream({
          start(controller) {
            function read() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                loaded += value.length;
                onProgress(loaded / total);
                controller.enqueue(value);
                read();
              });
            }
            read();
          },
        })
      ).blob();
    })
    .catch(() => {
      onProgress(1);
    });

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let progressMap = {};
    const totalAssets = assetsToLoad.length;

    const updateOverallProgress = () => {
      const totalProgress = Object.values(progressMap).reduce(
        (a, b) => a + b,
        0
      );
      const percent = Math.floor((totalProgress / totalAssets) * 100);
      setProgress(percent);

      if (percent >= 100) {
        setTimeout(() => setShowButton(true), 600);
      }
    };

    assetsToLoad.forEach((url) => {
      progressMap[url] = 0;
      fetchWithProgress(url, (fileProgress) => {
        progressMap[url] = fileProgress;
        updateOverallProgress();
      });
    });
  }, []);

  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="loader-title">Mujtaba Ali Khan</h1>
      <p className="loader-tagline">
        Crafting clean, fast, responsive web experiences.
      </p>

      <div className="loader-bar-track">
        <motion.div
          className="loader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="loader-percent">{progress}%</p>

      <motion.button
        className={`loader-button ${showButton ? "show" : ""}`}
        onClick={showButton ? onFinish : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
      >
        ENTER WEBSITE
      </motion.button>
    </motion.div>
  );
};

export default Loader;
