import React from "react";
import Hero from "./UIComponents/Hero";
import Skills from "./UIComponents/Skills";
import Experience from "./UIComponents/Experience";
import Projects from "./UIComponents/Projects";

function App() {
  return (
    <div className="bg-brutal-cream">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
    </div>
  );
}

export default App;
