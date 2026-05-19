import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://vibely-web-chat.vercel.app"],
}));

app.use(express.json());

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const url = process.env.MONGODB_URI;
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://vibely-web-chat.vercel.app"],
    methods: ["GET", "POST"],
  },
});

//Socket.io
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("join-room", ({ username, room }) => {
    socket.username = username;
    socket.room = room;

    socket.join(room);
    socket.emit("user-joined", `You joined ${room}`);
    socket.broadcast.to(room).emit("user-joined", `${username} joined ${room}`);
  });
  socket.on("user-message", (data) => {
    io.to(socket.room).emit("message", data);
  });

  socket.on("leave-room", ({ username, room }) => {
    socket.leave(room);
    socket.broadcast.to(room).emit("user-left", `${username} left ${room}`);
  });

  socket.on("typing", ({ room, username }) => {
    socket.broadcast.to(room).emit("user-typing", username);
  });

  socket.on("stop-typing", ({ room, username }) => {
    socket.broadcast.to(room).emit("user-stop-typing", username);
  });

  socket.on("disconnect", () => {
    if (socket.username && socket.room) {
      socket.broadcast
        .to(socket.room)
        .emit("user-left", `${socket.username} left ${socket.room}`);
    }
  });
});

app.use("/api/auth", authRoutes)

connectDB(url).then(() => console.log("MongoDB Connected!"));

// app.use(express.static(path.resolve("./public")));

// app.get("/", (req, res) => {
//   return res.sendFile("/public/index.html");
// });

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
