import express from "express";
import { ContentModel, UserModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
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

app.post('/api/v1/content', userMiddleware, (req, res) => {
  const title = req.body.title;
  const link = req.body.link;

  try {
    ContentModel.create({
      title,
      link,
      tags: [],
      //@ts-ignore
      userId: req.userId
    })

    res.status(200).json({
      message: "Content created successfully"
    })
  } catch (error) {
    res.status(500).json({
      msg: "Error creating content"
    })
  }

})
app.get('/api/v1/content', userMiddleware, async (req, res) => {
  //@ts-ignore
  const userid = req.userId;
  const content = await ContentModel.find({
    userId: userid
  }).populate("userId", "username")
  res.json({
    content
  })

})
app.delete('/api/v1/content', userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;

  await ContentModel.deleteMany({
    contentId,
    //@ts-ignore
    UserId: req.userId
  })
})



app.listen(3000)
