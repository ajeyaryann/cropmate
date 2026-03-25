import React, { useState } from "react";
import "../styles/VoiceAssistant.css";

function VoiceAssistant() {

  const [spokenText, setSpokenText] =
    useState("");

  const [aiReply, setAiReply] =
    useState("");

  const [listening, setListening] =
    useState(false);

  const [speaking, setSpeaking] =
    useState(false);

  const [language, setLanguage] =
    useState("en-IN");

  let speech;

  // ============================
  // Start Listening
  // ============================

  const startListening = () => {

    if (!("webkitSpeechRecognition" in window)) {

      alert(
        "Speech recognition not supported."
      );

      return;

    }

    const recognition =
      new window.webkitSpeechRecognition();

    recognition.lang = language;

    recognition.start();

    setListening(true);

    recognition.onresult =
      async (event) => {

        const text =
          event.results[0][0]
            .transcript;

        setSpokenText(text);

        setListening(false);

        await sendToAI(text);

      };

  };

  // ============================
  // Send to AI
  // ============================

  const sendToAI = async (text) => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/chat",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              message: text
            })
          }
        );

      const data =
        await response.json();

      setAiReply(data.reply);

      // Speak

      speech =
        new SpeechSynthesisUtterance(
          data.reply
        );

      speech.lang = language;

      speech.onstart = () => {

        setSpeaking(true);

      };

      speech.onend = () => {

        setSpeaking(false);

      };

      speechSynthesis.speak(speech);

    }

    catch (error) {

      console.error(error);

    }

  };

  // ============================
  // Stop Speaking
  // ============================

  const stopSpeaking = () => {

    speechSynthesis.cancel();

    setSpeaking(false);

  };

  return (

    <div className="voice-section">

      <h3>
        🎤 Voice Assistant
      </h3>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(
            e.target.value
          )
        }
      >

        <option value="en-IN">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="ta-IN">Tamil</option>
        <option value="te-IN">Telugu</option>
        <option value="bn-IN">Bengali</option>

      </select>

      {/* Listening Button */}

      <button
        className={
          listening
            ? "listening-btn"
            : ""
        }
        onClick={startListening}
      >

        {listening
          ? "Listening..."
          : "Start Speaking"}

      </button>

      {/* Stop Speaking */}

      {speaking && (

        <button
          className="stop-voice-btn"
          onClick={stopSpeaking}
        >

          Stop Speaking

        </button>

      )}

      {/* Voice Boxes */}

      <div className="voice-box">

        <strong>You Said:</strong>

        <p>{spokenText}</p>

      </div>

      <div
        className={
          speaking
            ? "voice-box speaking"
            : "voice-box"
        }
      >

        <strong>AI Response:</strong>

        <p>{aiReply}</p>

      </div>

    </div>

  );

}

export default VoiceAssistant;