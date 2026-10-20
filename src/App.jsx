import Cursor from "./site/Cursor";
import Nav from "./site/Nav";
import Hero from "./site/Hero";
import About from "./site/About";
import Work from "./site/Work";
import Resume from "./site/Resume";
import Skills from "./site/Skills";
import Contact from "./site/Contact";

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded focus:bg-paper focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Resume />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
