
import express from "express";
import jwt from "jsonwebtoken"
import { ContentModel, UserModel } from "./db.js";
import {JWT_PASSWORD} from './config.js'
import { userMiddleware } from "./middleware.js";
import  mongoose  from "mongoose";
const app = express()
app.use(express.json())
app.post('/api/v1/signup',async(req,res) => {
    const userName = req.body.userName
    const password = req.body.password

    try {
        await UserModel.create({
        userName:userName,
        password:password
    })
    res.json({
        msg:"User signed up"
    })
    } catch(e){
        res.status(411).json({
            msg: "User already exists"
        })
    } 
    
})
app.post('/api/v1/signin',async(req,res) => {
    const userName = req.body.userName
    const password = req.body.password
    const existingUser = await UserModel.findOne({
        userName,
        password
    })
    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD)
        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg:"Incorrect Credentials"
        })
    }
})
app.post('/api/v1/content',userMiddleware,async(req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        userId:req.userId,
        tags:[]
    })
    return res.json({
        msg:"Content added"
    })
})
app.get('/api/v1/content',userMiddleware,async(req,res)=>{
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","userName")
    res.json({
        content:content
    })
})

app.delete('/api/v1/content',async(req,res)=>{
    const contentId = req.body.contentId
    await ContentModel.deleteMany({
        contentId,
        userId:req.userId
    })
    res.json({
        msg:"deleted"
    })
})
app.post('/api/v1/brain/share',(req,res)=>{

})
app.get('/api/v1/brain/:sharelink',(req,res)=>{

})

async function main(){
   await mongoose.connect('')//write your mongoDB url
   console.log("Connected")
   app.listen(3000);
}
main()
