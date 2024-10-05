const cloudflared_url = "wss://" + "thirty-voice-mexico-shed.trycloudflare.com";
const local_url = "ws://" + "window.location.host";
const socket = new WebSocket(local_url);

socket.addEventListener("open", () => {
  console.log("Client Socket is open");
});

socket.addEventListener("close", () => {
  console.log("Client socket is closed");
});

const messageList = document.querySelector("ul");

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

const chatForm = document.querySelector("form");

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = chatForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});
