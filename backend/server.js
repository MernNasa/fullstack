require("dotenv").config()
const express=require("express")
const cors=require("cors")
const bcrypt=require("bcrypt")
const connectDB = require("./config/db")
const { UserModel } = require("./models/user")
const EmailService = require("./config/email")
const { registerController, loginController, forgotpasswordController, deleteUserController, updateUserController, getAllUsersController, testController, getProfileController } = require("./controllers/userControllers")
const authentication = require("./middleware/authmiddleware")



const app=express()

app.use(express.json())
app.use(cors())


//! connect to DB
connectDB()





// apis



//! fetch all users

app.get("/allusers",getAllUsersController)

//! get profile
app.get("/profile",authentication,getProfileController)


//! register
app.post("/register",registerController)
//! login
app.post("/login",loginController)
//! forget the password
app.put("/forgotpassword",forgotpasswordController)
//! delete user
app.delete("/user/:id",deleteUserController)
//! update user
app.put("/update/:id",updateUserController)

app.listen(process.env.PORT,()=>{
    console.log(`http:localhost:${process.env.PORT}`)
})