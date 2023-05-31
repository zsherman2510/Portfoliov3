import React from "react";

const Skills = () => {
  return (
    <div className="category d-flex flex-column mt-5">
      <div className="categoryHeader">Skills</div>
      <div className="d-flex justify-around flex-wrap">
        <div className="stack my-4 mx-2" style={{ marginLeft: "10%" }}>
          <div className="title uppercase font-bold">Languages</div>
          <div className="stack-items text-sm">
            <div className="item">JavaScript (ES6)</div>
            <div className="item">JavaScript</div>
            <div className="item">HTML</div>
            <div className="item">CSS/Sass</div>
            <div className="item">C#</div>
            <div className="item">SQL</div>
          </div>
        </div>
        <div className="stack my-4">
          <div className="title uppercase font-bold">Frameworks</div>
          <div className="stack-items text-sm">
            <div className="item">React</div>
            <div className="item">Node</div>
            <div className="item">Shopify</div>
            <div className="item">Tailwind</div>
          </div>
        </div>
        <div className="stack my-4 mx-2" style={{ marginLeft: "10%" }}>
          <div className="title uppercase font-bold">Tools</div>
          <div className="stack-items text-sm">
            <div className="item">Git & Github</div>
            <div className="item">Chrome Dev Tools</div>
            <div className="item">SSMS</div>
            <div className="item">Postman</div>
            <div className="item">Jira</div>
            <div className="item">Confluence</div>
            <div className="item">Azure Devops</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
