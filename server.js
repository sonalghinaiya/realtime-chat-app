import http from "http";
import express from "express";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const PORT = 9000;
const io = new Server(server);

//Socket.io
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("user-joined", (username) => {
    socket.username = username;
    socket.broadcast.emit("user-joined", `${username} joined the chat`);
  });
  socket.on("user-message", (data) => {
    io.emit("message", data);
    // console.log("A new User Message", message);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      socket.broadcast.emit("user-left", `${socket.username} left the chat`);
    }
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
