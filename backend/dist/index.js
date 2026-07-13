import express from "express";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { randomString } from "./utlis.js";
const app = express();
app.use(express.json());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await UserModel.create({
            username,
            password
        });
        res.status(200).json({
            message: "User created successfully"
        });
    }
    catch (error) {
        res.status(411).json({
            message: "User already exists"
        });
    }
});
app.post('/api/vq/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id,
        }, JWT_SECRET);
        res.status(200).json({
            token: token,
        });
    }
    else {
        res.status(401).json({
            msg: "Invalid Credentials"
        });
    }
});
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
        });
        res.status(200).json({
            message: "Content created successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error creating content"
        });
    }
});
app.get('/api/v1/content', userMiddleware, async (req, res) => {
    //@ts-ignore
    const userid = req.userId;
    const content = await ContentModel.find({
        userId: userid
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        UserId: req.userId
    });
});
app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = randomString(10);
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash,
        });
        res.json({
            message: hash
        });
    }
    else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
    }
});
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash: hash
    });
    if (!link || !link.userId) {
        res.status(404).json({
            message: "Link not found"
        });
        return;
    }
    const content = await ContentModel.find({
        userId: link.userId
    });
    const user = await UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map