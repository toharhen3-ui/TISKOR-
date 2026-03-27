const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("voice-offer", (offer) => {
    socket.broadcast.emit("voice-offer", offer);
  });

  socket.on("voice-answer", (answer) => {
    socket.broadcast.emit("voice-answer", answer);
  });

});
server.listen(3000, () => {
  console.log("Server running on port 3000");
});