import React from "react";
import Navigation from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-brutal-cream">
      <Navigation />
      <main className="pt-24">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
