
const jwt=require("jsonwebtoken")
const authentication=(req,res,next)=>{

   const token=req.headers.authorization.split(" ")[1]
   if(!token){
    return res.status(404).json({message:"please send the token"})
   }
   const data=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.id=data.userId
   next()
}

module.exports=authentication