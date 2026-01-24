const mongoose=require("mongoose")

const connectDB=async()=>{
    const url="mongodb://localhost:27017/instagram"
   try {
     await mongoose.connect(url)
     console.log("DB Connected")
     
   } catch (error) {
    console.log("Failed to connect")
   }
}

module.exports=connectDB