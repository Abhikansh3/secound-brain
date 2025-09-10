
import  mongoose  from "mongoose";
import { model ,Schema } from "mongoose";
const UserSchema = new Schema ({
    userName:{type:String , unique:true},
    password:String
})
export const UserModel =  model("User",UserSchema)