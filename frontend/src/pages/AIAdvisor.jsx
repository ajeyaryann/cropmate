import React from "react";
import { useNavigate } from "react-router-dom";

import VoiceAssistant from "../components/VoiceAssistant";
import ChatBox from "../components/ChatBox";

import "../styles/AIAdvisor.css";

function AIAdvisor() {

  const navigate = useNavigate();

  return (

    <div className="ai-advisor-container">

      {/* Back Button */}

      <button
        className="back-button"
        onClick={() =>
          navigate("/")   // ✅ Correct route
        }
      >

        ⬅ Back to Dashboard

      </button>

      {/* Voice + Chat Section */}

      <div className="voice-chat-wrapper">

        <VoiceAssistant />

        <ChatBox />

      </div>

      {/* Quick Farming Help */}

      <div className="quick-help">

        <h3>
          🌱 Quick Farming Help
        </h3>

        <div className="help-cards">

          <div className="help-card">

            🌿 Crop Advice

            <p>
              Ask about best crops,
              diseases and growth.
            </p>

          </div>

          <div className="help-card">

            💧 Irrigation Tips

            <p>
              Get watering suggestions
              based on crop needs.
            </p>

          </div>

          <div className="help-card">

            🧪 Fertilizer Help

            <p>
              Learn correct fertilizer
              usage and timing.
            </p>

          </div>

          <div className="help-card">

            🌤 Weather Questions

            <p>
              Understand weather
              impact on crop decisions.
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIAdvisor;