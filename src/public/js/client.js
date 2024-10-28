const cloudflared_url =
  "wss://" + "life-taxes-discussions-weeks.trycloudflare.com";
const local_url = "ws://" + window.location.host;
const socket = new WebSocket(cloudflared_url); // local_url <-> cloudflared_url

const messageList = document.querySelector("#chat-list");
const chatForm = document.querySelector("#chat");
const nickForm = document.querySelector("#nick");

socket.addEventListener("open", () => {
  console.log("Client Socket is open");
});

socket.addEventListener("close", () => {
  console.log("Client socket is closed");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = chatForm.querySelector("input");
  socket.send(JSON.stringify({ type: "message", payload: input.value }));
  input.value = "";
});

nickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(JSON.stringify({ type: "nickname", payload: input.value }));
  input.placeholder = input.value;
  input.value = "";
});

window.addEventListener("beforeunload", () => {
  socket.send(
    JSON.stringify({ type: "message", payload: "님이 나가셨습니다." })
  );
  socket.close();
});
