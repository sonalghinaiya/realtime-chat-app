import http from "http";
import express from "express";
import path from "path";

const app = express();
const server = http.createServer(app);
const PORT = 9000;

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`),
);
