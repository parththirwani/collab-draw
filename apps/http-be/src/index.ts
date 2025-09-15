import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware/auth.js";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcryptjs";

import cors from "cors";

const JWT_TOKEN = process.env.JWT_TOKEN || "super-secret-token";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ message: "Incorrect inputs" });
    }

    const existing = await prismaClient.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// SIGNIN
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = SignInSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ message: "Incorrect inputs" });
    }

    const foundUser = await prismaClient.user.findUnique({ where: { email } });
    if (!foundUser) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect credentials" });
    }

    const token = jwt.sign(
      { userId: foundUser.id, email: foundUser.email },
      JWT_TOKEN,
    );

    return res.json({ token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE ROOM
app.post("/room", middleware, async (req, res) => {
  try {
    const parsed = CreateRoomSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Incorrect inputs" });
    }

    const newRoom = await prismaClient.room.create({
      data: {
        slug: parsed.data.name,
        adminId: req.userId!, 
      },
    });

    return res.status(201).json({
      roomId: newRoom.id,
      slug: newRoom.slug,
    });
  } catch (e: any) {
    console.error(e);

    if (e.code === "P2002") {
      // Prisma unique constraint error
      return res.status(409).json({ message: "Room slug already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
});
//GET CHATS OF A SINGLE ROOM USING roomId
app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);

  if (!req.params.roomId || isNaN(roomId)) {
    return res.status(400).json({ message: "Invalid roomId" });
  }

  try {
    const messages = await prismaClient.chat.findMany({
      where: { roomId },
      orderBy: { id: "desc" },
      take: 50,
    });

    return res.json({ messages });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//GET roomId using slug
app.get("/room/:slug", async(req,res)=>{
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug
    }
  });
  res.json({
    room
  })
})

app.listen(3001);
