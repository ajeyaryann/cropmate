import React from "react";
import { useNavigate } from "react-router-dom";

import VoiceAssistant from "../components/VoiceAssistant";
import ChatBox from "../components/ChatBox";

import "../styles/AIAdvisor.css";

const AIAdvisor = () => {

  const navigate = useNavigate();

  return (

    <div className="advisor-container">

      {/* Header */}

      <div className="header-section">

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >

          🔙 Back to Dashboard

        </button>

        <h1 className="title">

          🤖 CropMate AI Advisor

        </h1>

        <p className="subtitle">

          Ask farming questions using voice
          or chat in multiple Indian languages.

        </p>

      </div>

      {/* Voice + Chat Grid */}

      <div className="advisor-grid">

        <div className="voice-card">

          <VoiceAssistant />

        </div>

        <div className="chat-card">

          <ChatBox />

        </div>

      </div>

      {/* Quick Tools */}

      <div className="quick-tools">

        <h3>🌾 Quick Farming Help</h3>

        <div className="tool-grid">

          <div className="tool-card">
            🌱 Crop Advice
            <p>
              Ask about best crops,
              diseases and growth.
            </p>
          </div>

          <div className="tool-card">
            💧 Irrigation Tips
            <p>
              Get watering suggestions
              based on crop needs.
            </p>
          </div>

          <div className="tool-card">
            🧪 Fertilizer Help
            <p>
              Learn correct fertilizer
              usage and timing.
            </p>
          </div>

          <div className="tool-card">
            🌦️ Weather Questions
            <p>
              Understand weather impact
              on crop decisions.
            </p>
          </div>

        </div>

      </div>

    </div>

  );

};

export default AIAdvisor;