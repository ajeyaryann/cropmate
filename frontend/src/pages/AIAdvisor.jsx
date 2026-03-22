import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function AIAdvisor() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>🎤 AI Farming Advisor</h1>

        {/* Voice Section */}
        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h2>🎤 Voice Assistant</h2>

          <button
            style={{
              marginTop: "15px",
              padding: "12px",
              fontSize: "16px",
              width: "200px",
            }}
          >
            🎙 Start Speaking
          </button>
        </div>

        {/* Chat Section */}
        <div
          className="card"
          style={{ marginTop: "20px" }}
        >
          <h2>💬 Chat With AI</h2>

          <input
            type="text"
            placeholder="Type in Hindi or English..."
            style={{
              width: "100%",
              marginTop: "15px",
            }}
          />

          <button
            style={{
              marginTop: "15px",
              padding: "10px",
            }}
          >
            Send
          </button>

          <p style={{ marginTop: "15px" }}>
            AI Response will appear here...
          </p>
        </div>

      </div>
    </div>
  );
}

export default AIAdvisor;