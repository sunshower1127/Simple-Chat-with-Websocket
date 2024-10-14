import express from "express";
import http from "http";
import path from "path";
import { WebSocket } from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket.nickname = "익명";

  sockets.forEach((aSocket) => {
    aSocket.send(`유저가 입장했습니다.`);
  });

  socket.on("close", () => {
    console.log("Server socket is closed");
  });

  socket.on("message", (_message) => {
    const message = JSON.parse(_message);

    switch (message.type) {
      case "message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname}: ${message.payload}`);
        });
      case "nickname":
        socket.nickname = message.payload;
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
