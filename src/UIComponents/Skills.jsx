import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import icons from react-icons
import {
  FaJs,
  FaNode,
  FaReact,
  FaGitAlt,
  FaChrome,
  FaJira,
  FaConfluence,
} from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import {
  SiCsharp,
  SiShopify,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const Skills = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const skills = [
    { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
    { name: "JavaScript", icon: <FaJs color="#f7df1e" /> },
    { name: "C#", icon: <SiCsharp color="#239120" /> },
    { name: "SQL", icon: <DiMsqlServer color="#CC2927" /> },
    { name: "React", icon: <FaReact color="#61dafb" /> },
    { name: "Node", icon: <FaNode color="#339933" /> },
    { name: "Shopify", icon: <SiShopify color="#7AB55C" /> },
    { name: "Tailwind", icon: <SiTailwindcss color="#38B2AC" /> },
    { name: "Git & GitHub", icon: <FaGitAlt color="#f34f29" /> },
    { name: "Chrome Dev Tools", icon: <FaChrome color="#4285F4" /> },
    { name: "SSMS", icon: <DiMsqlServer color="#CC2927" /> },
    { name: "Jira", icon: <FaJira color="#0052CC" /> },
    { name: "Confluence", icon: <FaConfluence color="#172B4D" /> },
  ];

  return (
    <div className=" d-flex flex-column mt-24 mb-24">
      <div className="categoryHeader">Skills</div>
      <Slider {...settings}>
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="stack-item text-sm d-flex flex-column align-items-center"
          >
            <div className="skill-icon">{skill.icon}</div>
            <div className="item">{skill.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Skills;
