
import express from "express";
import jwt from "jsonwebtoken"
import { contentModel, UserModel } from "./db.js";
import {JWT_PASSWORD} from './config.js'
import { userMiddleware } from "./middleware.js";
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
        meg:"User signed up"
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
app.post('/api/v1/content',userMiddleware,(req,res) => {
    const link = req.body.link;
    const type = req.body.type;
    contentModel.create({
        link,
        type,
        userId:req.userId,
        tags:[]
    })
    return res.json({
        msg:"Content added"
    })
})
app.get('/api/v1/content',(req,res)=>{

})

app.delete('/api/v1/content',(req,res)=>{
     
})
app.post('/api/v1/brain/share',(req,res)=>{

})
app.get('/api/v1/brain/:sharelink',(req,res)=>{

})
app.listen(3000)