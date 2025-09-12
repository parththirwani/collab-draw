import { WebSocketServer, WebSocket } from "ws";
import { checkUser } from "./lib/auth-helper.js";
import { prismaClient } from "@repo/db/client";

const users = new Map<string, WebSocket>();
const rooms = new Map<string, Set<string>>();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {
  ws.on("error", console.error);

  const url = new URL(request.url ?? "", "http://localhost");
  const token = url.searchParams.get("token") ?? "";
  const userId = checkUser(token);

  if (!userId) {
    ws.close(1008, "Invalid token");
    return;
  }

  // Track this user
  users.set(userId, ws);

  ws.on("message", async (raw) => {
    let data: any;
    try {
      data = JSON.parse(raw.toString());
    } catch {
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
    }

    if (data.type === "join-room") {
      const { roomId } = data;
      if (!roomId) return;

      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId)!.add(userId);

      console.log(`${userId} joined room ${roomId}`);
      return;
    }

    if (data.type === "leave-room") {
      const { roomId } = data;
      rooms.get(roomId)?.delete(userId);
      console.log(`${userId} left room ${roomId}`);
      return;
    }

    if (data.type === "chat") {
      const { roomId, message } = data;

      // Permission check 
      if (!rooms.get(roomId)?.has(userId)) {
        ws.send(JSON.stringify({
          type: "error",
          message: "You are not part of this room"
        }));
        return;
      }

      // Save message in DB
      await prismaClient.chat.create({
        data: { roomId, message, userId }
      });

      // Broadcast to all members
      const members = rooms.get(roomId);
      if (members) {
        for (const memberId of members) {
          const memberSocket = users.get(memberId);
          if (memberSocket && memberSocket.readyState === WebSocket.OPEN) {
            memberSocket.send(JSON.stringify({
              type: "chat",
              message,
              roomId,
              sender: userId
            }));
          }
        }
      }

      console.log(`${userId} sent message to room ${roomId}`);
      return;
    }
  });

  ws.on("close", () => {
    users.delete(userId);
    for (const memberSet of rooms.values()) {
      memberSet.delete(userId);
    }
  });
});
