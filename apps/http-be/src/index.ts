import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware/auth.js";
import { CreateRoomSchema, CreateUserSchema, SignInSchema } from "@repo/common/types"

const JWT_TOKEN = process.env.JWT_TOKEN || "default_secret";

const app = express()
app.use(express.json())

interface User {
    username: string,
    password: string
}

const users: User[] = [];

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    const data = CreateUserSchema.safeParse(req.body)

    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    users.push({
        username,
        password
    })

    res.json({
        message: "Succesfully registered"
    })

})

app.post("/signin", (req, res) => {
    const { username, password } = req.body;


    const data = SignInSchema.safeParse(req.body)

    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }

    const foundUser = users.find(
        (u) => u.username === username && u.password === password
    )

    if (!foundUser) {
        res.json({
            message: "Incorrect credentials"
        })
    } else {
        const token = jwt.sign({
            username
        }, JWT_TOKEN)
        res.json({
            token: token
        })
    }


})

app.post("/room", middleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body)

    if (!data.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    res.json({
        roomId: 123
    })
})

app.listen(3000)