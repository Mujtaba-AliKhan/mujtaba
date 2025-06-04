"use client";
import useHorizontalScroll from "./hooks/useHorizontalScroll";
import "../styles/Projects.css";

const Projects = () => {
  useHorizontalScroll({
    onReachStart: () => {
      const el = document.querySelector("#about-me");
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    },
    onReachEnd: () => {
      const el = document.querySelector("#footer");
      if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    },
  });

  const projectData = [
    { title: "Portfolio", desc: "My personal site built in Next.js" },
    { title: "Wikipurrdia", desc: "Cat breeds info site in React" },
    { title: "Weather App", desc: "Flask + OpenWeather API" },
  ];

  return (
    <section className="projects-container">
      {projectData.map((project, idx) => (
        <div className="project-slide" key={idx}>
          <h2>{project.title}</h2>
          <p>{project.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default Projects;
