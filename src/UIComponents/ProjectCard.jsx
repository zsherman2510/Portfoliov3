// ProjectCard.js
import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  description,
  imageUrl,
  projectUrl,
  slug,
  tags,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]" />

      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden z-[2]">
        <div className="absolute inset-0 bg-black/40" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover object-center"
          src={imageUrl}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="p-6 relative z-[2]">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>

        {/* Tags moved here with updated styling */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-medium text-white/70 bg-black/40 hover:bg-black/60 rounded-lg transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 rounded-lg text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="font-medium">Visit Site</span>
            <svg
              className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>

          {/* <a
            href={`/project/${slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 rounded-lg text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="font-medium">Learn More</span>
            <svg
              className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a> */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
