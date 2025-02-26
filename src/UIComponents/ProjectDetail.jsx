import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { slug } = useParams();

  // You would fetch the project details based on the slug
  const project = {
    title: "EpicStart",
    description: "Full description...",
    features: [
      "Feature 1",
      "Feature 2",
      // ...
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      // ...
    ],
    challenges: [
      {
        title: "Challenge 1",
        description: "How we solved it...",
      },
      // ...
    ],
    screenshots: [
      // Array of screenshot URLs
    ],
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Project content here */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {project.title}
          </h1>

          {/* Add your detailed project content here */}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
