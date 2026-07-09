import express from "express";
import { UserModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
const app = express()

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username,
      password
    })
    res.status(200).json({
      message: "User created successfully"
    })
  } catch (error) {
    res.status(411).json({
      message: "User already exists"
    })
  }
})

app.post('/api/vq/signin', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await UserModel.findOne({
    username,
    password
  })
  if (existingUser) {
    const token = jwt.sign({
      id: existingUser._id,
    }, JWT_SECRET)

    res.status(200).json({
      token: token,
    })
  } else {
    res.status(401).json({
      msg: "Invalid Credentials"
    })
  }

})




app.listen(3000)
