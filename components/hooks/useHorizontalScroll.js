"use client";
import { useEffect, useRef, useState } from "react";

const useHorizontalScroll = ({
  containerSelector = ".projects-container",
  onReachStart,
  onReachEnd,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const slideIndexRef = useRef(0);
  const isLocked = useRef(false);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const slides = container.querySelectorAll(".project-slide");

    const easeIn = (t) => t * t;

    const scrollToXWithDuration = (targetX, duration = 1200) => {
      const startX = container.scrollLeft;
      const distance = targetX - startX;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percent = Math.min(progress / duration, 1);
        const easePercent = easeIn(percent);

        container.scrollLeft = startX + distance * easePercent;

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const lockScroll = () => {
      isLocked.current = true;
    };

    const unlockScroll = () => {
      isLocked.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (isLocked.current || slides.length === 0) return;

      const currentIndex = slideIndexRef.current;
      let nextIndex = currentIndex;

      if (e.deltaY > 0) {
        // Scroll right
        if (currentIndex < slides.length - 1) {
          nextIndex = currentIndex + 1;
        } else {
          // we're at the last slide, pass control back
          if (onReachEnd) onReachEnd();
          return;
        }
      } else if (e.deltaY < 0) {
        // Scroll left
        if (currentIndex > 0) {
          nextIndex = currentIndex - 1;
        } else {
          // we're at the first slide, go up
          if (onReachStart) onReachStart();
          return;
        }
      }

      if (nextIndex === currentIndex) return;

      lockScroll();
      setIsScrolling(true);

      const targetOffset = slides[nextIndex].offsetLeft;
      scrollToXWithDuration(targetOffset, 1200);

      setTimeout(() => {
        slideIndexRef.current = nextIndex;
        setIsScrolling(false);
        unlockScroll();
      }, 1200);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [containerSelector, onReachStart, onReachEnd]);

  return null;
};

export default useHorizontalScroll;
