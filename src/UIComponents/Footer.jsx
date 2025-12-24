import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/zavionz", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/zavionsherman", label: "LinkedIn" },
    { icon: FaEnvelope, href: "mailto:shermanzavion@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-brutal-black border-t-4 border-brutal-black">
      <div className="brutal-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Credit */}
          <div className="flex items-center gap-2">
            <span className="font-body text-white">Built by</span>
            <span className="bg-brutal-red text-white px-3 py-1 font-heading font-bold uppercase text-sm border-2 border-white">
              Zavion Sherman
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="bg-white text-brutal-black p-3 border-3 border-white
                          hover:bg-brutal-yellow hover:border-brutal-yellow transition-colors duration-100"
                whileHover={{ y: -3, x: -3 }}
                whileTap={{ y: 0, x: 0 }}
                transition={{ duration: 0.1 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="bg-brutal-yellow text-brutal-black px-4 py-2
                      font-heading font-bold uppercase text-sm
                      border-3 border-white shadow-brutal-sm
                      hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5
                      transition-all duration-100"
            whileHover={{ rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="font-mono text-sm text-white/60">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
