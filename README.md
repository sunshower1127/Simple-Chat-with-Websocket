```shell
cloudflared tunnel --url http://localhost:3000
```

`client.js`

```javascript
const cloudflared_url = "wss://" + "클라우드플레어_링크";
const local_url = "ws://" + window.location.host;
const socket = new WebSocket(cloudflared_url); // local_url -> cloudflared_url
```
