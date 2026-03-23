import React, { useState, useRef, useEffect } from "react";
import "../styles/VoiceAssistant.css";

const VoiceAssistant = () => {

  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("en-IN");

  const recognitionRef = useRef(null);

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported in this browser.");

      return;

    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = language;

    recognition.onstart = () => {

      setListening(true);

    };

    recognition.onend = () => {

      setListening(false);

    };

    recognition.onresult = (event) => {

      const speechText =
        event.results[0][0].transcript;

      setTranscript(speechText);

      sendToBackend(speechText);

    };

    recognitionRef.current = recognition;

  }, [language]);

  const sendToBackend = async (text) => {

    setLoading(true);

    try {

      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await res.json();

      setResponse(data.reply);

      speakResponse(data.reply);

    }

    catch (error) {

      console.error(error);

      setResponse("Server connection failed.");

    }

    setLoading(false);

  };

  const speakResponse = (text) => {

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = language;

    window.speechSynthesis.speak(speech);

  };

  const startListening = () => {

    if (recognitionRef.current) {

      recognitionRef.current.start();

    }

  };

  return (

    <div className="voice-container">

      <h2>🎤 Voice Assistant</h2>

      {/* Language Switch */}

      <select
        className="language-select"
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
      >

        <option value="en-IN">
          English
        </option>

        <option value="hi-IN">
          Hindi
        </option>

        <option value="ta-IN">
          Tamil
        </option>

        <option value="bn-IN">
          Bengali
        </option>

      </select>

      <button
        onClick={startListening}
        className={`mic-button ${
          listening ? "listening" : ""
        }`}
      >

        {listening
          ? "🎤 Listening..."
          : "Start Speaking"}

      </button>

      {loading && (

        <div className="thinking">

          AI thinking<span>.</span><span>.</span><span>.</span>

        </div>

      )}

      <div className="box">

        <h4>You Said:</h4>

        <p>
          {transcript ||
            "Waiting for input..."}
        </p>

      </div>

      <div className="box">

        <h4>AI Response:</h4>

        <p>
          {response ||
            "AI will respond here..."}
        </p>

      </div>

    </div>

  );

};

export default VoiceAssistant;