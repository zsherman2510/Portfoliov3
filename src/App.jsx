import React from "react";
import Hero from "./UIComponents/Hero";
import Skills from "./UIComponents/Skills";
import Experience from "./UIComponents/Experience";
import Projects from "./UIComponents/Projects";
import "./App.css";

function App() {
  return (
    <div className="bg-black">
      <Hero />
      <Skills />
      <Projects />
      <Experience />
    </div>
  );
}

export default App;
