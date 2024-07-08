// Projects.js
import React from "react";
import ProjectCard from "./ProjectCard";
import epicstart from "/epicstart.png";
import socialgo from "/socialgo.png";

const Projects = () => {
  const projects = [
    {
      title: "EpicStart",
      description:
        "An idea validation platform that helps entrepreneurs validate their SaaS ideas and doing preliminary market research. This project demonstrates my proficiency in Next.js, SQL and many more technologies.",
      imageUrl: epicstart,
      projectUrl: "https://epicstart.ai",
    },
    {
      title: "SocialGo",
      description:
        "A social media management platform that helps businesses manage their social media accounts. This project demonstrates my proficiency in Next.js, SQL, email services and many more.",
      imageUrl: socialgo,
      projectUrl: "https://socialgo.cc",
    },
    // Add more projects as needed
  ];

  return (
    <div className="d-flex flex-column my-4">
      <div className="container mx-auto px-4">
        <div className="categoryHeader">Projects</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
