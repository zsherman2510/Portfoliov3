import React from "react";
import Navigation from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
        <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
