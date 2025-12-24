import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({
  number,
  title,
  description,
  imageUrl,
  projectUrl,
  tags,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative"
    >
      {/* Stacked background effect */}
      <div className="absolute inset-0 bg-brutal-yellow border-4 border-brutal-black translate-x-3 translate-y-3 -z-10" />

      {/* Main Card */}
      <motion.div
        className="bg-white border-4 border-brutal-black overflow-hidden"
        whileHover={{ x: -4, y: -4 }}
        transition={{ duration: 0.15 }}
      >
        {/* Project Number Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-brutal-black text-white px-4 py-2 font-display text-3xl">
            {number}
          </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden border-b-4 border-brutal-black">
          <img
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            src={imageUrl}
            alt={title}
            onError={(e) => {
              // Fallback for missing images - show placeholder
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Placeholder for missing images */}
          <div
            className="absolute inset-0 bg-brutal-charcoal hidden items-center justify-center"
          >
            <span className="font-display text-6xl text-white/20">{title}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-brutal-black uppercase mb-4">
            {title}
          </h3>

          {/* Description */}
          <p className="brutal-body mb-6">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.slice(0, 6).map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                className="brutal-tag"
                whileHover={{ rotate: Math.random() > 0.5 ? 2 : -2 }}
                transition={{ duration: 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Button */}
          <motion.a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-outline w-full justify-center gap-3"
            whileHover={{ y: -2, x: -2 }}
            whileTap={{ y: 1, x: 1 }}
            transition={{ duration: 0.1 }}
          >
            <span>Visit Site</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
