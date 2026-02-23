import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const Projects = () => {
  // projects are imported from shared data so cards and detail pages stay in sync

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="projects" className="brutal-section bg-brutal-offwhite">
      <div className="brutal-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="brutal-h2 mb-4">
            Featured
            <span className="bg-brutal-blue text-white px-3 ml-3 border-4 border-brutal-black inline-block rotate-1">
              Projects
            </span>
          </h2>
          <p className="brutal-body-lg max-w-2xl mx-auto">
            recent work across trading, mobile apps, and agent assisted development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
