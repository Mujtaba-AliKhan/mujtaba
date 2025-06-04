// "use client";
// import { useEffect, useRef } from "react";

// const useHorizontalScroll = ({
//   containerSelector = ".projects-container",
//   onReachStart,
//   onReachEnd,
// }) => {
//   const isLocked = useRef(false);
//   const slideIndexRef = useRef(0);
//   const lastDirectionRef = useRef(null); // 'up' or 'down'
//   const lastSlideExitReady = useRef(false); // for footer logic

//   useEffect(() => {
//     const container = document.querySelector(containerSelector);
//     if (!container) return;

//     const slides = container.querySelectorAll(".project-slide");
//     const duration = 1000;

//     const easeIn = (t) => t * t;

//     const scrollToX = (targetX) => {
//       const startX = container.scrollLeft;
//       const distance = targetX - startX;
//       let startTime = null;

//       const step = (timestamp) => {
//         if (!startTime) startTime = timestamp;
//         const progress = timestamp - startTime;
//         const percent = Math.min(progress / duration, 1);
//         const eased = easeIn(percent);

//         container.scrollLeft = startX + distance * eased;

//         if (progress < duration) {
//           requestAnimationFrame(step);
//         }
//       };

//       requestAnimationFrame(step);
//     };

//     const lockScroll = () => {
//       isLocked.current = true;
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.overflow = "hidden";
//     };

//     const unlockScroll = () => {
//       isLocked.current = false;
//       document.body.style.overflow = "";
//       document.documentElement.style.overflow = "";
//     };

//     const handleWheel = (e) => {
//       if (isLocked.current || slides.length === 0) return;

//       e.preventDefault();

//       const currentIndex = slideIndexRef.current;
//       let nextIndex = currentIndex;

//       const direction = e.deltaY > 0 ? "down" : "up";

//       if (direction === "down") {
//         if (currentIndex < slides.length - 1) {
//           nextIndex++;
//         } else {
//           // last slide: scroll to footer only after one down scroll
//           if (!lastSlideExitReady.current) {
//             lastSlideExitReady.current = true;
//             return;
//           } else {
//             if (onReachEnd) onReachEnd();
//             lastSlideExitReady.current = false;
//             return;
//           }
//         }
//       }

//       if (direction === "up") {
//         if (currentIndex > 0) {
//           nextIndex--;
//         } else {
//           if (onReachStart) onReachStart();
//           return;
//         }
//       }

//       if (nextIndex === currentIndex) return;

//       slideIndexRef.current = nextIndex;
//       lastDirectionRef.current = direction;
//       lockScroll();

//       scrollToX(slides[nextIndex].offsetLeft);

//       setTimeout(() => {
//         unlockScroll();
//         lastSlideExitReady.current = false; // reset exit readiness if direction changed
//       }, duration);
//     };

//     container.addEventListener("wheel", handleWheel, { passive: false });

//     return () => {
//       container.removeEventListener("wheel", handleWheel);
//       unlockScroll();
//     };
//   }, [containerSelector, onReachStart, onReachEnd]);

//   return null;
// };

// export default useHorizontalScroll;

"use client";
import { useEffect, useRef } from "react";

const useHorizontalScroll = ({
  containerSelector = ".projects-container",
  onReachStart,
  onReachEnd,
}) => {
  const isLocked = useRef(false);
  const slideIndexRef = useRef(0);
  const lastSlideExitReady = useRef(false);
  const isActive = useRef(false);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const slides = container.querySelectorAll(".project-slide");
    const duration = 1000;

    const easeIn = (t) => t * t;

    const scrollToX = (targetX) => {
      const startX = container.scrollLeft;
      const distance = targetX - startX;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percent = Math.min(progress / duration, 1);
        const eased = easeIn(percent);

        container.scrollLeft = startX + distance * eased;

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    const lockScroll = () => {
      isLocked.current = true;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      isLocked.current = false;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };

    // Track if Projects section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isActive.current = entry.isIntersecting;
      },
      { threshold: 0.6 }
    );

    observer.observe(container);

    const handleWheel = (e) => {
      if (!isActive.current || isLocked.current || slides.length === 0) return;

      e.preventDefault();

      const currentIndex = slideIndexRef.current;
      let nextIndex = currentIndex;

      const direction = e.deltaY > 0 ? "down" : "up";

      if (direction === "down") {
        if (currentIndex < slides.length - 1) {
          nextIndex++;
        } else {
          if (!lastSlideExitReady.current) {
            lastSlideExitReady.current = true;
            return;
          } else {
            if (onReachEnd) onReachEnd();
            lastSlideExitReady.current = false;
            return;
          }
        }
      }

      if (direction === "up") {
        if (currentIndex > 0) {
          nextIndex--;
        } else {
          if (onReachStart) onReachStart();
          return;
        }
      }

      if (nextIndex === currentIndex) return;

      slideIndexRef.current = nextIndex;
      lockScroll();
      scrollToX(slides[nextIndex].offsetLeft);

      setTimeout(() => {
        unlockScroll();
        lastSlideExitReady.current = false;
      }, duration);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      observer.disconnect();
      unlockScroll();
    };
  }, [containerSelector, onReachStart, onReachEnd]);

  return null;
};

export default useHorizontalScroll;
