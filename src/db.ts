
import  mongoose  from "mongoose";
import { model ,Schema } from "mongoose";
const UserSchema = new Schema ({
    userName:{type:String , unique:true},
    password:String
})
const contentSchema = new Schema({
    title:String,   
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'User'}
})
export const UserModel =  model("User",UserSchema)
export const ContentModel = model('Content',contentSchema)