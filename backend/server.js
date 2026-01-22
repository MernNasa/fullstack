const express=require("express")
const fs=require("fs")
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors())

// data

const users=["sundari","sheela","leela"]


//! create the rest api


//! testing api
app.get("/",(req,res)=>{
    res.json({message:"welcome to express js "})
})

//! fetch all users
app.get("/allusers",(req,res)=>{
   try {
     // read the data from the file
    const data=JSON.parse(fs.readFileSync("./data.json","utf-8"))
    res.json({message:"reading the data",data})
   } catch (error) {
    res.json({message:"Internal server error. Please try again"})
   }
})

//! create a user
app.post("/register",(req,res)=>{
    try {
    const userdata=req.body
    const Alldata=JSON.parse(fs.readFileSync("./data.json","utf-8"))
    const updateData=[...Alldata,userdata]
    fs.writeFileSync("./data.json",JSON.stringify(updateData,null,2))
    res.json({message:"user created successfully"})
    } catch (error) {
       res.json({message:"Internal server error. Please try again"}) 
    }
})

//! update user

app.put("/updateuser/:userId",(req,res)=>{
    try {
        const newData=req.body
    const {userId}=req.params
    const Alldata=JSON.parse(fs.readFileSync("./data.json","utf-8"))
    const filterData=Alldata.filter((user)=>user.id!=userId)
    const newUserData={
        id:userId,
        ...newData
    }
    const finalData=[...filterData,newUserData]
     fs.writeFileSync("./data.json",JSON.stringify(finalData,null,2))
     res.json({message:"user updated successfully"})
    } catch (error) {
       res.json({message:"Internal server error. Please try again"}) 
    }
})








//! delete user

app.delete("/deleteuser/:userId",(req,res)=>{
    const {userId}=req.params
    console.log(typeof userId)
    const Alldata=JSON.parse(fs.readFileSync("./data.json","utf-8"))
    const filterData=Alldata.filter((user)=>user.id!=userId)
    console.log(filterData)
    fs.writeFileSync("./data.json",JSON.stringify(filterData,null,2))
    res.json({message:"user deleted successfully"})
})

app.listen(8080,()=>{
    console.log(`http://localhost:8080  in this url my server is running`)
})