import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./UIComponents/Layout";

const AppRouter = () => {
  

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<App />} />          
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
