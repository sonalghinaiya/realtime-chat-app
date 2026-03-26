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
  socket.on("user-message", (data) => {
    io.emit("message", data);
    // console.log("A new User Message", message);
  });
  //   console.log("A new user has connected", socket.id);
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
