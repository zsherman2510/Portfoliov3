import Hero from "./UIComponents/Hero";
import Skills from "./UIComponents/Skills";
import Experience from "./UIComponents/Experience";
import Projects from "./UIComponents/Projects";
import "./App.css";

function App() {
  return (
    <>
      <div className="main">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
      </div>
    </>
  );
}

export default App;
