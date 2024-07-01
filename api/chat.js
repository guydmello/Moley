const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.io server");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(0, () => {
  console.log("Server listening on port", server.address().port);
});

module.exports = (req, res) => {
  res.status(200).send("Serverless Socket.io Function");
};
