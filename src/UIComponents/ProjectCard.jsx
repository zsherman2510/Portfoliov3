import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const ProjectCard = ({
  number,
  slug,
  title,
  description,
  imageUrl,
  projectUrl,
  tags,
  stack,
  comingSoon = false,
  media,
}) => {
  const safeTags = (tags && Array.isArray(tags) ? tags : null) || (stack && Array.isArray(stack) ? stack : [])
  const hasWeb = Boolean(media?.web?.length);
  const hasMobile = Boolean(media?.mobile?.length);

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
      className="brutal-card-hover flex flex-col h-full relative"
    >
      {/* Card Content */}
      <div className="flex-grow">
        {/* Project Number Badge */}
        <div className="absolute -top-4 -left-3 z-10">
          <div
            className="bg-brutal-black text-white px-4 py-2 font-display text-3xl border-4 border-brutal-black transform -rotate-6"
          >
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
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-brutal-black uppercase mb-4">
            {title}
          </h3>

          {(hasWeb || hasMobile) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {hasWeb && <span className="brutal-tag-outline">web app</span>}
              {hasMobile && <span className="brutal-tag-outline">mobile app</span>}
            </div>
          )}

          {/* Description */}
          <p className="brutal-body mb-6 flex-grow">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {safeTags.slice(0, 6).map((tag, tagIndex) => (
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

        </div>
      </div>

      {/* Buttons */}
      <div className="p-6 border-t-4 border-brutal-black flex flex-col gap-3 bg-brutal-cream">
        <Link
          to={`/projects/${slug}`}
          className="brutal-btn-secondary w-full justify-center gap-3"
        >
          view project
        </Link>

        {comingSoon || !projectUrl ? (
          <div className="brutal-btn-outline w-full justify-center gap-3 opacity-70 cursor-not-allowed">
            <span>coming soon</span>
          </div>
        ) : (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-outline w-full justify-center gap-3"
          >
            <span>visit site</span>
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
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
