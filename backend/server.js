require("dotenv").config()
const express=require("express")
const cors=require("cors")
const bcrypt=require("bcrypt")
const connectDB = require("./config/db")
const { UserModel } = require("./models/user")
const EmailService = require("./config/email")
const { registerController, loginController, forgotpasswordController, deleteUserController, updateUserController, getAllUsersController, testController, getProfileController } = require("./controllers/userControllers")
const authentication = require("./middleware/authmiddleware")
const authorization = require("./middleware/authorization")



const app=express()

app.use(express.json())
app.use(cors())


//! connect to DB
connectDB()





// apis





//! public apis 
//! register
app.post("/register",registerController)
//! login
app.post("/login",loginController)
//! forget the password
app.put("/forgotpassword",forgotpasswordController)


//! user | admin  apis

//! get profile
app.get("/profile",authentication,authorization("admin","user"),getProfileController)
//! delete user
app.delete("/user/:id",authentication,authorization("admin","user"),deleteUserController)
//! update user
app.put("/update/:id",authentication,authorization("admin","user"),updateUserController)



//! admin apis

//! fetch all users
app.get("/allusers",authentication,authorization("admin"),getAllUsersController)


app.listen(process.env.PORT,()=>{
    console.log(`http:localhost:${process.env.PORT}`)
})