import React, { useState } from "react";
import "../styles/ChatBox.css";

const ChatBox = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message
    };

    setMessages(prev => [...prev, userMsg]);

    try {

      const res = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: message
          })
        }
      );

      const data = await res.json();

      const botMsg = {
        sender: "bot",
        text: data.reply
      };

      setMessages(prev => [...prev, botMsg]);

      setMessage("");

    }

    catch (error) {

      const errorMsg = {
        sender: "bot",
        text: "Server error occurred."
      };

      setMessages(prev => [...prev, errorMsg]);

    }

  };

  return (

    <div className="chat-container">

      <h3>💬 Chat Assistant</h3>

      <div className="chat-messages">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`message ${msg.sender}`}
          >
            {msg.text}
          </div>

        ))}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Type your farming question..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>

  );

};

export default ChatBox;