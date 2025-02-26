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
      skills: [
        {
          name: "TypeScript",
          icon: <SiTypescript color="#3178C6" />,
          level: "Advanced",
        },
        {
          name: "JavaScript",
          icon: <FaJs color="#F7DF1E" />,
          level: "Advanced",
        },
        {
          name: "React",
          icon: <FaReact color="#61DAFB" />,
          level: "Advanced",
        },
        {
          name: "Next.js",
          icon: <SiNextdotjs color="#FFFFFF" />,
          level: "Advanced",
        },
      ],
    },
    {
      title: "Backend & API",
      description: "Building robust and scalable systems",
      skills: [
        {
          name: "RESTful APIs",
          icon: <FaServer color="#FF6B6B" />,
          level: "Expert",
        },
        {
          name: "Node.js",
          icon: <FaNode color="#339933" />,
          level: "Advanced",
        },
        {
          name: "SQL",
          icon: <DiMsqlServer color="#CC2927" />,
          level: "Advanced",
        },
        {
          name: "Database Design",
          icon: <FaDatabase color="#4479A1" />,
          level: "Advanced",
        },
        {
          name: "Postman",
          icon: <SiPostman color="#FF6C37" />,
          level: "Expert",
        },
      ],
    },
    {
      title: "AI & Automation",
      description: "Leveraging AI for enhanced development",
      skills: [
        {
          name: "OpenAI",
          icon: <SiOpenai color="#00A67E" />,
          level: "Expert",
        },
        {
          name: "Anthropic",
          icon: <SiAnthropic color="#7F7F7F" />,
          level: "Expert",
        },
        {
          name: "Prompt Engineering",
          icon: <FaBrain color="#FF6B6B" />,
          level: "Advanced",
        },
        {
          name: "AI Integration",
          icon: <FaRobot color="#4A90E2" />,
          level: "Advanced",
        },
      ],
    },
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
            Technical Expertise
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Specializing in modern web development, API design, and AI
            integration to build powerful, scalable applications.
          </p>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-400">{category.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    viewport={{ once: true }}
                    className="group relative bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.span
                        className="text-3xl"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {skill.icon}
                      </motion.span>
                      <span className="text-gray-200 font-medium">
                        {skill.name}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {skill.level}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {getPercentageForLevel(skill.level)}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${getPercentageForLevel(skill.level)}%`,
                          }}
                          transition={{
                            duration: 1,
                            ease: "easeOut",
                            delay: index * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-white/20 via-white/30 to-white/40 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getPercentageForLevel = (level) => {
  switch (level) {
    case "Expert":
      return 95;
    case "Advanced":
      return 85;
    case "Proficient":
      return 75;
    default:
      return 60;
  }
};

export default Skills;
