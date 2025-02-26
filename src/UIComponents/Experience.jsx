// Experience.js
import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../config";

const Experience = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(900px_circle_at_center,transparent_30%,black)]" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 mb-4">
            Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A track record of delivering high-quality web applications and
            solutions
          </p>
        </motion.div>

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between mb-6">
                  <div>
                    <motion.h3
                      className="text-2xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {exp.position}
                    </motion.h3>
                    <p className="text-gray-400 text-lg">{exp.company}</p>
                  </div>
                  <div className="inline-flex px-4 py-2 bg-black/40 rounded-full">
                    <p className="text-gray-400 font-medium">{exp.timeline}</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {exp.accomplishments.map((accomplishment, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-gray-300 group/item"
                    >
                      <span className="mt-1.5 p-0.5 rounded-full bg-white/5 group-hover/item:bg-white/10 transition-colors">
                        <svg
                          className="w-3 h-3 text-white/50 group-hover/item:text-white/70 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-300 group-hover/item:text-gray-200 transition-colors">
                        {accomplishment}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
