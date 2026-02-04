const jwt=require("jsonwebtoken")
const { UserModel } = require("../models/user")
const bcrypt=require("bcrypt")
const EmailService = require("../config/email")
const registerController=async (req,res) => {
    try {
        const {username,age,email,password,gender,education}=req.body
        if(!username || !age || !email || !password || ! gender || !education){
            res.status(404).json({message:"All fields are required"})
        }

        const user=await UserModel.findOne({email})
        if(user){
        return res.status(409).json({message:"user mailID already registerd"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        console.log(hashedPassword)
        const result=await UserModel.insertOne({username,age,email,password:hashedPassword,gender,education})
        console.log(result)
        const message=`Hello ${username},

            Your registration was successful!

            You can now log in and start using your account.
            If you have any questions, feel free to contact our support team.

            Thank you for joining us.

            Best regards,  
            Team Nasa`;

        EmailService(email,"Registration Successfull 🎉✔️",message)
        res.status(201).json({message:"Register successfully",result})
    } catch (error) {
         res.status(500).json({message:"Internal server error. please try again"})
    }
}


const loginController=async(req,res) => {
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})
        console.log(user)
        if(!user){
            res.status(404).json({message:"Email not found"})
        }
        const match= await bcrypt.compare(password,user.password)
        if(!match){
            res.status(401).json({message:"Incorrect password"})
        }
        // genereate a token
        const jwttoken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.status(200).json({message:"Login successfully",jwttoken})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error. please try again"})
    }
}


const forgotpasswordController=async (req,res) => {
    try {
        const {email,password}=req.body
        const user=await UserModel.findOne({email})
        console.log(user)
        if(!user){
            res.status(404).json({message:"Email not found"})
        }
         const hashedPassword=await bcrypt.hash(password,10)
        console.log(hashedPassword)

        const updateValue=await UserModel.updateOne({email},{$set:{password:hashedPassword}})
        res.status(200).json({message:"password update "})

    } catch (error) {
        res.status(500).json({message:"Internal server error. please try again"})
    }
}


const deleteUserController=async (req,res) => {
    const {id}=req.params
    const user=await UserModel.findById(id)

    if(!user){
        return res.status(404).json({message:"User not found"})
    }

    await UserModel.findByIdAndDelete(id)
    return res.status(200).json({message:"user deleted"})
}


const updateUserController=async (req,res) => {
    const {id}=req.params
    const {username,age,email,gender,education}=req.body
    const user=await UserModel.findById(id)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    await UserModel.findByIdAndUpdate(id,{username,age,email,gender,education})
    return res.status(200).json({message:"Update successfull"})
}


const getAllUsersController=async(req,res)=>{
        try {
           const allusers= await UserModel.find()
           res.status(200).json({message:"Data fetched",data:allusers})
            
        } catch (error) {
            res.status(500).json({message:"Internal server error. please try again"})
        }
}

const getProfileController=async(req,res)=>{
    const id=req.id
    const user=await UserModel.findById(id,{password:0});
     if(!user){
            res.status(404).json({message:"User not found"})
        }
    return res.status(200).json({message:"profile details",user})
}



const testController=(req,res)=>{
    console.log(req.mydata)
    console.log("controller")
    res.status(200).json({message:"API status is healthy"})
}

module.exports={registerController,loginController,forgotpasswordController,deleteUserController,updateUserController,getAllUsersController,testController,getProfileController}