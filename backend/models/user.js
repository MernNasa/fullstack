const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:String,
    gender:String,
    email:String,
    password:String,
    education:String,
    age:Number
})

const UserModel=mongoose.model("users",userSchema)

module.exports={UserModel}