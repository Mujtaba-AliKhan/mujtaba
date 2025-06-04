// "use client";
// import { useEffect, useRef, useState } from "react";

// const useSectionScroll = () => {
//   const [isScrolling, setIsScrolling] = useState(false);
//   const sectionIndexRef = useRef(0);
//   const isLocked = useRef(false);
//   const activeSection = useRef(null);

//   useEffect(() => {
//     const sections = document.querySelectorAll(".section-page");

//     const easeIn = (t) => t * t;

//     const scrollToWithDuration = (targetY, duration = 1500) => {
//       const startY = window.scrollY;
//       const distance = targetY - startY;
//       let startTime = null;

//       const step = (timestamp) => {
//         if (!startTime) startTime = timestamp;
//         const progress = timestamp - startTime;
//         const percent = Math.min(progress / duration, 1);
//         const easePercent = easeIn(percent);

//         window.scrollTo(0, startY + distance * easePercent);

//         if (progress < duration) {
//           requestAnimationFrame(step);
//         }
//       };

//       requestAnimationFrame(step);
//     };

//     const lockScroll = () => {
//       document.body.style.overflowX = "hidden";
//       document.documentElement.style.overflowX = "hidden";
//       isLocked.current = true;
//     };

//     const unlockScroll = () => {
//       document.body.style.overflowX = "";
//       document.documentElement.style.overflowX = "";
//       isLocked.current = false;
//     };

//     const handleWheel = (e) => {
//       e.preventDefault();
//       if (isLocked.current || sections.length === 0) return;

//       const currentIndex = sectionIndexRef.current;
//       let nextIndex = currentIndex;

//       // Determine direction
//       if (e.deltaY > 0 && currentIndex < sections.length - 1) {
//         nextIndex = currentIndex + 1;
//       } else if (e.deltaY < 0 && currentIndex > 0) {
//         nextIndex = currentIndex - 1;
//       }

//       // If direction is unchanged, don't scroll
//       if (nextIndex === currentIndex) return;

//       // Start transition
//       lockScroll();
//       setIsScrolling(true);

//       const targetOffset = sections[nextIndex].offsetTop;
//       scrollToWithDuration(targetOffset, 1500);

//       setTimeout(() => {
//         sectionIndexRef.current = nextIndex;
//         setIsScrolling(false);
//         unlockScroll();
//       }, 1500);
//     };

//     window.addEventListener("wheel", handleWheel, { passive: false });

//     return () => {
//       window.removeEventListener("wheel", handleWheel);
//       unlockScroll();
//     };
//   }, []);

//   return null;
// };

// export default useSectionScroll;

"use client";
import { useEffect, useRef, useState } from "react";

const useSectionScroll = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionIndexRef = useRef(0);
  const isLocked = useRef(false);
  const activeSection = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll(".section-page");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            activeSection.current = entry.target.id;
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => {
      if (section.id) observer.observe(section);
    });

    const easeIn = (t) => t * t;

    const scrollToWithDuration = (targetY, duration = 1500) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percent = Math.min(progress / duration, 1);
        const easePercent = easeIn(percent);
        window.scrollTo(0, startY + distance * easePercent);
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

    const handleWheel = (e) => {
      if (activeSection.current === "projects") return; // Block vertical scroll inside projects

      e.preventDefault();
      if (isLocked.current || sections.length === 0) return;

      const currentIndex = sectionIndexRef.current;
      let nextIndex = currentIndex;

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        nextIndex++;
      } else if (e.deltaY < 0 && currentIndex > 0) {
        nextIndex--;
      }

      if (nextIndex === currentIndex) return;

      lockScroll();
      setIsScrolling(true);

      const targetOffset = sections[nextIndex].offsetTop;
      scrollToWithDuration(targetOffset, 1500);

      setTimeout(() => {
        sectionIndexRef.current = nextIndex;
        setIsScrolling(false);
        unlockScroll();
      }, 1500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      observer.disconnect();
      unlockScroll();
    };
  }, []);

  return null;
};

export default useSectionScroll;
