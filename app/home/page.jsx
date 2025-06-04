// import AboutMe from "@/components/AboutMe";
// import Hero from "@/components/Hero";
// import Projects from "@/components/Projects";

// export default function HomePage() {
//   return (
//     <main>
//       <Hero />
//       <AboutMe />
//       <Projects />
//     </main>
//   );
// }

"use client";
import AboutMe from "@/components/AboutMe";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import useSectionScroll from "../hooks/useSectionScroll";

export default function HomePage() {
  useSectionScroll();

  return (
    <main className="home-container">
      <section className="section-page">
        <Hero />
      </section>
      <section className="section-page">
        <AboutMe />
      </section>
      <section className="section-page" id="projects">
        <Projects />
      </section>
    </main>
  );
}
