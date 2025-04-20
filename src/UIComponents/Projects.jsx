// Projects.js
import React from "react";
import ProjectCard from "./ProjectCard";
import socialgo from "/socialgo.png";
import shopthemes from "/shopthemes.png";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "SocialGo",
      description:
        "A social media management platform that helps businesses manage their social media accounts. This project demonstrates my proficiency in Next.js, SQL, email services and many more.",
      imageUrl: socialgo,
      projectUrl: "https://socialgo.cc",
      slug: "socialgo",
      tags: [
        "Next.js",
        "PostgreSQL",
        "OpenAI",
        "Stability AI",
        "Runway ML",
        "Vercel",
        "Stripe",
        "Email Services",
        "Redis",
        "Digital Ocean",
      ],
    },
    {
      title: "Shop-Themes",
      description:
        "A platform that sells digital products. This project demonstrates my proficiency in Next.js, SQL, email services and many more.",
      imageUrl: shopthemes,
      projectUrl: "https://shop-themes.com",
      tags: [
        "Next.js",
        "E-commerce",
        "Stripe",
        "React",
        "PostgreSQL",
        "OpenAI",
        "Email Services",
        "Digital Ocean",
      ],
    },
    // Add more projects as needed
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(900px_circle_at_center,transparent_30%,black)]" />

      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A selection of my recent work in web development and AI integration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
