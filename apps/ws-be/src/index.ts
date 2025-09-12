import { WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_TOKEN || "default_secret";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  const url = request.url;
  if (!url) {
    ws.close(1008, "Missing URL");
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1] || "");
  const token = queryParams.get("token");

  if (!token) {
    ws.close(1008, "Token not provided");
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN) as { userId: string };

    console.log("User connected:", decoded.userId);

    ws.on('message', function message(data) {
      console.log("Received:", data.toString());
      ws.send('pong');
    });

  } catch (err) {
    ws.close(1008, "Invalid token");
  }
});
