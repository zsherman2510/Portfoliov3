import React from "react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">ZS</div>
        <div className="flex items-center gap-8">
          <a
            href="/Resume2024.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

// Styles
const styles = {
  logo: {
    width: "200px",
    color: "#00E8D5",
    paddingLeft: "10px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    // background: '#333',
    padding: "10px",
    alignItems: "center",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    padding: "4px",
    alignItems: "center",
    lineHeight: "40px",
    margin: "0px",
  },
};
