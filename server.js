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

app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  console.log("User connected");

  // צ'אט טקסט
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  // קול
  socket.on("voice-offer", (offer) => {
    socket.broadcast.emit("voice-offer", offer);
  });

  socket.on("voice-answer", (answer) => {
    socket.broadcast.emit("voice-answer", answer);
  });

  socket.on("ice-candidate", (candidate) => {
    socket.broadcast.emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});