import { WebSocketServer, WebSocket } from "ws";
import { checkUser } from "./lib/auth-helper.js";

interface User {
  ws: WebSocket,
  userId: string,
  rooms: string[]
}

const users: User[] = [];

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {
  ws.on("error", console.error);

  const url = request.url;
  if (!url) {
    ws.close(1008, "Missing URL");
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token)

  if (userId == null) {
    ws.close();
    return
  }

  users.push({
    ws,
    userId,
    rooms: []
  })

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data as unknown as string);

    if (parsedData.type === "join-room") {
      const user = users.find(x => x.ws === ws);
      if (user) {
        user.rooms.push(parsedData.roomId);
      }
    }

    if(parsedData.type==="leave-room"){
      const user = users.find(x => x.ws === ws);
      if(!user){
        return
      }

      user.rooms = user?.rooms.filter(x=>x===parsedData.room)
    }
  });
}
);
