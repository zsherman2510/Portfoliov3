import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./UIComponents/Layout";
import Trading from "./UIComponents/Trading";
import ProjectDetail from "./UIComponents/ProjectDetail";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Trading route - standalone without Layout */}
        <Route path="/trading" element={<Trading />} />

        {/* Main portfolio routes with Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
