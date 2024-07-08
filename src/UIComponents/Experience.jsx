// Experience.js
import React from "react";
import ExperienceEntry from "./ExperienceEntry";
import { experienceData } from "../config";

const Experience = () => {
  return (
    <div className="category d-flex flex-column my-4">
      <div className="categoryHeader">Experience</div>
      <div
        className="experienceList d-flex flex-column"
        style={{ marginLeft: "10%" }}
      >
        {experienceData.map((experience, index) => (
          <ExperienceEntry
            key={index}
            company={experience.company}
            position={experience.position}
            timeline={experience.timeline}
            accomplishments={experience.accomplishments}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
