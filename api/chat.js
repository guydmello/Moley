const { Server } = require("socket.io");
const { createServer } = require("http");

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Starting Socket.io server...");
    const httpServer = createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Socket.io server");
    });

    const io = new Server(httpServer, {
      path: "/api/chat",
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on("connection", (socket) => {
        console.log("New client connected");
      
        socket.on("chat message", (msg) => {
          console.log("Message received: ", msg);
          io.emit("chat message", msg);
        });
      
        socket.on("disconnect", () => {
          console.log("Client disconnected");
        });
      });

    httpServer.listen(0, () => {
      console.log("Server listening on port", httpServer.address().port);
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.io server already running.");
  }
  res.end();
};

module.exports = ioHandler;
