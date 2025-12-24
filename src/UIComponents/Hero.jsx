import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  // Stamp animation - name slams into place
  const stampVariants = {
    hidden: {
      opacity: 0,
      scale: 2.5,
      rotate: -8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Stagger container for other elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center bg-brutal-cream overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A08_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Decorative Yellow Block */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brutal-yellow border-l-6 border-brutal-black hidden lg:block" />

      {/* Decorative Shapes */}
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-brutal-red border-4 border-brutal-black shadow-brutal hidden lg:block"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-brutal-blue border-4 border-brutal-black shadow-brutal hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="brutal-container relative z-10 py-20">
        <div className="max-w-4xl">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mb-8"
          >
            <span className="brutal-badge">
              Welcome, I'm
            </span>
          </motion.div>

          {/* Name with Stamp Effect */}
          <motion.h1
            variants={stampVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[12rem]
                       text-brutal-black uppercase tracking-tight leading-[0.85] mb-6"
          >
            Zavion
            <br />
            Sherman
          </motion.h1>

          {/* Title with Highlight */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold
                        text-brutal-black mb-8"
            >
              <span className="bg-brutal-yellow px-2 py-1 border-2 border-brutal-black inline-block -rotate-1">
                Full Stack & AI Engineer
              </span>
            </motion.h2>

            {/* Description */}
            <motion.div
              variants={itemVariants}
              className="bg-white border-4 border-brutal-black shadow-brutal p-6 max-w-2xl mb-10"
            >
              <p className="brutal-body-lg">
                I specialize in building exceptional digital solutions from front to
                back. With expertise in creating intuitive user interfaces and
                robust APIs, I transform ideas into seamless, scalable applications
                that users love.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="mailto:shermanzavion@gmail.com"
                className="brutal-btn-primary brutal-btn-lg inline-flex items-center gap-3"
                whileHover={{ y: -4, x: -4 }}
                whileTap={{ y: 2, x: 2 }}
                transition={{ duration: 0.1 }}
              >
                Get in touch
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Available Badge - Floating */}
      <motion.div
        className="absolute bottom-20 right-10 lg:right-1/4 hidden md:block"
        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 6 }}
        transition={{ delay: 0.8, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-brutal-green text-white px-6 py-3 font-heading font-bold uppercase text-sm
                       border-4 border-brutal-black shadow-brutal-lg transform rotate-6">
          Available for Work
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
