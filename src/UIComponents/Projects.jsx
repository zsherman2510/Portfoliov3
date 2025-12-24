import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      number: "01",
      title: "VidFarm",
      description:
        "An AI-powered video content platform that helps creators generate, edit, and distribute video content at scale. Built with modern web technologies and integrated AI services.",
      imageUrl: "/vidfarm.png",
      projectUrl: "https://vidfarm.io",
      tags: [
        "Next.js",
        "AI/ML",
        "Video Processing",
        "OpenAI",
        "PostgreSQL",
        "Vercel",
      ],
    },
    {
      number: "02",
      title: "Orca's Flow",
      description:
        "A mobile app that delivers real-time options trading alerts and market insights. Features push notifications, customizable watchlists, and AI-powered trade analysis to help traders make informed decisions.",
      imageUrl: "/orcasflow.png",
      projectUrl: "https://orcasflow.com",
      tags: [
        "React Native",
        "Node.js",
        "Push Notifications",
        "PostgreSQL",
        "Redis",
        "AWS",
      ],
    },
  ];

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
          className="mb-16"
        >
          <h2 className="brutal-h2 mb-4">
            Featured
            <span className="bg-brutal-blue text-white px-3 ml-3 border-4 border-brutal-black inline-block rotate-1">
              Projects
            </span>
          </h2>
          <p className="brutal-body-lg max-w-2xl">
            A selection of my recent work in web development and AI integration
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
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
