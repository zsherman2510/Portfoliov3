import React from "react";

const Experience = () => {
  return (
    <div className="category d-flex flex-column my-4">
      <div className="categoryHeader">Experience</div>
      <div className="experienceList d-flex flex-column" style={{ marginLeft: "10%" }}>
        <div className="experience my-3">
          <div className="d-flex justify-between">
            <div className="title">American Express</div>
            <div className="timeLine">Sept 2021 - Present</div>
            
          </div>
          <div className="position">Engineer II</div>
          
        </div>
        <div className="experience my-3">
          <div className="d-flex justify-between">
            <div className="title">Tango</div>
            <div className="timeLine">Sept 2022 - Feb 2023</div>
          </div>
          <div className="position">Mid Level Engineer II</div>
        </div>
        <div className="experience my-3">
          <div className="d-flex justify-between">
            <div className="title">B2Gnow</div>
            <div className="timeLine">Sept 2019 - Sept 2021</div>
          </div>
          <div className="position">Software Engineer II</div>
        </div>
        <div className="experience my-3">
          <div className="d-flex justify-between">
            <div className="title">University of AZ Coding Bootcamp</div>
            <div className="timeLine">April 2018 - Aug 2019</div>
          </div>
          <div className="position">Teaching Assistant</div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
