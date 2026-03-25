import React, { useState } from "react";
import "../styles/ChatBox.css";

function ChatBox() {

  const [message, setMessage] =
    useState("");

  const [chatHistory, setChatHistory] =
    useState([]);

  const [stopGeneration, setStopGeneration] =
    useState(false);

  const [thinking, setThinking] =
    useState(false);

  // ============================
  // Send Chat
  // ============================

  const sendMessage = async () => {

    if (!message.trim())
      return;

    const userText = message;

    setChatHistory(prev => [

      ...prev,

      {
        sender: "user",
        text: userText
      }

    ]);

    setMessage("");

    setThinking(true);

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
              message: userText
            })
          }
        );

      const data =
        await response.json();

      let aiText = "";

      const words =
        data.reply.split(" ");

      setStopGeneration(false);

      setThinking(false);

      for (let i = 0; i < words.length; i++) {

        if (stopGeneration)
          break;

        aiText += words[i] + " ";

        setChatHistory(prev => {

          const updated = [...prev];

          if (
            updated[updated.length - 1]?.sender === "ai"
          ) {

            updated[
              updated.length - 1
            ].text = aiText;

            return updated;

          }

          return [

            ...prev,

            {
              sender: "ai",
              text: aiText
            }

          ];

        });

        await new Promise(
          r => setTimeout(r, 30)
        );

      }

    }

    catch (error) {

      console.error(error);

      setThinking(false);

    }

  };

  return (

    <div className="chat-section">

      <h3>
        💬 Chat Assistant
      </h3>

      <div className="chat-box">

        {chatHistory.map(
          (chat, index) => (

            <div
              key={index}
              className={
                chat.sender === "user"
                  ? "user-message"
                  : "ai-message"
              }
            >

              {chat.text}

            </div>

          )
        )}

        {/* Thinking Animation */}

        {thinking && (

          <div className="thinking-animation">

            <span></span>
            <span></span>
            <span></span>

          </div>

        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Type your farming question..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (e.key === "Enter")

              sendMessage();

          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

        <button
          className="stop-btn"
          onClick={() =>
            setStopGeneration(true)
          }
        >

          Stop

        </button>

      </div>

    </div>

  );

}

export default ChatBox;