import { email, z } from "zod"

export const CreateUserSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long"),
    password: z.string(),
    name: z.string()
})

export const SignInSchema = z.object({
    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long"),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name : z.string().min(3).max(20),
})