import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

// One page. Old links (/projects/*, /resume-builder, /trading) land on it too.
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

export default AppRouter;
