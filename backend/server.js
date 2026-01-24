const express=require("express")
const cors=require("cors")
const connectDB = require("./config/db")
const { UserModel } = require("./models/user")


const app=express()

app.use(express.json())
app.use(cors())


//! connect to DB
connectDB()

// apis

app.get("/test",(req,res)=>{
    res.status(200).json({message:"API status is healthy"})
})


//! fetch all users

app.get("/allusers",async(req,res)=>{
        try {
           const allusers= await UserModel.find()
           res.status(200).json({message:"Data fetched",data:allusers})
            
        } catch (error) {
            res.status(500).json({message:"Internal server error. please try again"})
        }
})


//! register
app.post("/register",async (req,res) => {
    try {
        const {username,age,email,password,gender,education}=req.body
        if(!username || !age || !email || !password || ! gender || !education){
            res.status(404).json({message:"All fields are required"})
        }

        const result=await UserModel.insertOne({username,age,email,password,gender,education})
        console.log(result)
        res.status(201).json({message:"Register successfully",result})
    } catch (error) {
         res.status(500).json({message:"Internal server error. please try again"})
    }
})


//! login

app.post("/login",async (req,res) => {
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})
        console.log(user)
        if(!user){
            res.status(404).json({message:"Email not found"})
        }
        if(user.password!==password){
            res.status(401).json({message:"Incorrect password"})
        }
        res.status(200).json({message:"Login successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error. please try again"})
    }
})

app.listen(8080,()=>{
    console.log("server started")
})