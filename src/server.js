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

  sockets.forEach((aSocket) => {
    aSocket.send(`A client just joined`);
  });

  socket.on("close", () => {
    console.log("Server socket is closed");
  });

  socket.on("message", (message) => {
    sockets.forEach((aSocket) => {
      aSocket.send(message.toString()); // toString 해줘야함
    });
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
