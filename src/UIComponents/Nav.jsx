import React from "react";
import { motion } from "framer-motion";

const Navigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brutal-cream border-b-4 border-brutal-black">
      <div className="brutal-container py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          className="bg-brutal-black text-brutal-cream px-4 py-2 font-display text-3xl tracking-wider"
          whileHover={{ rotate: -2 }}
          transition={{ duration: 0.1 }}
        >
          ZS
        </motion.div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <NavLink onClick={() => scrollToSection("projects")}>Projects</NavLink>
          <NavLink onClick={() => scrollToSection("experience")}>Experience</NavLink>

          {/* Resume Button */}
          <motion.a
            href="/resume_2025_pdf.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-secondary"
            whileHover={{ y: -2, x: -2 }}
            whileTap={{ y: 1, x: 1 }}
            transition={{ duration: 0.1 }}
          >
            Resume
          </motion.a>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    className="font-heading font-bold text-brutal-black uppercase tracking-wide text-sm
               relative overflow-hidden group"
    whileHover="hover"
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-brutal-blue"
      initial={{ width: 0 }}
      variants={{
        hover: { width: "100%" }
      }}
      transition={{ duration: 0.15 }}
    />
  </motion.button>
);

export default Navigation;
