import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const ENDPOINT = "https://moley.vercel.app/api/chat";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const socket = io(ENDPOINT, { path: "/api/chat" });

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat((oldChat) => [...oldChat, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("chat message", message);
    setMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        <ul id="messages">
          {chat.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form onSubmit={sendMessage}>
          <input
            id="m"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
