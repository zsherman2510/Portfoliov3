import React from "react";
import { motion } from "framer-motion";
import {
  FaJs,
  FaNode,
  FaReact,
  FaBrain,
  FaRobot,
  FaServer,
  FaDatabase,
} from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import {
  SiTypescript,
  SiOpenai,
  SiAnthropic,
  SiPostman,
  SiNextdotjs,
} from "react-icons/si";

const Skills = () => {
  const skillCategories = [
    {
      title: "Core Technologies",
      description: "My foundation and primary tools",
      color: "brutal-red",
      bgColor: "bg-brutal-red",
      skills: [
        { name: "TypeScript", icon: SiTypescript, level: "Advanced" },
        { name: "JavaScript", icon: FaJs, level: "Advanced" },
        { name: "React", icon: FaReact, level: "Advanced" },
        { name: "Next.js", icon: SiNextdotjs, level: "Advanced" },
      ],
    },
    {
      title: "Backend & API",
      description: "Building robust and scalable systems",
      color: "brutal-blue",
      bgColor: "bg-brutal-blue",
      skills: [
        { name: "RESTful APIs", icon: FaServer, level: "Expert" },
        { name: "Node.js", icon: FaNode, level: "Advanced" },
        { name: "SQL", icon: DiMsqlServer, level: "Advanced" },
        { name: "Database Design", icon: FaDatabase, level: "Advanced" },
        { name: "Postman", icon: SiPostman, level: "Expert" },
      ],
    },
    {
      title: "AI & Automation",
      description: "Leveraging AI for enhanced development",
      color: "brutal-purple",
      bgColor: "bg-brutal-purple",
      skills: [
        { name: "OpenAI", icon: SiOpenai, level: "Expert" },
        { name: "Anthropic", icon: SiAnthropic, level: "Expert" },
        { name: "Prompt Engineering", icon: FaBrain, level: "Advanced" },
        { name: "AI Integration", icon: FaRobot, level: "Advanced" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="skills" className="brutal-section bg-brutal-cream">
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
            Technical
            <span className="bg-brutal-yellow px-3 ml-3 border-4 border-brutal-black inline-block -rotate-1">
              Expertise
            </span>
          </h2>
          <p className="brutal-body-lg max-w-2xl">
            Specializing in modern web development, API design, and AI
            integration to build powerful, scalable applications.
          </p>
        </motion.div>

        {/* Skill Categories */}
        <div className="space-y-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <motion.div
                  className={`${category.bgColor} text-white px-6 py-3
                             border-4 border-brutal-black shadow-brutal
                             font-heading font-bold text-xl uppercase inline-block`}
                  whileHover={{ rotate: -2, y: -2 }}
                  transition={{ duration: 0.1 }}
                >
                  {category.title}
                </motion.div>
                <p className="brutal-body text-brutal-charcoal">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
              >
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} variants={itemVariants} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, variants }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      variants={variants}
      className="bg-white border-4 border-brutal-black shadow-brutal p-5
                 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1
                 transition-all duration-150 cursor-default"
      whileHover="hover"
    >
      {/* Icon */}
      <motion.div
        className="mb-4"
        variants={{
          hover: {
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.4 },
          },
        }}
      >
        <div className="w-12 h-12 bg-brutal-black flex items-center justify-center border-2 border-brutal-black">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      {/* Name */}
      <h4 className="font-heading font-bold text-brutal-black text-sm uppercase mb-3">
        {skill.name}
      </h4>

      {/* Level Badge */}
      <div
        className={`inline-block px-2 py-1 text-xs font-bold uppercase
                   border-2 border-brutal-black font-mono
                   ${skill.level === "Expert"
                     ? "bg-brutal-yellow text-brutal-black"
                     : "bg-white text-brutal-black"
                   }`}
      >
        {skill.level}
      </div>
    </motion.div>
  );
};

export default Skills;
