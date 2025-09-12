import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware/auth.js";

const JWT_TOKEN = process.env.JWT_TOKEN || "default_secret";

const app = express()
app.use(express.json())

interface User {
    username: string,
    password: string
}

const users: User[] = [];

app.post("/signup", (req, res)=> {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({
            message: "Username and Password missing"
        })
    }

    res.json({
        message: "Succesfully registered"
    })

})

app.post("/signin", (req, res)=> {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({
            message: "Username and Password missing"
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

app.post("/room", middleware, (req,res)=>{
    res.json({
        roomId: 123
    })
})

app.listen(3000)