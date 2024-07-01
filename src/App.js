import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";

const ENDPOINT = "/api/chat"; // This will be your serverless function endpoint

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("chat message", (msg) => {
      setChat((oldChat) => [...oldChat, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = socketIOClient(ENDPOINT);
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
