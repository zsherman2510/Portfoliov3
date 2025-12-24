import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../config";

// Color mapping for each company
const companyColors = {
  "Amex": {
    bg: "bg-brutal-blue",
    accent: "border-brutal-blue",
    shadow: "shadow-brutal-blue",
  },
  "Tango": {
    bg: "bg-brutal-yellow",
    accent: "border-brutal-yellow",
    textColor: "text-brutal-black",
    shadow: "shadow-brutal-yellow",
  },
  "B2GNow": {
    bg: "bg-brutal-green",
    accent: "border-brutal-green",
    shadow: "shadow-brutal-green",
  },
};

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="experience" className="brutal-section bg-brutal-cream">
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
            Work
            <span className="bg-brutal-red text-white px-3 ml-3 border-4 border-brutal-black inline-block -rotate-2">
              Experience
            </span>
          </h2>
          <p className="brutal-body-lg max-w-2xl">
            A track record of delivering high-quality web applications and
            solutions across multiple industries
          </p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {experienceData.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ experience, index }) => {
  const colors = companyColors[experience.company] || {
    bg: "bg-brutal-purple",
    accent: "border-brutal-purple",
  };

  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const accomplishmentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative"
    >
      {/* Company Badge - Positioned outside the card */}
      <motion.div
        className={`absolute -top-4 -left-2 md:left-6 z-20 ${colors.bg}
                   px-6 py-3 border-4 border-brutal-black shadow-brutal
                   font-display text-2xl md:text-3xl uppercase tracking-wide
                   transform -rotate-3
                   ${colors.textColor || "text-white"}`}
        whileHover={{ rotate: 0, scale: 1.05 }}
        transition={{ duration: 0.15 }}
      >
        {experience.company}
      </motion.div>

      {/* Main Card */}
      <div className="bg-white border-4 border-brutal-black shadow-brutal-lg pt-12 md:pt-8">
        <div className="p-6 md:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            {/* Position */}
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-brutal-black uppercase mb-2">
                {experience.position}
              </h3>
            </div>

            {/* Timeline Badge */}
            <div className="inline-flex">
              <span className="bg-brutal-black text-white px-4 py-2 font-mono text-sm font-bold">
                {experience.timeline}
              </span>
            </div>
          </div>

          {/* Accomplishments */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-brutal-charcoal uppercase text-sm tracking-widest mb-4">
              Key Accomplishments
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {experience.accomplishments.slice(0, 5).map((accomplishment, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={accomplishmentVariants}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-brutal-cream border-2 border-brutal-black
                            hover:bg-brutal-yellow hover:-translate-x-1 hover:-translate-y-1
                            hover:shadow-brutal-sm transition-all duration-150"
                >
                  {/* Number */}
                  <span className="flex-shrink-0 w-8 h-8 bg-brutal-black text-white
                                 flex items-center justify-center font-mono font-bold text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Text */}
                  <p className="brutal-body text-brutal-black leading-relaxed">
                    {accomplishment}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Show more indicator if there are more accomplishments */}
            {experience.accomplishments.length > 5 && (
              <p className="text-brutal-charcoal text-sm font-mono mt-4">
                + {experience.accomplishments.length - 5} more accomplishments
              </p>
            )}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className={`h-2 ${colors.bg} border-t-4 border-brutal-black`} />
      </div>
    </motion.div>
  );
};

export default Experience;
