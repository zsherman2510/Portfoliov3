import React from "react";
import Navigation from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
