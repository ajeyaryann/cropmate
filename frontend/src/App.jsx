import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainDashboard from "./components/MainDashboard";
import AIAdvisor from "./pages/AIAdvisor";

import "./styles/Dashboard.css";

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<MainDashboard />}
        />

        <Route
          path="/ai-advisor"
          element={<AIAdvisor />}
        />

      </Routes>
    </Router>
  );
}

export default App;