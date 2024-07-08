import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="heading">Hello!.. 👋🏾</div>
      <div className="subheader text-lg md:text-2xl">I'm Zavion Sherman.</div>
      <div className="subheader grey text-md md:text-xl">
        I build things for the web.
      </div>
      <div className="info">
        I'm a <span className="amex">software engineer</span> specializing in
        building exceptional digital experiences and crafting innovative
        solutions through code and creativity
      </div>
      <div className="cta">
        <a
          className="mailTo btn bg-primary text-white"
          href="mailto:shermanzavion@gmail.com"
        >
          Get in touch 👉🏾{" "}
        </a>
      </div>
    </div>
  );
};

export default Hero;
