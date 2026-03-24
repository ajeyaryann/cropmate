import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainDashboard from "./components/MainDashboard";
import AIAdvisor from "./pages/AIAdvisor";

// NEW PAGE
import FarmingMethods from "./pages/FarmingMethods";

import "./styles/Dashboard.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<MainDashboard />}
        />

        {/* AI Advisor */}
        <Route
          path="/ai-advisor"
          element={<AIAdvisor />}
        />

        {/* NEW Farming Methods */}
        <Route
          path="/farming-methods"
          element={<FarmingMethods />}
        />

      </Routes>
    </Router>
  );
}

export default App;