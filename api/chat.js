const { Server } = require("socket.io");
const http = require("http");

let io;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.io server");
});

if (!io) {
  io = new Server(server, {
    path: "/api/chat",
    addTrailingSlash: false,
  });
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

module.exports = (req, res) => {
  if (req.method === "GET") {
    res.status(200).send("Serverless Socket.io Function");
  }
};
