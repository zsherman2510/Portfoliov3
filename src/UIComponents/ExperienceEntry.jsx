// ExperienceEntry.js
import React from "react";

const ExperienceEntry = ({ company, position, timeline, accomplishments }) => {
  return (
    <div className="mb-8 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-blue-600">{company}</h3>
        <span className="text-sm text-gray-300">{timeline}</span>
      </div>
      <h4 className="text-md font-medium text-gray-200 mb-4">{position}</h4>
      <ul className="list-none pl-5 space-y-2">
        {accomplishments.map((accomplishment, index) => (
          <li key={index} className="text-gray-500 leading-relaxed">
            {accomplishment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceEntry;
